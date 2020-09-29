using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PrjUcbWeb.Utils
{
    public class HtmlExtensions
    {
        public static MvcHtmlString GetStringToast(MvcHtmlString sumary)
        {
            String _inicio = "<div class=\"validation-summary-errors\" data-valmsg-summary=\"true\"><ul><li>";
            String _fim = "</li></ul></div>";
            String _meio = "</li><li>";

            var tmp = HttpUtility.HtmlDecode(sumary.ToHtmlString()
                                 .Replace(System.Environment.NewLine, ""))
                                 .Replace("'", "\"")
                                 .Replace(_inicio, String.Empty)
                                 .Replace(_fim, String.Empty);

            var lista = tmp.Split(new string[] { _meio }, StringSplitOptions.None).Select(p => String.Format("'{0}'", p));

            return MvcHtmlString.Create(String.Format("[{0}]", String.Join(",", lista)));
        }
    }
}