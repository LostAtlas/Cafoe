using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LostAtlasCAH.API.cahdb_test;
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
            services.AddDbContext<cahdb_testContext>(o => o.UseMySQL("server=localhost;port=3306;user=root;password=Scorpio94!;database=cahdb_test"));
            services.AddScoped<ICAHRepository, CAHRepository>();
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
                cfg.CreateMap<cahdb_test.Alldecks, Models.Deck>();
                cfg.CreateMap<cahdb_test.Blackcardstable, Models.BlackCard>();
                cfg.CreateMap<cahdb_test.Whitecardstable, Models.WhiteCard>();
                cfg.CreateMap<Models.Deck, cahdb_test.Alldecks>();

            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
