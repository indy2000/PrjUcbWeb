using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrjUcbWeb
{
    public class CONSTANTES
    {
        public static String URLPortal
        {
            get
            {
                return GetBaseUrl();
            }
        }
        
        public static String URLApi
        {
            get
            {
                return "localhost/PrjUcbWeb";
            }
        }
        public static string GetBaseUrl()
        {
            try
            {
                var request = HttpContext.Current.Request;
                var appUrl = HttpRuntime.AppDomainAppVirtualPath;

                var baseUrl = string.Format(@"{0}://{1}{2}", request.Url.Scheme, request.Url.Authority, appUrl);

                return baseUrl;
            }
            catch
            {
                return "";
            }
        }
    }
}