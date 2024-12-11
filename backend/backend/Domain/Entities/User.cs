namespace EduConnect.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string ProfileImage { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Навигационное свойство для роли
    public UserRole Role { get; set; }
}

public abstract class UserRole
{
    public int Id { get; set; } // ID для каждой роли
    public int UserId { get; set; } // Внешний ключ к User

    // Навигационное свойство
    public User User { get; set; }
}

public class ManagerProfile : UserRole
{
    public string Department { get; set; }
    public string Position { get; set; }
}

public class TeacherProfile : UserRole
{
    public string Specialization { get; set; }
    public string Degree { get; set; }
}

public class StudentProfile : UserRole
{
    public string EnrollmentNumber { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public string Major { get; set; }
    
    public ICollection<StudentCourse>? Courses { get; set; }
}

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int? TeacherId { get; set; }
    public User? Teacher { get; set; }
    public ICollection<StudentCourse>? Students { get; set; }
    public ICollection<Lesson>? Lessons { get; set; }
    
    public string? VideoUrl { get; set; }
    
    public string? DocumentationUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class StudentCourse
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public string Status { get; set; } // Например, "Submitted", "Pending"
    public int? Score { get; set; }

    // Навигационные свойства
    public Course Course { get; set; }
    public User Student { get; set; }
}

public class Lesson
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public bool IsCompleted { get; set; } = false;
    public string[] Resources { get; set; } 

    // Навигационные свойства
    public Course Course { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string? Category { get; set; }  
    public List<string>? Tasks { get; set; } 
    public string? AdditionalMaterials { get; set; } 
    public List<Comment>? Comments { get; set; } 
    public string? Image { get; set; }  
    public ICollection<User>? Students { get; set; } 
}
public class Comment
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    
    public Project Project { get; set; }
    public string Author { get; set; }
    public string Content { get; set; }
}

public class Portfolio
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public ICollection<Project> Projects { get; set; }
    public string[] Achievements { get; set; } 
    public User Student { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}


