using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using PrjUcbWeb.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Helpers;

[assembly: OwinStartupAttribute("PrjUcbWebConfig", typeof(PrjUcbWeb.Startup))]
namespace PrjUcbWeb
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString(String.Format("/{0}/Login/Index", CultureHelper.GetDefaultCulture())),
                CookieSecure = CookieSecureOption.SameAsRequest
            });

            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.NameIdentifier;

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: “”,
            //    clientSecret: “”);

            //app.UseTwitterAuthentication(
            //   consumerKey: “”,
            //   consumerSecret: “”);

            //app.UseFacebookAuthentication(
            //   appId: “”,
            //   appSecret: “”);


            //var options = new GoogleOAuth2AuthenticationOptions();
            //options.ClientId = "115198953352747452117";
            //options.ClientSecret = "679ce970bfba856effeb8189f9c881b1db855c50";
            //options.CallbackPath = new PathString("/oauth-redirect/google");

            //options.Scope.Add("https://www.googleapis.com/auth/books");
            //app.UseGoogleAuthentication(options);


            /*
            app.UseGoogleAuthentication(
                clientId: "115198953352747452117",
                clientSecret: "679ce970bfba856effeb8189f9c881b1db855c50");
            */
        }
    }
}