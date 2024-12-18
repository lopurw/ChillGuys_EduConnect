﻿using EduConnect.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace EduConnect.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase
{
    private readonly CourseService _courseService;

    private readonly VideoService _videoService;

    public CourseController(CourseService courseService, VideoService videoService)
    {
        _courseService = courseService;
        _videoService = videoService;
    }

    #region Course Methods

    [HttpGet("getCourses")]
    public async Task<IActionResult> GetCourses(int pageNumber = 1, int pageSize = 10)
    {
        var result = await _courseService.GetCoursesAsync(pageNumber, pageSize);
        return Ok(result);
    }
    
    [HttpGet("getStudentCourses")]
    public async Task<IActionResult> GetStudentCourses(int studentId ,int pageNumber = 1, int pageSize = 10)
    {
        var result = await _courseService.GetStudentsCoursesAsync(studentId, pageNumber, pageSize);
        return Ok(result);
    }


    [HttpGet("getCourseById")]
    public async Task<IActionResult> GetCourseById(int id)
    {
        var result = await _courseService.GetCourseByIdAsync(id);
        return Ok(result);
    }

    [HttpPost("addCourse")]
    public async Task<IActionResult> AddCourse(CreateCourseDto createCourseDto)
    {
        var result = await _courseService.AddCourse(createCourseDto);
        return Ok(result);
    }

    [HttpDelete("deleteCourse")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var result = await _courseService.DeleteCourseAsync(id);
        return Ok(result);
    }

    [HttpPut("updateCourse")]
    public async Task<IActionResult> UpdateCourse([FromBody] UpdateCourseDto updateCourseDto)
    {
        var result = await _courseService.UpdateCourse(updateCourseDto);
        return Ok(result);
    }

    [HttpPost("Join")]
    public async Task<IActionResult> JoinCourse([FromBody] JoinCourseRequest request)
    {
        if (request.StudentId <= 0 || request.CourseId <= 0)
            return BadRequest("Invalid student or course ID.");

        var response = await _courseService.JoinCourseAsync(request.StudentId, request.CourseId);

        if (response.StatusCode == 200)
            return Ok(response); 
        else
            return StatusCode((int)response.StatusCode, response); 
    }

    [HttpPost("Leave")]
    public async Task<IActionResult> LeaveCourse([FromBody] LeaveCourseRequest request)
    {
        if (request.StudentId <= 0 || request.CourseId <= 0)
            return BadRequest("Invalid student or course ID.");

        var response = await _courseService.LeaveCourseAsync(request.StudentId, request.CourseId);

        if (response.StatusCode == 200)
            return Ok(response); 
        else
            return StatusCode((int)response.StatusCode, response); 
    }
    
    [HttpPost("createVideo")]
    public async Task<IActionResult> CreateVideo([FromBody] CreateVideoDto createVideoDto)
    {
        var result = await _videoService.AddVideo(createVideoDto);
        return Ok(result);
    }
    
    [HttpGet("getVideos")]
    public async Task<IActionResult> GetVideos(int courseId)
    {
        var result = await _videoService.GetVideo(courseId);
        return Ok(result);
    }
    #endregion

    #region Lesson Methods

    [HttpPost("addLesson")]
    public async Task<IActionResult> AddLesson([FromBody] CreateLessonDto createLessonDto)
    {
        var result = await _courseService.AddLessonAsync(createLessonDto);
        return Ok(result);
    }

    [HttpGet("getLessonById")]
    public async Task<IActionResult> GetLessonById(int id)
    {
        var result = await _courseService.GetLessonByIdAsync(id);
        return Ok(result);
    }

    [HttpGet("getLessonsByCourseId")]
    public async Task<IActionResult> GetLessonsByCourseId(int courseId)
    {
        var result = await _courseService.GetLessonsByCourseIdAsync(courseId);
        return Ok(result);
    }

    [HttpPut("updateLesson")]
    public async Task<IActionResult> UpdateLesson([FromBody] UpdateLessonDto updateLessonDto)
    {
        var result = await _courseService.UpdateLessonAsync(updateLessonDto);
        return Ok(result);
    }

    [HttpDelete("deleteLesson")]
    public async Task<IActionResult> DeleteLesson(int id)
    {
        var result = await _courseService.DeleteLessonAsync(id);
        return Ok(result);
    }

    [HttpPost("completeLesson")]
    public async Task<IActionResult> CompleteLesson(CompleteLessonRequest request)
    {
        if (request.StudentId <= 0 || request.LessonId <= 0)
        {
            return BadRequest("Invalid student or lesson ID.");
        }

        var response = await _courseService.CompleteLessonAsync(request.StudentId, request.LessonId);

        if (response.StatusCode == 200)
        {
            return Ok(response);
        }
        else
        {
            return StatusCode((int)response.StatusCode, response);
        }
    }
    
    [HttpGet("courseCompletionStats")]
    public async Task<IActionResult> GetCourseCompletionStats(int studentId)
    {
        var result = await _courseService.GetStudentCourseCompletionStatsAsync(studentId);

        if (result.StatusCode == 200)
            return Ok(result.Data);
        else
            return StatusCode((int)result.StatusCode);
    }
    #endregion
}

public class CompleteLessonRequest
{
    public int StudentId { get; set; }
    public int LessonId { get; set; }
}
public class JoinCourseRequest
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }
}

public class LeaveCourseRequest
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }
}

