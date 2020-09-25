using log4net;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;

namespace Aniel.Financeiro
{
    public static class CONSTANTES
    {


        public static ILog log4Net = LogManager.GetLogger("Aniel.Financeiro");

        public static ILog log4NetFaturar = LogManager.GetLogger("LogErroFaturar");

        public static ILog log4NetCobranca = LogManager.GetLogger("LogErroCobranca");

        public static String log4NetStr = "FaturamentoService";

        public static String SIGLA_MODULO = ConfigurationManager.AppSettings["SIGLA_MODULO"].ToString();

        public static String URLPortal
        {
            get
            {
                return GetBaseUrl();
            }
        }

        public static String URLConnect = Convert.ToString(ConfigurationManager.AppSettings["URLConnect"]);

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

        private static String nomeEmpresaConfig;
        public static String GetEmpresaConfig()
        {
            try 
            { 
                if (String.IsNullOrEmpty(nomeEmpresaConfig))
                    nomeEmpresaConfig = $@"{CaminhoFisico}\Empresa.config";

                if (!File.Exists(nomeEmpresaConfig))
                {
                    String xml = @"<?xml version='1.0' encoding='utf-8'?><configuration><appSettings></appSettings></configuration>";
                    File.WriteAllText(nomeEmpresaConfig, xml);
                }
            }
            catch (Exception ex)
            {
                log4Net.Error(ex);
            }
            return nomeEmpresaConfig;
        }


        public static String CaminhoFisicoArquivos = ConfigurationManager.AppSettings["CaminhoFisicoArquivos"];

        public static Int32 PaginacaoRegistros = Int32.Parse(ConfigurationManager.AppSettings["PaginacaoRegistros"].ToString());

        //public static List<SistemaWebHabilitado> Sistemas = JsonService.DeserializeJasonMapper<List<SistemaWebHabilitado>>(ConfigurationManager.AppSettings["Sistemas"].ToString());

        public static String CaminhoUpLoad = CaminhoFisico + "\\UpLoad";

        public static String URLHUBDESENVOLVEDOR_BASE = "https://ws.hubdodesenvolvedor.com.br";

        public static String URLHUBDESENVOLVEDOR_CNPJ = "http://ws.hubdodesenvolvedor.com.br/v2/cnpj/?token=26937230TpcxDSwjKu48634352&cnpj={0}";

        public static String URLHUBDESENVOLVEDOR_CPF = "https://ws.hubdodesenvolvedor.com.br/v2/cpf/?token=26937230TpcxDSwjKu48634352&cpf={0}&data={1}";
      
        private static String _logoCliente64;
        public static String LogoCliente64
        {
            get
            {
                if (String.IsNullOrEmpty(_logoCliente64))
                {
                    try
                    {
                        //using (var image = Image.FromFile(Path.Combine(CaminhoFisico, @"Arquivos\LogoCliente.jpg")))
                          //  _logoCliente64 = ImageService.ConvertTo64(image);
                    }
                    catch
                    {
                        _logoCliente64 = String.Empty;
                    }
                }
                return _logoCliente64;
            }
        }
    

        public static string GetBaseUrl()
        {
            try
            {
               // var request = HttpContext.Current.Request;
                //var appUrl = HttpRuntime.AppDomainAppVirtualPath;

                //var baseUrl = string.Format(@"{0}://{1}{2}", request.Url.Scheme, request.Url.Authority, appUrl);

                return baseUrl;
            }
            catch
            {
                return "";
            }
        }
    }
}