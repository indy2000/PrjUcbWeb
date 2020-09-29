using MySql.Data.MySqlClient;
using PrjUcbWeb.Connection;
using PrjUcbWeb.Models;
using PrjUcbWeb.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace PrjUcbWeb.ControllersWebApi
{
    public class UsuarioApiController : BaseApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        private MySqlDatabase MySqlDatabase { get; set; }

        //public UsuarioController(MySqlDatabase mySqlDatabase)
        //{
        //    this.MySqlDatabase = mySqlDatabase;
        //}

        [HttpGet]
        [Route("api/getUsuario")]
        public async Task<List<Usuario>> getUsuario()
        {
            var senha = Criptografia.doEncryptAES("m4tr1x");
            List<Usuario> retorno = new List<Usuario>();
            MySqlDatabase = new MySqlDatabase();
            var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            sql.CommandText = @"SELECT * FROM CADASTRO";

            using (var reader = await sql.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    retorno.Add(new Usuario
                    {
                        id = Convert.ToInt64(reader["ID"]),
                        nome = reader["NOME"].ToString(),
                        email = reader["EMAIL"].ToString(),
                        senha = reader["SENHA"].ToString(),
                        tipo_usuario = reader["TIPO_USUARIO"].ToString().Contains("administrador") ? 1 : 2
                    });
                }
            }

            return retorno;
        }
    }
}