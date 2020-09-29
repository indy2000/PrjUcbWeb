using System;

namespace PrjUcbWeb.Controllers.Seguranca
{
    public interface IUserConnectionControl
    {
        Object GetAcessoUsuario();

        void SetAcessoUsuario(Object objeto);

        Object GetMenu();

        void SetMenu(Object objeto);
    }
}