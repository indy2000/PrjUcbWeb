using FluentNHibernate.Mapping;
using PrjUcbWeb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Mapping
{
    public class TurmaMap: ClassMap<Turma>
    {
        public TurmaMap()
        {
            Table("TURMA");

            Id(u => u.Id, "id").GeneratedBy.Identity();

            Map(x => x.Cod_turma, "cod_turma").Length(11);

            Map(x => x.Disciplina, "disciplina").Length(50);

            Map(x => x.Hora_Inicio, "hora_inicio");

            Map(x => x.Hora_Final, "hora_final");

            Map(x => x.Quant_Alunos, "quant_alunos");

            References(x => x.Professor, "id_professor").ForeignKey("fk_professor_turma");
        }

    }
}