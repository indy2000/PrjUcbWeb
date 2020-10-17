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

    public class ObjCombo<T>
    {
        public virtual List<IObjComboResult<T>> results { get; set; }

        public virtual Int32 total_count { get; set; }

        public static implicit operator ObjCombo<T>(ObjCombo<long?> v)
        {
            throw new NotImplementedException();
        }
    }

    public interface IObjComboResult<T>
    {
        T Id { get; set; }
        String Text { get; set; }
    }

    public class RequestObjCombo<T> : RequestObjCombo
    {
        public virtual T id { get; set; }
    }

    public class RequestObjCombo
    {
        public virtual String q { get; set; }
        public virtual Int32 page { get; set; }
        public virtual Boolean soativos { get; set; }

        public virtual String id_usuario { get; set; }
        public virtual String cod_area { get; set; }
    }

    public class ObjComboResult<T> : IObjComboResult<T>
    {
        public virtual T Id { get; set; }
        public virtual String Text { get; set; }
    }

    public class DataTableResponse<T>
    {
        public int draw { get; set; }
        //public long? recordsTotal { get; set; }
        public int? recordsFiltered { get; set; }
        public IEnumerable<T> data { get; set; }
        public string error { get; set; }
    }
}