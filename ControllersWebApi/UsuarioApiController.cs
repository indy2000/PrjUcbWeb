using MySql.Data.MySqlClient;
using NHibernate;
using PrjUcbWeb.Connection;
using PrjUcbWeb.Entities;
using PrjUcbWeb.Enums;
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
        public async Task<List<UsuarioModels>> getUsuario()
        {
            var senha = Criptografia.doEncryptAES("m4tr1x");
            List<UsuarioModels> retorno = new List<UsuarioModels>();
            MySqlDatabase = new MySqlDatabase();
            var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            sql.CommandText = @"SELECT * FROM CADASTRO";

            using (var reader = await sql.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    retorno.Add(new UsuarioModels
                    {
                        id = Convert.ToInt64(reader["ID"]).ToString(),
                        nome = reader["NOME"].ToString(),
                        email = reader["EMAIL"].ToString(),
                        usuario = reader["USUARIO"].ToString(),
                        senha = reader["SENHA"].ToString(),
                        tipo_usuario = reader["TIPO_USUARIO"].ToString().Contains("administrador") ? 1 : 2
                    });
                }
            }

            return retorno;
        }

        [HttpPost]
        [Route("api/Usuarioapi/Cadastrar")]
        public async Task<ApiRetorno<Usuario>> Cadastrar(Cadastro_UsuarioModels value)
        {
            ApiRetorno<Usuario> retorno = new ApiRetorno<Usuario>();

            String senha_encriptada = Criptografia.doEncryptAES(value.Senha);
            Usuario objeto = new Usuario
            {
                nome = value.Nome,
                email = value.Email,
                usuario = value.Usuario,
                senha = senha_encriptada,
                tipo_usuario = value.Tipo_Usuario == 1 ? "Administrador" : "Professor"                
            };            

            try
            {
                using (ISession session = MySQLSessionFactory.StartSession())
                using (var repoUsuario = new Repository<Usuario>())
                {
                    repoUsuario.Insert(objeto);

                    retorno.ok = true;
                }
            }
            catch(Exception e)
            {
                retorno.ok = false;
                retorno.exception = !String.IsNullOrEmpty(e.Message) ? e.Message : e.InnerException.Message;
            }

            return retorno;
        }

        [HttpPost]
        [Route("api/Usuarioapi/Excluir")]
        public async Task<ApiRetorno<Usuario>> Excluir(Excluir_UsuarioModels value)
        {
            ApiRetorno<Usuario> retorno = new ApiRetorno<Usuario>();

            String _ids = $"({String.Join(",", value.ids)})";
            try
            {
                MySqlDatabase = new MySqlDatabase();
                var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                sql.CommandText = $"DELETE FROM CADASTRO WHERE ID IN {_ids}";

                int rows = sql.ExecuteNonQuery();
              
                retorno.ok = true;
            }
            catch (Exception e)
            {
                retorno.ok = false;
                retorno.exception = !String.IsNullOrEmpty(e.Message) ? e.Message : e.InnerException.Message;
            }

            return retorno;
        }
    }
}