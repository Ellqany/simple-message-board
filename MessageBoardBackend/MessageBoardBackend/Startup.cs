using MessageBoardBackend.Concreate;
using MessageBoardBackend.Models;
using MessageBoardBackend.Models.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Text;

namespace MessageBoardBackend
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
            services.AddDbContext<APIContext>(opt =>
            opt.UseInMemoryDatabase("Test"));
            services.AddTransient<IMessagesRepository, MessagesRepository>();
            services.AddTransient<IUsersRepository, UserRepository>();
            services.AddCors(options => options.AddPolicy("Cors",
                builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                }
                ));

            var SigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the secret phase"));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = SigningKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseBrowserLink();

            app.UseAuthentication();

            app.UseCors("Cors");
            app.UseMvc();
            app.UseStaticFiles();
            //SeedData(app.ApplicationServices.GetService<APIContext>());
        }

        public static void SeedData(APIContext context)
        {
            context.Messages.AddRange(new List<Message>{
                new Message { Text = "Hy There", Owner = "Omer" },
                new Message { Text = "Hy Mohammed", Owner = "Ali" },
                new Message { Text = "How are you body?", Owner = "Ahmed" }
            });
            context.SaveChanges();
        }

    }
}
