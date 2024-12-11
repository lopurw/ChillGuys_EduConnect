using EduConnect.Domain.Entities;
using EduConnect.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

namespace EduConnect.Infrastructure.Data;
public class DataContext : DbContext
{

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
 
    public DbSet<User> Users { get; set; }
    public DbSet<Video> Videos { get; set; }
    public DbSet<UserRole> Roles { get; set; }
    public DbSet<ManagerProfile> ManagerProfiles { get; set; }
    public DbSet<TeacherProfile> TeacherProfiles { get; set; }
    public DbSet<StudentProfile> StudentProfiles { get; set; }
    public DbSet<StudentCourse> StudentCourses { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Comment> Comments { get; set; }
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Один-к-одному связь между User и Role
        modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithOne(r => r.User)
            .HasForeignKey<UserRole>(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Использование TPH (таблица для наследования)
        modelBuilder.Entity<UserRole>()
            .HasDiscriminator<string>("RoleType")
            .HasValue<ManagerProfile>("Manager")
            .HasValue<TeacherProfile>("Teacher")
            .HasValue<StudentProfile>("Student");
        
        
         modelBuilder.Entity<ManagerProfile>()
                .HasBaseType<UserRole>();
        
            // TeacherProfile
            modelBuilder.Entity<TeacherProfile>()
                .HasBaseType<UserRole>();
        
            // StudentProfile
            modelBuilder.Entity<StudentProfile>()
                .HasBaseType<UserRole>();
        
            // StudentCourse
            modelBuilder.Entity<StudentCourse>()
                .HasKey(sc => sc.Id);

            modelBuilder.Entity<StudentCourse>()
                .HasOne(sc => sc.Course)
                .WithMany(c => c.Students);
        
            modelBuilder.Entity<StudentCourse>()
                .HasOne(sc => sc.Student)
                .WithMany()
                .HasForeignKey(sc => sc.StudentId);
        
            // Course
            modelBuilder.Entity<Course>()
                .HasKey(c => c.Id);
        
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Teacher)
                .WithMany()
                .HasForeignKey(c => c.TeacherId);
        
            // Lesson
            modelBuilder.Entity<Lesson>()
                .HasKey(l => l.Id);
        
            modelBuilder.Entity<Lesson>()
                .HasOne(l => l.Course)
                .WithMany(c => c.Lessons)
                .HasForeignKey(l => l.CourseId);
        
            // Project
            modelBuilder.Entity<Project>()
                .HasKey(p => p.Id);
        
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Students)
                .WithMany();
        
            // Portfolio
            modelBuilder.Entity<Portfolio>()
                .HasKey(pf => pf.Id);
        
            modelBuilder.Entity<Portfolio>()
                .HasOne(pf => pf.Student)
                .WithMany()
                .HasForeignKey(pf => pf.StudentId);
        
            modelBuilder.Entity<Portfolio>()
                .HasMany(pf => pf.Projects)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
    }
    
}