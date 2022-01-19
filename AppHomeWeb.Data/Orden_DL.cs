using AppHomeWeb.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace AppHomeWeb.Data
{
    public class Orden_DL
    {
        public List<Orden_BE> ListarOrdenCliente(Orden_BE Ent)
        {
            List<Orden_BE> ListaOrdenCliente = new List<Orden_BE>();
            Conexion_DL oConectar = new Conexion_DL();

            using (SqlConnection con = new SqlConnection(oConectar.CadenaConexion()))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("usp_listar_orden_cliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id_usuario_perfil", Ent.id_usuario_perfil);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Orden_BE objOrden_BE = new Orden_BE();
                            objOrden_BE.numero_orden = Convert.ToString(reader["orden"]);
                            objOrden_BE.id_orden_Cliente = Convert.ToString(reader["id_orden_Cliente"]);
                            objOrden_BE.fecha_registro = Convert.ToString(reader["fecha_registro_orden"]);
                            objOrden_BE.monto_envio = Convert.ToString(reader["monto_envio"]);
                            objOrden_BE.monto_recibido = Convert.ToString(reader["monto_recibido"]);
                            objOrden_BE.tipo_cambio = Convert.ToString(reader["tipo_cambio"]);
                            objOrden_BE.estado_orden = Convert.ToString(reader["descripcion"]);
                            ListaOrdenCliente.Add(objOrden_BE);
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
            return ListaOrdenCliente;
        }
    }
}
