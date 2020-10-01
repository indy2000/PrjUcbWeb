using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrjUcbWeb.Connection
{
    interface IConnectionDAO<T>
    {
        void Insert(T entidade);
        void Delete(T entidade);
        void Update(T entidade);
        T ReturnById(int id);
        IList<T> Query();
    }
}
