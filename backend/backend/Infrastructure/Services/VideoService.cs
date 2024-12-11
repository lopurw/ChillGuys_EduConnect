using System.Net;
using EduConnect.Application.Responses;
using EduConnect.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EduConnect.Infrastructure.Services;

public class VideoService(DataContext context)
{

    public async Task<Response<string>> AddVideo(CreateVideoDto createVideoDto)
    {
        try
        {
            var video = new Video
            {
                CourseId = createVideoDto.CourseId,
                Url = createVideoDto.VideoUrl,
            };
            await context.Videos.AddAsync(video);
            await context.SaveChangesAsync();
            return new Response<string>("Video added successfully");
        }   
        catch (Exception ex)
        {
            return new Response<string>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }


    public async Task<Response<List<GetVideoDto>>>  GetVideo(int id)
    {
        try
        {
            var videos = await context.Videos
                .Where(v => v.CourseId == id)
                .Select(v => new GetVideoDto
                {
                    Id = v.Id,
                    Url = v.Url,
                    CourseId = v.CourseId
                })
                .ToListAsync();
            return new Response<List<GetVideoDto>>(videos);
        }
        catch (Exception ex)
        {
            return new Response<List<GetVideoDto>>(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
}

public class CreateVideoDto
{
    public int CourseId { get; set; }
    public string VideoUrl { get; set; }
    
}

public class GetVideoDto
{
    public int Id { get; set; }
    public string Url { get; set; }
    public int CourseId { get; set; }
}