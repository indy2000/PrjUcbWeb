using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;

namespace PrjUcbWeb
{
    public class CONSTANTES
    {
        public static string Versao
        {
            get 
            {
                return ConfigurationManager.AppSettings["BuildVersion"];
            }
        }

        public static String StyleVersion
        {
            get
            {
                return "<link href=\"{0}?v=" + "v1.0" + "\" rel=\"stylesheet\"/>";
            }
        }

        public static string ScriptVersion
        {
            get
            {
                return "<script src=\"{0}?v=" + CONSTANTES.Versao + "\"></script>";
            }
        }

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
                return ConfigurationManager.AppSettings["CaminhoServidor"];
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

        public static string CaminhoFisico
        {
            get
            {
                string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                UriBuilder uri = new UriBuilder(codeBase);
                string path = Uri.UnescapeDataString(uri.Path);
                return Path.GetDirectoryName(path).Replace(@"\bin", "").Replace(@"\Debug", "").Replace(@"\Release", "");
            }
        }
    }
}