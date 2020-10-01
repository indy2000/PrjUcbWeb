using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Models
{
    public class UsuarioModels
    {

        public Int64 id { get; set; }
        public String nome { get; set; }
        public String usuario { get; set; }
        public String email { get; set; }
        public String senha { get; set; }
        public Int64 tipo_usuario { get; set; }
    }
}