using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using TodoApi.Models;
using TodoApi.Models.Repository;
using TodoApi.Models.DataManager;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace TodoApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://adfs.gws.ms/adfs";
                    options.Audience = "microsoft:identityserver:cbcc1e3c-05eb-4dde-881c-f8d37308a85e";
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = "http://adfs.gws.ms/adfs/services/trust"
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnChallenge = async ctx =>
                        {
                            var data = ctx.Response;
                        },
                        OnTokenValidated = async ctx =>
                        {
                            var claims = new List<Claim>
                            {
                                new Claim("GivenType", "GivenValue")
                            };

                            ctx.Principal.AddIdentity(new ClaimsIdentity(claims));
                        }
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Given Policy", policy => policy.RequireClaim("GivenType", "GivenValue"));
            });

            services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                   .AddAuthenticationSchemes("Bearer")
                   .RequireAuthenticatedUser()
                   .Build();

                options.Filters.Add(new AuthorizeFilter(policy));
            });


            services.AddDbContext<TodoContext>(opt =>
              opt.UseSqlServer(Configuration["ConnectionString:ToDoDB"]));
            services.AddScoped<IDataRepository<TodoItem>, ItemManager>();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(builder =>
                     builder.WithOrigins("http://localhost:4200", "http://localhost:44307")
                     .AllowAnyOrigin().AllowAnyHeader().WithMethods("GET", "DELETE", "POST", "PUT"));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
