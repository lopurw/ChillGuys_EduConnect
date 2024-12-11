using EduConnect.Domain.Entities;
using EduConnect.Infrastructure.Data;

namespace EduConnect.Infrastructure.Seed;

public class Seeder
{
    private readonly DataContext _context;

    public Seeder(DataContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        if (!_context.Users.Any())
        {
            SeedUsers();
        }
        _context.SaveChanges();

        if (!_context.Courses.Any())
        {
             SeedCourses();
        }
        _context.SaveChanges();

        if (!_context.Projects.Any())
        {
            SeedProjects();
        }

        _context.SaveChanges();
    }

    private void SeedUsers()
    {
        var users = new List<User>
        {
            new User
            {
                Id = 1,
                Email = "admin@example.com",
                Password = "hashedpassword", // Предполагается хэш пароля
                Name = "Admin User",
                ProfileImage = "https://example.com/admin.jpg",
                Role = new ManagerProfile
                {
                    Department = "IT",
                    Position = "Administrator"
                },
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Id = 2,
                Email = "teacher1@example.com",
                Password = "hashedpassword",
                Name = "John Teacher",
                ProfileImage = "https://example.com/teacher.jpg",
                Role = new TeacherProfile
                {
                    Specialization = "Mathematics",
                    Degree = "PhD"
                },
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Id = 3,
                Email = "student1@example.com",
                Password = "hashedpassword",
                Name = "Jane Student",
                ProfileImage = "https://example.com/student.jpg",
                Role = new StudentProfile
                {
                    EnrollmentNumber = "EN12345",
                    EnrollmentDate = DateTime.UtcNow.AddYears(-1),
                    Major = "Computer Science"
                },
                CreatedAt = DateTime.UtcNow
            }
        };

        _context.Users.AddRange(users);
    }

    private void SeedCourses()
    {
        var courses = new List<Course>
        {
            new Course
            {
                Id = 1,
                Title = "Mathematics 101",
                Description = "Introduction to Mathematics",
                TeacherId = _context.Users.First(u => u.Role is TeacherProfile).Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        _context.Courses.AddRange(courses);
    }

    private void SeedProjects()
    {
        _context.Projects.Add(new Project
        {
            Id = 1,
            Title = "Math Research Project",
            Description = "Research advanced mathematical topics",
            Students = new List<User> { _context.Users.First(u => u.Role is StudentProfile) }
        });
    }
}
