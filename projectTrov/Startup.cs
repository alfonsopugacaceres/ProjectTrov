using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Context;
using Models;

namespace projectTrov
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
            services.AddCors(options => options.AddDefaultPolicy(builder =>
                        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
            //Injecting the in memory database with our Default Context as a databse structure
            services.AddDbContext<DefaultContext>( option=> option.UseInMemoryDatabase(databaseName: "database_name"));

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            //   services.AddCors(options=>{
            //     options.AddPolicy(
            //         name:LocalHostOrigin,
            //         builder=>{
            //             builder.WithOrigins("http://localhost:3000", "http://localhost:5000", "https://localhost:5001")
            //             .AllowAnyMethod()
            //             .AllowAnyHeader()
            //             .AllowAnyOrigin();
            //         }); 
            // });

            app.UseRouting();

            app.UseCors();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private static void DefaultData(DefaultContext context){
            var  entry1 = new Incident{
                Id = 1,
                Vin = string.Empty,
                IncidentDate = string.Empty,
                Note = string.Empty, 
                MakeModel = string.Empty,
                VinYear = string.Empty
            };
            context.Add(entry1);
            var  entry2 = new Incident{
                Id = 2,
                Vin = string.Empty,
                IncidentDate = string.Empty,
                Note = string.Empty, 
                MakeModel = string.Empty,
                VinYear = string.Empty
            };
            context.Add(entry1);
            context.SaveChanges();
        }
    }

}
