using System.Net;

namespace EduConnect.Application.Responses;

public class Response<T>
{
    public T Data { get; set; }
    public int? StatusCode { get; set; }
    public List<string>? Errors { get; set; } = new List<string>();


    public Response(T data, List<string> errors, HttpStatusCode statusCode)
    {
        StatusCode = (int)statusCode;
        Data = data;
        Errors = errors;
    }
    public Response(HttpStatusCode statusCode, List<string> errors)
    {
        StatusCode = (int)statusCode;
        Errors = errors;
    }
    public Response(HttpStatusCode statusCode, string error)
    {
        StatusCode = (int)statusCode;
        Errors.Add(error);
    }
    
    public Response(T data)
    {
        StatusCode = 200;
        Data = data;
    }

}