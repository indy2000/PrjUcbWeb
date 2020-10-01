using PrjUcbWeb.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Entities
{
    public class Usuario
    {
        public virtual Int64 id { get; set; }
        public virtual String nome { get; set; }
        public virtual String usuario { get; set; }
        public virtual String email { get; set; }
        public virtual String senha { get; set; }
        public virtual String tipo_usuario { get; set; }
    }
}