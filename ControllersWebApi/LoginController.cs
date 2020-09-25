using MySql.Data.MySqlClient;
using PrjUcbWeb.Connection;
using PrjUcbWeb.Models;
using PrjUcbWeb.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PrjUcbWeb.ControllersWebApi
{
    
    public class LoginController : ApiController
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

        public LoginController(MySqlDatabase mySqlDatabase)
        {
            this.MySqlDatabase = mySqlDatabase;
        }

        [HttpGet]
        [Route("api/login")]
        public async Task<ApiRetorno<Usuario>> getLogin(String usuario, String senha)
        {
            ApiRetorno<Usuario> retorno = new ApiRetorno<Usuario>();
            Usuario objeto = new Usuario();

            var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            StringBuilder sqlQuery = new StringBuilder();

            sqlQuery.Append("SELECT ID, NOME, USUARIO, SENHA, EMAIL, TIPO_USUARIO FROM TB_USUARIO ");
            sqlQuery.Append(String.Format("WHERE USUARIO = {0}", usuario));

            sql.CommandText = sqlQuery.ToString();

            try
            {
                using (var reader = await sql.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        objeto = new Usuario
                        {
                            id = Convert.ToInt64(reader["ID"]),
                            nome = reader["NOME"].ToString(),
                            usuario = reader["USUARIO"].ToString(),
                            email = reader["EMAIL"].ToString(),
                            senha = reader["SENHA"].ToString(),
                            tipo_usuario = Convert.ToInt64(reader["TIPO_USUARIO"])
                        };
                    }
                }
                if (validaLogin(objeto.senha, senha))
                {
                    retorno.objeto = objeto;

                }
                else
                {
                    retorno.mensagem = "Usuário ou Senha inválido.";
                }
                retorno.ok = true;
            }
            catch (Exception e)
            {
                retorno.ok = false;
                retorno.exception = !String.IsNullOrEmpty(e.Message) ? e.Message : e.InnerException.Message;
            }
            return retorno;
        }

        private Boolean validaLogin(String senhaServidor, String senhaRequest)
        {
            if (String.Equals(Criptografia.doDecryptAES(senhaServidor), senhaRequest))
                return true;
            else
                return false;
        }
    }
}