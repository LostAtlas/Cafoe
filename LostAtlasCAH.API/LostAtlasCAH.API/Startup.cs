using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LostAtlasCAH.API.Entities;
using LostAtlasCAH.API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace LostAtlasCAH.API
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.Formatting = Formatting.Indented;
            });

            //TODO: abstract out connectionString.
            services.AddDbContext<CAHDbContext>(o => o.UseMySQL("server=localhost;port=3306;user=root;password=root;database=cahdb"));
            services.AddScoped<ICAHDeckRepository, CAHDeckRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Entities.Decks, Models.Deck>();
                cfg.CreateMap<Entities.BlackCards, Models.Card>();
                cfg.CreateMap<Entities.WhiteCards, Models.Card>();
            });


            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
