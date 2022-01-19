using AppHomeWeb.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace AppHomeWeb.Data
{
    public class Banco_DL
    {
        public List<Banco_BE> ListarBanco()
        {
            List<Banco_BE> ListaBanco = new List<Banco_BE>();
            Conexion_DL oConectar = new Conexion_DL();

            using (SqlConnection con = new SqlConnection(oConectar.CadenaConexion()))
            {
                try
                {
             
                    //esoooo yy
                    SqlCommand cmd = new SqlCommand("usp_listar_banco", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Banco_BE objBanco_BE = new Banco_BE();
                            objBanco_BE.id_banco = Convert.ToString(reader["id_banco"]);
                            objBanco_BE.descripcion = Convert.ToString(reader["descripcion"]);

                            ListaBanco.Add(objBanco_BE);
                        }
                    }
                    else
                    {
                        Console.WriteLine("No rows found.");
                    }

                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                    }

                }


            }
            return ListaBanco;
        }

    }
}
