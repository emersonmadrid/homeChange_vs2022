using AppHomeWeb.Data;
using AppHomeWeb.Entity;
using System.Collections.Generic;
namespace AppHomeWeb.Business
{
    public class Tipo_Cambio_BL
    {

        public List<Tipo_Cambio_BE> ListarTipo_Cambio()
        {
            Tipo_Cambio_DL objTipo_Cambio_DL = new Tipo_Cambio_DL();
            return objTipo_Cambio_DL.ListarTipo_Cambio();
        }
    }
}
