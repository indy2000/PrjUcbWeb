using FluentNHibernate.Mapping;
using PrjUcbWeb.Entities;
using PrjUcbWeb.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Mapping
{
    public class UsuarioMap :ClassMap<Usuario>
    {
        public UsuarioMap()
        {
            Table("CADASTRO");

            Id(u => u.id, "id").GeneratedBy.Identity();

            Map(x => x.nome, "nome").Length(45);

            Map(x => x.usuario, "usuario").Length(15);

            Map(x => x.senha, "senha").Length(45);

            Map(x => x.email, "email").Length(45);

            Map(x => x.tipo_usuario, "tipo_usuario").Length(13);
        }
    }
}