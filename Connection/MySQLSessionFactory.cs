using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PrjUcbWeb.Connection
{
    public class MySQLSessionFactory
    {
        private static String stringConn = ConfigurationManager.AppSettings["Bd.ConnectionString"];
        private static ISessionFactory session;

        public static async Task<ISessionFactory> CreateSession()
        {
            if(session != null)
            {
                return session;
            }

            IPersistenceConfigurer dbConfig = MySQLConfiguration.Standard.ConnectionString(stringConn);

            var normalConfig = new NHibernate.Cfg.Configuration().Configure(CONSTANTES.CaminhoFisico + "\\hibernate.cfg.xml");

            var mapConfig = Fluently.Configure(normalConfig).Database(dbConfig).Mappings(c => c.FluentMappings.AddFromAssemblyOf<Mapping.UsuarioMap>());

            session = mapConfig.BuildSessionFactory();

            return session;
        }

        public static ISession StartSession()
        {
            ISession session = CreateSession().Result.OpenSession();
            //session.FlushMode = FlushMode.Always;
            return session;
        }
    }
}