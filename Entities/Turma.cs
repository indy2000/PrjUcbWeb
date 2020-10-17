using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Entities
{
    public class Turma
    {
        public virtual Int64 Id { get; set; }
        public virtual String Cod_turma { get; set; }
        public virtual String Disciplina { get; set; }
        public virtual DateTime Hora_Inicio { get; set; }
        public virtual DateTime Hora_Final { get; set; }
        public virtual Int64 Quant_Alunos {get; set;}
        public virtual Usuario Professor { get; set; }

    }
}