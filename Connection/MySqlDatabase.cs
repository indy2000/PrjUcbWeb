using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Connection
{
    public class MySqlDatabase : IDisposable
    {
        String stringConn = "server=127.0.0.1;uid=root;pwd=m4tr1x;database=prjucb;charset=utf8";
        public MySqlConnection Connection;

        public MySqlDatabase(String stringConexao)
        {
            Connection = new MySqlConnection();
            this.Connection.ConnectionString = stringConexao;
            this.Connection.Open();
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}