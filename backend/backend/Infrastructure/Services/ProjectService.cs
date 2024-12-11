using System.Net;
using EduConnect.Application.Responses;
using EduConnect.Domain.Entities;
using EduConnect.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EduConnect.Infrastructure.Services;

public class ProjectService
{
    private readonly DataContext _context;

    public ProjectService(DataContext context)
    {
        _context = context;
    }

    public async Task<Response<string>> AddProject(CreateProjectDto createProjectDto)
    {
        try
        {
            var project = new Project
            {
                Title = createProjectDto.Title,
                Description = createProjectDto.Description,
            };
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return new Response<string>("Project added successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<GetProjectDto>> GetProjectByIdAsync(int id)
    {
        try
        {
            var project = await _context.Projects
                .Include(p => p.Comments)  // Include comments
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
                return new Response<GetProjectDto>(HttpStatusCode.NotFound, "Project not found");

            var projectDto = new GetProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                Category = project.Category,
                Tasks = project.Tasks,
                AdditionalMaterials = project.AdditionalMaterials,
                Comments = project.Comments,
                Image = project.Image
            };

            return new Response<GetProjectDto>(projectDto);
        }
        catch (Exception ex)
        {
            return new Response<GetProjectDto>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }


    public async Task<Response<string>> UpdateProject(UpdateProjectDto updateProjectDto)
    {
        try
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == updateProjectDto.Id);
            if (project == null)
                return new Response<string>(HttpStatusCode.NotFound, "Project not found");

            project.Title = updateProjectDto.Title;
            project.Description = updateProjectDto.Description;
            await _context.SaveChangesAsync();
            return new Response<string>("Project updated successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    public async Task<Response<string>> DeleteProjectAsync(int id)
    {
        try
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            if (project == null)
                return new Response<string>(HttpStatusCode.NotFound, "Project not found");

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return new Response<string>("Project deleted successfully");
        }
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    
    public async Task<Response<List<GetProjectDto>>> GetProjectsAsync()
    {
        try
        {
            var projects = await _context.Projects
                .ToListAsync();

            var projectDtos = projects
                .Select(p => new GetProjectDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description
                })
                .ToList();

            return new Response<List<GetProjectDto>>(projectDtos);
        }
        catch (Exception ex)
        {
            return new Response<List<GetProjectDto>>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
}

public class CreateProjectDto
{
    public string Title { get; set; }
    public string Description { get; set; }

}

public class UpdateProjectDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}

public class GetProjectDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string? Category { get; set; }  // New property
    public List<string>? Tasks { get; set; }  // New property
    public string? AdditionalMaterials { get; set; }  // New property
    public List<Comment>? Comments { get; set; }  // New property
    public string? Image { get; set; }  // New property
}
