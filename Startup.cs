using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            //HibernateService.GetSessionFactory();
            //HibernateService.GetSessionFactoryLog();
        }
    }
}