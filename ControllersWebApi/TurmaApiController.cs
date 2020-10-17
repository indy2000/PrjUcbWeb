using MySql.Data.MySqlClient;
using NHibernate;
using PrjUcbWeb.Connection;
using PrjUcbWeb.Entities;
using PrjUcbWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace PrjUcbWeb.ControllersWebApi
{
    public class TurmaApiController : ApiController
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

        [HttpGet]
        [Route("api/Turmaapi/getAllTurmas")]
        public async Task<DataTableResponse<TurmaModels>> getTurmas()
        {
            IOrderedEnumerable<TurmaModels> listaOrdenada = null;
            Int32 recordsTotal = 0;
            List<TurmaModels> retorno = new List<TurmaModels>();

            MySqlDatabase = new MySqlDatabase();
            var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            sql.CommandText = @"SELECT A.ID, A.COD_TURMA, A.DISCIPLINA, A.HORA_INICIO, A.HORA_FINAL, A.QUANT_ALUNOS, B.NOME FROM TURMA A 
                              INNER JOIN CADASTRO B ON (B.ID = A.ID_PROFESSOR)";

            using (var reader = await sql.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    retorno.Add(new TurmaModels
                    {
                        Id = Convert.ToInt64(reader["ID"]),
                        Cod_turma = reader["COD_TURMA"].ToString(),
                        Disciplina = reader["DISCIPLINA"].ToString(),
                        Horario = Convert.ToDateTime(reader["HORA_INICIO"]).ToString("t")+" - "+Convert.ToDateTime(reader["HORA_FINAL"]).ToString("t"),
                        //Horario = Convert.ToDateTime(reader["HORA_INICIO"]).Hour.ToString()+":"+ Convert.ToDateTime(reader["HORA_INICIO"]).Minute.ToString()+" - "+ Convert.ToDateTime(reader["HORA_FINAL"]).Hour.ToString() + ":" + Convert.ToDateTime(reader["HORA_FINAL"]).Minute.ToString(),
                        Quant_Alunos = Convert.ToInt64(reader["QUANT_ALUNOS"]),
                        Professor = reader["NOME"].ToString()
                    });;
                    recordsTotal += 1;
                }
            }


           
            listaOrdenada = retorno.OrderBy(p => p.Disciplina);
                            
               



            //Page e retornando DataTable
            return new DataTableResponse<TurmaModels>
            {
                draw = 10,
                recordsFiltered = recordsTotal,
                data = listaOrdenada,
                error = ""
            };
            //return retorno;
        }

        [HttpPost]
        [Route("api/Turmaapi/Cadastrar")]
        public async Task<ApiRetorno<Turma>> Cadastrar(Cadastro_TurmaModels value)
        {
            ApiRetorno<Turma> retorno = new ApiRetorno<Turma>();

            DateTime Hora_Inicio = new DateTime().AddHours(Convert.ToDouble(value.Hora_Inicio.Substring(0, 2))).AddMinutes(Convert.ToDouble(value.Hora_Inicio.Substring(3, 2)));
            DateTime Hora_Final = new DateTime().AddHours(Convert.ToDouble(value.Hora_Final.Substring(0, 2))).AddMinutes(Convert.ToDouble(value.Hora_Final.Substring(3, 2)));

            try
            {
                using (ISession session = MySQLSessionFactory.StartSession())
                using (var repoUsuario = new Repository<Usuario>())
                using (var repoTurma = new Repository<Turma>())
                {
                    Usuario Professor = await repoUsuario.selectFirst(p => p.id == value.Id_Professor);

                    Turma objeto = new Turma
                    {
                        Cod_turma = value.Cod_turma,
                        Disciplina = value.Disciplina,
                        Hora_Inicio = Hora_Inicio,
                        Hora_Final = Hora_Final,
                        Quant_Alunos = value.Quant_Alunos,
                        Professor = Professor
                    };

                    repoTurma.Insert(objeto);
                    retorno.ok = true;
                }
            }
            catch(Exception ex)
            {
                retorno.ok = false;
                retorno.exception = !String.IsNullOrEmpty(ex.Message) ? ex.Message : ex.InnerException.Message;
            }
            

            return retorno;
        }

        [HttpGet]
        [Route("api/Turmaapi/GetById")]
        public async Task<ApiRetorno<Alteracao_TurmaModels>> GetById(Int64 id)
        {
            ApiRetorno<Alteracao_TurmaModels> retorno = new ApiRetorno<Alteracao_TurmaModels>();

            Alteracao_TurmaModels objeto = new Alteracao_TurmaModels();

            using (ISession session = MySQLSessionFactory.StartSession())
            using (var repoTurma = new Repository<Turma>())
            {
                Turma turma = await repoTurma.selectFirst(p => p.Id == id);

                objeto = new Alteracao_TurmaModels
                {
                    Id = turma.Id,
                    Cod_turma = turma.Cod_turma,
                    Disciplina = turma.Disciplina,
                    Hora_Inicio = turma.Hora_Inicio.ToString("t"),
                    Hora_Final = turma.Hora_Final.ToString("t"),
                    Quant_Alunos = turma.Quant_Alunos,
                    Id_Professor = turma.Professor.id
                };

                retorno.objeto = objeto;
                retorno.ok = true;
            }

            return retorno;
        }

        [HttpPost]
        [Route("api/Turmaapi/Excluir")]
        public async Task<ApiRetorno<Usuario>> Excluir(Excluir_TurmaModels value)
        {
            ApiRetorno<Usuario> retorno = new ApiRetorno<Usuario>();

            String _ids = $"({String.Join(",", value.Ids)})";
            try
            {
                MySqlDatabase = new MySqlDatabase();
                var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                sql.CommandText = $"DELETE FROM TURMA WHERE ID IN {_ids}";

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

        [HttpPost]
        [Route("api/Turmaapi/Alterar")]
        public async Task<ApiRetorno<Turma>> Alterar(Alteracao_TurmaModels value)
        {
            ApiRetorno<Turma> retorno = new ApiRetorno<Turma>();

            DateTime Hora_Inicio = new DateTime().AddHours(Convert.ToDouble(value.Hora_Inicio.Substring(0, 2))).AddMinutes(Convert.ToDouble(value.Hora_Inicio.Substring(3, 2)));
            DateTime Hora_Final = new DateTime().AddHours(Convert.ToDouble(value.Hora_Final.Substring(0, 2))).AddMinutes(Convert.ToDouble(value.Hora_Final.Substring(3, 2)));

            try
            {
                /*using (ISession session = MySQLSessionFactory.StartSession())
                using (var repoUsuario = new Repository<Usuario>())
                using (var repoTurma = new Repository<Turma>())
                {
                    Usuario Professor = await repoUsuario.selectFirst(p => p.id == value.Id_Professor);
                    Turma objeto = await repoTurma.selectFirst(p => p.Id == value.Id);

                    objeto.Cod_turma = value.Cod_turma;
                    objeto.Disciplina = value.Disciplina;
                    objeto.Hora_Inicio = Hora_Inicio;
                    objeto.Hora_Final = Hora_Final;
                    objeto.Quant_Alunos = value.Quant_Alunos;
                    objeto.Professor = Professor;


                    await repoTurma.SaveOrUpdate(objeto);
                    }*/
                retorno.ok = true;

                MySqlDatabase = new MySqlDatabase();
                var sql = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                sql.CommandText = $"UPDATE TURMA A SET A.COD_TURMA = '{value.Cod_turma}', A.DISCIPLINA = '{value.Disciplina}', A.HORA_INICIO = '{Hora_Inicio}', A.HORA_FINAL = '{Hora_Final}', A.QUANT_ALUNOS = {value.Quant_Alunos}, A.ID_PROFESSOR = {value.Id_Professor}  WHERE ID = {value.Id}";

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