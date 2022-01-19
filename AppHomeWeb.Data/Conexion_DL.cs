using System.Configuration;

namespace AppHomeWeb.Data
{
    public class Conexion_DL
    {
        public string CadenaConexion()
        {
            string Cadena = "";

            Cadena = ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
            return Cadena;
        }

    }
}
