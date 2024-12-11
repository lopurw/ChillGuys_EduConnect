namespace EduConnect.Controllers;

using EduConnect.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly ProjectService _projectService;

    public ProjectController(ProjectService projectService)
    {
        _projectService = projectService;
    }

    #region Project Methods

    [HttpPost("addProject")]
    public async Task<IActionResult> AddProject([FromBody] CreateProjectDto createProjectDto)
    {
        var result = await _projectService.AddProject(createProjectDto);
        return StatusCode((int)result.StatusCode, result);
    }

    [HttpGet("getProjectById")]
    public async Task<IActionResult> GetProjectById(int id)
    {
        var result = await _projectService.GetProjectByIdAsync(id);
        return StatusCode((int)result.StatusCode, result);
    }

    [HttpPut("updateProject")]
    public async Task<IActionResult> UpdateProject([FromBody] UpdateProjectDto updateProjectDto)
    {
        var result = await _projectService.UpdateProject(updateProjectDto);
        return StatusCode((int)result.StatusCode, result);
    }

    [HttpDelete("deleteProject")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var result = await _projectService.DeleteProjectAsync(id);
        return StatusCode((int)result.StatusCode, result);
    }

    [HttpGet("getProjects")]
    public async Task<IActionResult> GetProjects()
    {
        var result = await _projectService.GetProjectsAsync();
        return StatusCode((int)result.StatusCode, result);
    }

    #endregion
}
