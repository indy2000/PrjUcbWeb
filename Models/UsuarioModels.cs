using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Models
{
    public class UsuarioModels
    {

        public String id { get; set; }
        public String nome { get; set; }
        public String usuario { get; set; }
        public String email { get; set; }
        public String senha { get; set; }
        public Int64 tipo_usuario { get; set; }
    }

    public class Cadastro_UsuarioModels
    {
        public String Nome { get; set; }
        public String Usuario { get; set; }
        public String Email { get; set; }
        public String Senha { get; set; }
        public Int64 Tipo_Usuario { get; set; }
    }

    public class Excluir_UsuarioModels
    {
        public List<Int64> ids { get; set; }
    }

    public class Alteracao_UsuarioModels
    {
        public Int64 Id { get; set; }
        public String Nome { get; set; }
        public String Usuario { get; set; }
        public String Email { get; set; }
        public String Senha { get; set; }
        public Int64 Tipo_Usuario { get; set; }
    }
}