using EduConnect.Infrastructure.Data;
using EduConnect.Infrastructure.Seed;
using EduConnect.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connection = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<DataContext>(conf => conf.UseNpgsql(connection));

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
));

builder.Services.AddScoped<Seeder>();
builder.Services.AddScoped<CourseService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddControllers();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

try
{
    var serviceProvider = app.Services.CreateScope().ServiceProvider;
    var dataContext = serviceProvider.GetRequiredService<DataContext>();
    await dataContext.Database.MigrateAsync();

    // seed data
    var seeder = serviceProvider.GetRequiredService<Seeder>();
    seeder.Seed();
}
catch (Exception)
{
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthentication();
//are you allowed? 
app.UseAuthorization();

app.MapControllers();

app.Run();