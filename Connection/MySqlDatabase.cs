using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Connection
{
    public class MySqlDatabase : IDisposable
    {
        String stringConn = ConfigurationManager.AppSettings["Bd.ConnectionString"];
            
        public MySqlConnection Connection;

        public MySqlDatabase()
        {
            Connection = new MySqlConnection();
            this.Connection.ConnectionString = !String.IsNullOrEmpty(stringConn) ? stringConn : "server=localhost;uid=root;pwd=m4tr1x;database=prjucb;charset=utf8";
            this.Connection.Open();
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}