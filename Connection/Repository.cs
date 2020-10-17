using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using NHibernate;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace PrjUcbWeb.Connection
{
    public class Repository<T> :IDisposable, IConnectionDAO<T> where T: class
    {
        private ISession _session;

        //public Repository(ISession session)
        //{
        //    _session = session;
        //}

        public ISession GetSession()
        {
            return _session;
        }

        public void Delete(T entidade)
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Delete(entidade);
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro ao excluir entidade: " + ex.Message);
                    }
                }
            }
        }

        public async Task Delete(IList<T> entidades)
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        foreach(T e in entidades)
                        {
                            await session.DeleteAsync(e);
                        }
                        await session.FlushAsync();
                        
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro ao excluir entidade: " + ex.Message);
                    }
                }
            }
        }


        public void Insert(T entidade)
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Save(entidade);
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro ao inserir entidade: " + ex.Message);
                    }
                }
            }

        }

        public IList<T> Query()
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                return (from e in session.Query<T>() select e).ToList();
            }
        }

        public async Task<IList<T>> select()
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        var resultado = await session.QueryOver<T>().ListAsync();
                        transaction.Commit();
                        return resultado;
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro no Select: " + ex.Message);
                    }
                }
            }
            
        }

        public async Task<IList<T>> select(Expression<Func<T, bool>> expression)
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        var resultado = await session.QueryOver<T>().Where(expression).ListAsync();
                        transaction.Commit();
                        return resultado;
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro no Select: " + ex.Message);
                    }
                }
            }
            
        }

        public async Task<T> selectFirst()
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        IList<T> lista = await session.QueryOver<T>().ListAsync();
                        transaction.Commit();
                        return lista.FirstOrDefault();
                    }
                    catch(Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro no SelectFirst: " + ex.Message);
                    }
                }
            }                   
        }

        public async Task<T> selectFirst(Expression<Func<T, bool>> expression)
        {
            //IList<T> lista = ;
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        var resultado = (await session.QueryOver<T>().Where(expression).Take(1).ListAsync()).FirstOrDefault();                       
                        transaction.Commit();

                        return resultado;
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro no SelectFirst: " + ex.Message);
                    }
                }
            }

            
        }

        public T ReturnById(int id)
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                return session.Get<T>(id);
            }
        }

        public void Update(T entidade)
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Update(entidade);
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro ao atualizar  entidade: " + ex.Message);
                    }
                }
            }
        }

        public async Task SaveOrUpdate(T entidade)
        {
            using (ISession session = MySQLSessionFactory.StartSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        await session.SaveOrUpdateAsync(entidade);
                    }
                    catch (Exception ex)
                    {
                        if (!transaction.WasCommitted)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception("Erro ao atualizar  entidade: " + ex.Message);
                    }
                }
            }
        }

        private Boolean disposedValue;// To detect redundant calls

        // IDisposable
        protected virtual void Dispose(Boolean disposing)
        {
            if (!this.disposedValue)
            {
                if (disposing)
                {

                }

                // TODO: free unmanaged resources (unmanaged objects) and override Finalize() below.
                // TODO: set large fields to null.
            }
            this.disposedValue = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}