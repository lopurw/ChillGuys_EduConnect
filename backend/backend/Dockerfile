# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./backend\backend\EduConnect.csproj" --disable-parallel
RUN dotnet publish "./backend\backend\EduConnect.csproj" -c release -o /app --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5220
EXPOSE 5221

ENTRYPOINT ["dotnet", "EduConnect.dll"]