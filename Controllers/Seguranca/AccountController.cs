using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Web.Mvc;

namespace PrjUcbWeb.Controllers.Seguranca
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LogOff()
		{
			AuthenticationManager.SignOut();
			Session.Abandon();

			IAuthenticationManager authenticationManager = HttpContext.GetOwinContext().Authentication;
			authenticationManager.SignOut();// DefaultAuthenticationTypes.ExternalCookie);

			//IUserConnectionControl usercc = UserConnectionFactory.GetConnectionControl(UserConnectionControlConfig.tipoConnection);
			//usercc.SetAcessoUsuario(null);
			//usercc.SetMenu(null);

			HttpContext.Session.Clear();

			return RedirectToAction("Index", "Login");
		}

		private IAuthenticationManager AuthenticationManager
		{
			get
			{
				return HttpContext.GetOwinContext().Authentication;
			}
		}
	}
}