using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PrjUcbWeb.Enums
{
    public enum Tipo_Usuario
    {
        [Display(Name = "ADMINISTRADOR", ResourceType = typeof(Resources.RsBase))]
        Administrador = 1,
        [Display(Name = "PROFESSOR", ResourceType = typeof(Resources.RsBase))]
        Professor = 2
    }
}