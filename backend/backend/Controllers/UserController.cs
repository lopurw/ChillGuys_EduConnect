using EduConnect.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using EduConnect.Domain.Entities;

namespace EduConnect.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(UserService userService) : ControllerBase
{
    [HttpGet("getUsers")]
    public async Task<IActionResult> GetUsers(string? name, int pageNumber = 1, int pageSize = 10)
    {
        var result = await userService.GetUsersAsync(name, pageNumber, pageSize);
        return Ok(result);
    }

    [HttpGet("getUserById")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var result = await userService.GetUserByIdAsync(id);
        return Ok(result);
    }

    [HttpPost("registerUser")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto registerUserDto)
    {
        var result = await userService.RegisterUserAsync(
            registerUserDto.Email,
            registerUserDto.Password,
            registerUserDto.Name,
            registerUserDto.ProfileImage,
            registerUserDto.RoleType,
            registerUserDto.RoleData);

        return Ok(result);
    }

    [HttpPut("updateUser")]
    public async Task<IActionResult> UpdateUser([FromBody]GetUserDto updateUserDto)
    {
        var result = await userService.UpdateUserAsync(updateUserDto);
        return Ok(result);
    }

    [HttpDelete("deleteUser")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var result = await userService.DeleteUserAsync(id);
        return Ok(result);
    }

    [HttpPost("assignRole")]
    public async Task<IActionResult> AssignRole(int userId, [FromBody] AssignRoleDto assignRoleDto)
    {
        var result = await userService.AssignRoleAsync(userId, assignRoleDto.ToUserRole());
        return Ok(result);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginUser(LoginDto loginDto)
    {
        var result = await userService.Login(loginDto);
        return Ok(result);
    }
    
}


public class RegisterUserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string ProfileImage { get; set; }
    public string RoleType { get; set; }
    public object RoleData { get; set; }
}

public class UpdateUserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ProfileImage { get; set; }

    public User ToUser()
    {
        return new User
        {
            Id = Id,
            Name = Name,
            Email = Email,
            Password = Password,
            ProfileImage = ProfileImage
        };
    }
}

public class AssignRoleDto
{
    public string RoleType { get; set; }
    public object RoleData { get; set; }

    public UserRole ToUserRole()
    {
        return RoleType.ToLower() switch
        {
            "manager" => new ManagerProfile
            {
                Department = (RoleData as dynamic)?.Department,
                Position = (RoleData as dynamic)?.Position
            },
            "teacher" => new TeacherProfile
            {
                Specialization = (RoleData as dynamic)?.Specialization,
                Degree = (RoleData as dynamic)?.Degree
            },
            "student" => new StudentProfile
            {
                EnrollmentNumber = (RoleData as dynamic)?.EnrollmentNumber,
                EnrollmentDate = (RoleData as dynamic)?.EnrollmentDate,
                Major = (RoleData as dynamic)?.Major
            },
            _ => null
        };
    }
}