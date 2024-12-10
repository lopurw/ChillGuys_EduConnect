using System.Net;
using EduConnect.Application.Responses;
using EduConnect.Domain.Entities;
using EduConnect.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EduConnect.Infrastructure.Services;

public class CourseService(DataContext context)
{
    public async Task<Response<string>> AddCourse(CreateCourseDto createCourseDto)
    {
        try
        {
            var course = new Course
            {
                Title = createCourseDto.Title,
                Description = createCourseDto.Description,
                TeacherId = createCourseDto.TeacherId,
                VideoUrl = createCourseDto.VideoUrl,
                DocumentationUrl = createCourseDto.DocumentationUrl,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await context.Courses.AddAsync(course);
            await context.SaveChangesAsync();
            return new Response<string>("Course added successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<PagedResponse<List<GetCoursesDto>>> GetCoursesAsync(int pageNumber = 1, int pageSize = 1)
    {
        try
        {
            var query = context.Courses
                .Include(c => c.Teacher)
                .Include(c => c.Lessons)
                .Include(c => c.Students)
                .AsQueryable();

            var totalRecords = await query.CountAsync();
            var courses = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Map to GetCoursesDto
            var courseDtos = courses.Select(course => new GetCoursesDto
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,
                TeacherId = course.Teacher.Id,
                VideoUrl = course.VideoUrl,
                DocumentationUrl = course.DocumentationUrl,
                TeacherName = course.Teacher.Name,
                Students = course.Students.Select(s => new StudentDto
                {
                    Id = s.Id,
                    Name = s.Student.Name
                }).ToList(),
                CreatedAt = course.CreatedAt,
                UpdatedAt = course.UpdatedAt
            }).ToList();

            return new PagedResponse<List<GetCoursesDto>>(courseDtos, totalRecords, pageNumber, pageSize);
        }
        catch (Exception ex)
        {
            return new PagedResponse<List<GetCoursesDto>>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }


    public async Task<Response<GetCourseDto>> GetCourseByIdAsync(int id)
    {
        try
        {
            var course = await context.Courses
                .Include(c => c.Teacher)
                .Include(c => c.Lessons)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return new Response<GetCourseDto>(HttpStatusCode.NotFound, "Course not found");

            var courseDto = new GetCourseDto
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,
                VideoUrl = course.VideoUrl,
                DocumentationUrl = course.DocumentationUrl,
                TeacherName = course.Teacher?.Name,
                Lessons = course.Lessons?.Select(l => l.Title).ToList(),
                CreatedAt = course.CreatedAt,
                UpdatedAt = course.UpdatedAt
            };

            return new Response<GetCourseDto>(courseDto);
        }
        catch (Exception ex)
        {
            return new Response<GetCourseDto>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }


    public async Task<Response<string>> UpdateCourse(UpdateCourseDto updateCourseDto)
    {
        try
        {
            var course = await context.Courses.FirstOrDefaultAsync(c => c.Id == updateCourseDto.Id);
            if (course == null)
                return new Response<string>(HttpStatusCode.NotFound, "Course not found");

            course.Title = updateCourseDto.Title;
            course.Description = updateCourseDto.Description;
            course.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();
            return new Response<string>("Course updated successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<bool>> DeleteCourseAsync(int id)
    {
        try
        {
            var course = await context.Courses.FirstOrDefaultAsync(c => c.Id == id);
            if (course == null)
                return new Response<bool>(HttpStatusCode.NotFound, "Course not found");

            context.Courses.Remove(course);
            await context.SaveChangesAsync();
            return new Response<bool>(true);
        }
        catch (Exception ex)
        {
            return new Response<bool>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    
    public async Task<Response<string>> JoinCourseAsync(int studentId, int courseId)
    {
        try
        {
            // Fetch the student
            var student = await context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == studentId);
            if (student.Role is not StudentProfile)
            {
                return new Response<string>(HttpStatusCode.NotFound, "Student not found");
            }

            if (student == null)
                return new Response<string>(HttpStatusCode.NotFound, "Student not found");

            // Fetch the course
            var course = await context.Courses
                .Include(c => c.Students) // Include the students who are already enrolled
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return new Response<string>(HttpStatusCode.NotFound, "Course not found");

            // Check if the student is already enrolled in the course
            if (course.Students.Any(s => s.Id == studentId))
                return new Response<string>(HttpStatusCode.BadRequest, "Student is already enrolled in this course");
            
            var studentCourse = new StudentCourse
            {
                StudentId = studentId,
                Status = "asas",
                Course = course
            };

            // Add the student-course relationship to the context
            await context.StudentCourses.AddAsync(studentCourse);
            await context.SaveChangesAsync();

            return new Response<string>("Student successfully enrolled in the course");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    
    public async Task<Response<string>> LeaveCourseAsync(int studentId, int courseId)
    {
        try
        {
            // Fetch the student
            var student = await context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == studentId);
            if (student.Role is not StudentProfile )
            {
                return new Response<string>(HttpStatusCode.NotFound, "Student not found");
            }

            if (student == null)
                return new Response<string>(HttpStatusCode.NotFound, "Student not found");

            // Fetch the course
            var course = await context.Courses
                .Include(c => c.Students)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return new Response<string>(HttpStatusCode.NotFound, "Course not found");

            // Find the relationship between the student and the course
            var studentCourse = await context.StudentCourses
                .FirstOrDefaultAsync(sc => sc.StudentId == studentId && sc.Course.Id == courseId);

            if (studentCourse == null)
                return new Response<string>(HttpStatusCode.BadRequest, "Student is not enrolled in this course");

            // Remove the relationship from the context
            context.StudentCourses.Remove(studentCourse);
            await context.SaveChangesAsync();

            return new Response<string>("Student successfully removed from the course");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<string>> AddLessonAsync(CreateLessonDto createLessonDto)
    {
        try
        {
            // Fetch the course
            var course = await context.Courses.FirstOrDefaultAsync(c => c.Id == createLessonDto.CourseId);
            if (course == null)
                return new Response<string>(HttpStatusCode.NotFound, "Course not found");

            // Create the lesson
            var lesson = new Lesson
            {
                CourseId = createLessonDto.CourseId,
                Title = createLessonDto.Title,
                Content = createLessonDto.Content,
                Resources = createLessonDto.Resources,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await context.Lessons.AddAsync(lesson);
            await context.SaveChangesAsync();

            return new Response<string>("Lesson added successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    
    public async Task<Response<GetLessonDto>> GetLessonByIdAsync(int id)
    {
        try
        {
            // Fetch the lesson
            var lesson = await context.Lessons
                .Include(l => l.Course) // Include course details if needed
                .FirstOrDefaultAsync(l => l.Id == id);

            if (lesson == null)
                return new Response<GetLessonDto>(HttpStatusCode.NotFound, "Lesson not found");

            // Map the lesson to GetLessonDto
            var lessonDto = new GetLessonDto
            {
                Id = lesson.Id,
                CourseId = lesson.CourseId,
                Title = lesson.Title,
                Content = lesson.Content,
                Resources = lesson.Resources,
                CreatedAt = lesson.CreatedAt,
                UpdatedAt = lesson.UpdatedAt
            };

            return new Response<GetLessonDto>(lessonDto);
        }
        catch (Exception ex)
        {
            return new Response<GetLessonDto>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<List<GetLessonDto>>> GetLessonsByCourseIdAsync(int courseId)
    {
        try
        {
            // Fetch lessons for the course
            var lessons = await context.Lessons
                .Where(l => l.CourseId == courseId)
                .ToListAsync();

            var lessonDtos = lessons.Select(lesson => new GetLessonDto
            {
                Id = lesson.Id,
                CourseId = lesson.CourseId,
                Title = lesson.Title,
                Content = lesson.Content,
                Resources = lesson.Resources,
                CreatedAt = lesson.CreatedAt,
                UpdatedAt = lesson.UpdatedAt
            }).ToList();

            return new Response<List<GetLessonDto>>(lessonDtos);
        }
        catch (Exception ex)
        {
            return new Response<List<GetLessonDto>>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<string>> UpdateLessonAsync(UpdateLessonDto updateLessonDto)
    {
        try
        {
            // Fetch the lesson
            var lesson = await context.Lessons.FirstOrDefaultAsync(l => l.Id == updateLessonDto.Id);
            if (lesson == null)
                return new Response<string>(HttpStatusCode.NotFound, "Lesson not found");

            // Update the lesson properties
            lesson.Title = updateLessonDto.Title;
            lesson.Content = updateLessonDto.Content;
            lesson.Resources = updateLessonDto.Resources;
            lesson.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            return new Response<string>("Lesson updated successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<string>> DeleteLessonAsync(int id)
    {
        try
        {
            // Fetch the lesson
            var lesson = await context.Lessons.FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
                return new Response<string>(HttpStatusCode.NotFound, "Lesson not found");

            context.Lessons.Remove(lesson);
            await context.SaveChangesAsync();

            return new Response<string>("Lesson deleted successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

}
public class CreateCourseDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string VideoUrl { get; set; }
    public string DocumentationUrl { get; set; }
    public int TeacherId { get; set; }
}

public class UpdateCourseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}


public class GetCoursesDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string VideoUrl { get; set; }
    public string DocumentationUrl { get; set; }
    public int TeacherId { get; set; }
    public string TeacherName { get; set; }
    public List<StudentDto> Students { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class StudentDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Major { get; set; }
}

public class CreateLessonDto
{
    public int CourseId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string[] Resources { get; set; }
}

public class UpdateLessonDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string[] Resources { get; set; }
}

public class GetLessonDto
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string[] Resources { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class GetCourseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string TeacherName { get; set; }
    public string VideoUrl { get; set; }
    public string DocumentationUrl { get; set; }
    public List<string> Lessons { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}


// public class User
// {
//     public int Id { get; set; }
//     public string Email { get; set; }
//     public string Password { get; set; }
//     public string Name { get; set; }
//     public string ProfileImage { get; set; }
//     public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
//     public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
//
//     // Навигационное свойство для роли
//     public UserRole Role { get; set; }
// }
//
// public abstract class UserRole
// {
//     public int Id { get; set; } // ID для каждой роли
//     public int UserId { get; set; } // Внешний ключ к User
//
//     // Навигационное свойство
//     public User User { get; set; }
// }
//
// public class ManagerProfile : UserRole
// {
//     public string Department { get; set; }
//     public string Position { get; set; }
// }
//
// public class TeacherProfile : UserRole
// {
//     public string Specialization { get; set; }
//     public string Degree { get; set; }
// }
//
// public class StudentProfile : UserRole
// {
//     public string EnrollmentNumber { get; set; }
//     public DateTime EnrollmentDate { get; set; }
//     public string Major { get; set; }
//     
//     public ICollection<StudentCourse> Courses { get; set; }
// }
