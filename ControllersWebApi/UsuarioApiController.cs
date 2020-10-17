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
using System.Text;
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
                tipo_usuario = value.Tipo_Usuario == 1 ? "administrador" : "professor"                
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

        [HttpPost()]
        [Route("api/Usuarioapi/GetComboProfessor")]
        public async Task<ObjCombo<Int64>> GetComboProfessor(RequestObjCombo<Int64?> request)
        {
            ObjCombo<Int64> retorno = new ObjCombo<Int64>
            {
                results = new List<IObjComboResult<Int64>>()
            };
            try
            {
                //Filtros 
                Dictionary<String, Object> parametros = new Dictionary<string, object>();

                StringBuilder sqlFrom = new StringBuilder(" FROM CADASTRO A ");

                List<String> condicoes = new List<String>();

                if (request.soativos)
                {
                    //condicoes.Add($"A.STATUS = 1");
                }

                if (request.id.HasValue)
                {
                    condicoes.Add($"A.ID = {request.id}");
                }

                condicoes.Add($"A.TIPO_USUARIO LIKE '%professor%'");

                if (request != null && !String.IsNullOrEmpty(request.q))
                {
                    condicoes.Add($"(UPPER(A.NOME) LIKE '%{request.q.ToUpperInvariant()}%')");
                }

                if (condicoes.Count() > 0)
                {
                    sqlFrom.AppendLine($" WHERE A.NOME != '' AND ( {String.Join(" AND ", condicoes) } ) ");
                }

                MySqlDatabase = new MySqlDatabase();
                var sqlConn = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                
                    StringBuilder sql = new StringBuilder("SELECT COUNT(A.ID) AS CO ");
                    sql.AppendLine(sqlFrom.ToString());

                    sqlConn.CommandText = sql.ToString();

                    using (var reader = await sqlConn.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {

                            retorno.total_count = Convert.ToInt32(reader["CO"]);
                        }
                    }


                //Select
                sqlConn = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                
                sql = new StringBuilder("SELECT A.ID, A.NOME ");
                sql.AppendLine(sqlFrom.ToString());
                sql.AppendLine(" ORDER BY UPPER(A.NOME) ");

                sqlConn.CommandText = sql.ToString();

                using (var reader = await sqlConn.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {

                        if (!String.IsNullOrEmpty(Convert.ToString(reader["NOME"])))
                        {
                            retorno.results.Add(new ObjComboResult<Int64>
                            {
                                Id = Convert.ToInt64(reader["ID"]),
                                Text = Convert.ToString(reader["NOME"]),
                            });

                        }
                    }
                }
                

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            

            return retorno;
        }

        [HttpGet]
        [Route("api/Usuarioapi/GetById")]
        public async Task<ApiRetorno<Alteracao_UsuarioModels>> GetById(Int64 id)
        {
            ApiRetorno<Alteracao_UsuarioModels> retorno = new ApiRetorno<Alteracao_UsuarioModels>();

            Alteracao_UsuarioModels objeto = new Alteracao_UsuarioModels();

            using (ISession session = MySQLSessionFactory.StartSession())
            using (var repoUsuario = new Repository<Usuario>())
            {
                Usuario usuario = await repoUsuario.selectFirst(p => p.id == id);

                objeto = new Alteracao_UsuarioModels
                {
                    Id = usuario.id,
                    Nome = usuario.nome,
                    Usuario = usuario.usuario,
                    Email = usuario.email,
                    Senha = Criptografia.doDecryptAES(usuario.senha),
                    Tipo_Usuario = usuario.tipo_usuario == "administrador" ? 1 : 2
                };

                retorno.objeto = objeto;
                retorno.ok = true;
            }

            return retorno;
        }

        [HttpPost]
        [Route("api/Usuarioapi/Alterar")]
        public async Task<ApiRetorno<Usuario>> Alterar(Alteracao_UsuarioModels value)
        {
            ApiRetorno<Usuario> retorno = new ApiRetorno<Usuario>();          

            try
            {               
                retorno.ok = true;

                string tipo_usuario = value.Tipo_Usuario == 1 ? "administrador" : "professor";
                MySqlDatabase = new MySqlDatabase();
                var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                sql.CommandText = $"UPDATE CADASTRO A SET A.NOME = '{value.Nome}', A.EMAIL = '{value.Email}', A.USUARIO = '{value.Usuario}', A.SENHA = '{value.Senha}', A.TIPO_USUARIO = '{tipo_usuario}' WHERE ID = {value.Id}";

                int rows = sql.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                retorno.ok = false;
                retorno.exception = !String.IsNullOrEmpty(ex.Message) ? ex.Message : ex.InnerException.Message;
            }


            return retorno;
        }
    }
}