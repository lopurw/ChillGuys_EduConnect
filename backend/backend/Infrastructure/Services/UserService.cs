using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using EduConnect.Application.Responses;
using EduConnect.Domain.Entities;
using EduConnect.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EduConnect.Infrastructure.Services;

public class UserService(DataContext context, IConfiguration configuration)
{
    
    public async Task<Response<string>> AddUserAsync(User user)
    {
        try
        {
            if (await context.Users.AnyAsync(u => u.Email == user.Email))
                return new Response<string>(HttpStatusCode.BadRequest, "User with this email already exists");

            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return new Response<string>("User added successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    public async Task<Response<string>> UpdateUserAsync(GetUserDto updatedUserData)
    {
        try
        {
            var user = await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == updatedUserData.Id);
            if (user == null)
                return new Response<string>(HttpStatusCode.NotFound, "User not found");

            // Обновление основных данных пользователя
            user.Name = updatedUserData.Name;
            user.Email = updatedUserData.Email;
            user.ProfileImage = updatedUserData.ProfileImage;
            user.UpdatedAt = DateTime.UtcNow;

            // Проверяем, нужно ли обновить роль пользователя
            if (!string.IsNullOrEmpty(updatedUserData.RoleName) && user.Role.GetType().Name != updatedUserData.RoleName)
            {
                // Удаляем старую роль
                if (user.Role != null)
                    context.Entry(user.Role).State = EntityState.Deleted;

                // Создаем новую роль на основе RoleName и RoleDetails
                user.Role = updatedUserData.RoleName switch
                {
                    "ManagerProfile" => JsonSerializer.Deserialize<ManagerProfile>(updatedUserData.RoleDetails),
                    "TeacherProfile" => JsonSerializer.Deserialize<TeacherProfile>(updatedUserData.RoleDetails),
                    "StudentProfile" => JsonSerializer.Deserialize<StudentProfile>(updatedUserData.RoleDetails),
                    _ => throw new ArgumentException("Invalid role type")
                };

                if (user.Role == null)
                    return new Response<string>(HttpStatusCode.BadRequest, "Invalid role details");
            }

            await context.SaveChangesAsync();
            return new Response<string>("User updated successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<string>> DeleteUserAsync(int id)
    {
        try
        {
            var user = await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
                return new Response<string>(HttpStatusCode.NotFound, "User not found");

            if (user.Role != null)
                context.Entry(user.Role).State = EntityState.Deleted;

            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return new Response<string>("User deleted successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<PagedResponse<List<GetUserDto>>> GetUsersAsync(string? name, int pageNumber, int pageSize)
    {
        try
        {
            var query = context.Users.Include(u => u.Role).AsQueryable();

            if (!string.IsNullOrEmpty(name))
                query = query.Where(u => u.Name.ToLower().Contains(name.ToLower()));

            var totalRecords = await query.CountAsync();
            var users = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var userDtos = users.Select(u => new GetUserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                ProfileImage = u.ProfileImage,
                CreatedAt = u.CreatedAt,
                UpdatedAt = u.UpdatedAt,
                RoleName = u.Role.GetType().Name,  // Get the type of the role, e.g. ManagerProfile, TeacherProfile, etc.
                RoleDetails = GetRoleDetails(u.Role)
            }).ToList();

            return new PagedResponse<List<GetUserDto>>(userDtos, totalRecords, pageNumber, pageSize);
        }
        catch (Exception ex)
        {
            return new PagedResponse<List<GetUserDto>>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

// Method to get role-specific details
    private string GetRoleDetails(UserRole role)
    {
        switch (role)
        {
            case ManagerProfile manager:
                return $"Department: {manager.Department}, Position: {manager.Position}";
            case TeacherProfile teacher:
                return $"Specialization: {teacher.Specialization}, Degree: {teacher.Degree}";
            case StudentProfile student:
                return $"Enrollment: {student.EnrollmentNumber}, Major: {student.Major}";
            default:
                return "No details available.";
        }
    }


    public async Task<Response<string>> AssignRoleAsync(int userId, UserRole role)
    {
        try
        {
            var user = await context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return new Response<string>(HttpStatusCode.NotFound, "User not found");

            if (user.Role != null)
                context.Entry(user.Role).State = EntityState.Deleted;

            role.UserId = userId;
            user.Role = role;

            await context.SaveChangesAsync();
            return new Response<string>("Role assigned successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<string>> RegisterUserAsync(string email, string password, string name,
        string profileImage, string roleType, object roleData)
    {
        try
        {
            // Проверка, существует ли пользователь с таким email
            if (await context.Users.AnyAsync(u => u.Email == email))
                return new Response<string>(HttpStatusCode.BadRequest, "User with this email already exists");

            // Хеширование пароля
            var hashedPassword = HashPassword(password);

            // Создание базового объекта пользователя
            var user = new User
            {
                Email = email,
                Password = hashedPassword,
                Name = name,
                ProfileImage = profileImage,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            var roleTypeLower = roleType.ToLower();
            // Создание роли на основе типа
            UserRole role = roleTypeLower switch
            {
                "manager" => JsonSerializer.Deserialize<ManagerProfile>(roleData.ToString()),
                "teacher" => JsonSerializer.Deserialize<TeacherProfile>(roleData.ToString()),
                "student" => JsonSerializer.Deserialize<StudentProfile>(roleData.ToString()),
                _ => throw new ArgumentException("Invalid role type")
            };

            if (role == null)
                return new Response<string>(HttpStatusCode.BadRequest, "Invalid role type");

            // Привязываем роль к пользователю
            role.User = user;
            user.Role = role;

            // Добавляем пользователя в базу данных
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return new Response<string>("User registered successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }

       
    }
    private static string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }
    }
    
    public async Task<Response<LoginResponse>> Login(LoginDto model)
    {
        var user = await context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(x =>
                (x.Name == model.UserName || x.Email == model.UserName) && // Проверка имени или почты
                x.Password == HashPassword(model.Password));

        if (user == null)
        {
            return new Response<LoginResponse>(HttpStatusCode.BadRequest, "User not found or wrong password");
        }

        var token = GenerateJwtToken(user);
        return new Response<LoginResponse>(new LoginResponse
        {
            Token = token,
            UserId = user.Id.ToString(),
            Role = user.Role.GetType().Name // Возвращает тип роли (например, ManagerProfile, TeacherProfile и т.д.)
        });
    }


    private string GenerateJwtToken(User user)
    {
        var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!);
        var securityKey = new SymmetricSecurityKey(key);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Claims, including the role
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Name, user.Name),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.GetType().Name) // Add role name as a claim
        };

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        var securityTokenHandler = new JwtSecurityTokenHandler();
        return securityTokenHandler.WriteToken(token);
    }

    public async Task<Response<GetUserDto>> GetUserByIdAsync(int id)
    {
        try
        {
            var user = await context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return new Response<GetUserDto>(HttpStatusCode.NotFound, "User not found");

            var userDto = new GetUserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                ProfileImage = user.ProfileImage,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                RoleName = user.Role.GetType().Name,
                RoleDetails = GetRoleDetails(user.Role)
            };

            return new Response<GetUserDto>(userDto);
        }
        catch (Exception ex)
        {
            return new Response<GetUserDto>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
}

public class LoginDto
{
    public required string UserName { get; set; }
    public required string Password { get; set; }
}

public class GetUserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string ProfileImage { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string RoleName { get; set; } // Role type
    public string RoleDetails { get; set; } // Detailed role-specific information
}

public class LoginResponse
{
    public string Token { get; set; }
    public string UserId { get; set; }
    public string Role { get; set; } // Return user's role type
}





