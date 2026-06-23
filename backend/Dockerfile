FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app


COPY src/Finlad.Domain/Finlad.Domain.csproj src/Finlad.Domain/
COPY src/FinLad.Api/FinLad.Api.csproj src/FinLad.Api/
RUN dotnet restore "src/FinLad.Api/FinLad.Api.csproj"

COPY . ./
RUN dotnet publish "src/FinLad.Api/FinLad.Api.csproj" -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .

ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080
ENTRYPOINT ["dotnet", "FinLad.Api.dll"]
