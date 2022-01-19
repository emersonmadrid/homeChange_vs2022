using AppHomeWeb.Data;
using AppHomeWeb.Entity;
using System.Collections.Generic;

namespace AppHomeWeb.Business
{
    public class Banco_BL
    {
        public List<Banco_BE> ListarBanco()
        {
            Banco_DL objBanco_DL = new Banco_DL();
            return objBanco_DL.ListarBanco();
        }
    }
}
