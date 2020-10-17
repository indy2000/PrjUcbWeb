using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Models
{
    public class TurmaModels
    {
        public Int64 Id { get; set; }
        public String Cod_turma { get; set; }
        public String Disciplina { get; set; }
        public String Horario { get; set; }
        public Int64 Quant_Alunos { get; set; }
        public String Professor { get; set; }
    }

    public class Cadastro_TurmaModels
    {
        public String Cod_turma { get; set; }
        public String Disciplina { get; set; }
        public String Hora_Inicio { get; set; }
        public String Hora_Final { get; set; }
        public Int64 Quant_Alunos { get; set; }
        public Int64 Id_Professor { get; set; }
    }

    public class Alteracao_TurmaModels
    {
        public Int64 Id { get; set; }
        public String Cod_turma { get; set; }
        public String Disciplina { get; set; }
        public String Hora_Inicio { get; set; }
        public String Hora_Final { get; set; }
        public Int64 Quant_Alunos { get; set; }
        public Int64 Id_Professor { get; set; }
    }

    public class Excluir_TurmaModels
    {
        public List<Int64> Ids { get; set; }
    }
}