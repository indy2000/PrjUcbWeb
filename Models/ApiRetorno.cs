using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Models
{
    public class ApiRetorno
    {
        public Boolean ok { get; set; }
        public String mensagem { get; set; }
        public String exception { get; set; }
    }

    public class ApiRetorno<T> : ApiRetorno
    {
        public T objeto { get; set; }
    }
}