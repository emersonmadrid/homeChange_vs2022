using AppHomeWeb.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace AppHomeWeb.Data
{
    public class Cliente_DL
    {
        public int RegistrarCliente(Cliente_BE Ent)
        {

            Conexion_DL oConectar = new Conexion_DL();
            Cliente_BE objCliente_BE = new Cliente_BE();
            int id_codigo_perfil = 0;
            using (SqlConnection con = new SqlConnection(oConectar.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_registrar_cliente_usuario_perfil", con);
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("@id_ocupacion", Ent.id_ocupacion);
                    cmd.Parameters.AddWithValue("@id_tipo_documento", Ent.id_tipo_documento);
                    cmd.Parameters.AddWithValue("@id_tipo_cliente", Ent.id_tipo_cliente);
                    cmd.Parameters.AddWithValue("@nombre", Ent.nombre);
                    cmd.Parameters.AddWithValue("@apellido_paterno", Ent.apellido_paterno);
                    cmd.Parameters.AddWithValue("@apellido_materno", Ent.apellido_materno);
                    cmd.Parameters.AddWithValue("@email", Ent.email);
                    cmd.Parameters.AddWithValue("@telefono", Ent.telefono);
                    cmd.Parameters.AddWithValue("@numero_documento", Ent.numero_documento);
                    cmd.Parameters.AddWithValue("@usuario_registro", Ent.usuario_registro);
                    cmd.Parameters.AddWithValue("@usuario", Ent.usuario);
                    cmd.Parameters.AddWithValue("@clave", Ent.clave);
                    cmd.Parameters.AddWithValue("@razon_social", Ent.razon_social);
                    cmd.Parameters.AddWithValue("@ruc", Ent.ruc);

                    cmd.Parameters.Add("@codigo_perfil", SqlDbType.Int).Direction = ParameterDirection.Output;

                    // set parameter values


                    // open connection and execute stored procedure
                    con.Open();
                    cmd.ExecuteNonQuery();

                    // read output value from @NewId
                    id_codigo_perfil = Convert.ToInt32(cmd.Parameters["@codigo_perfil"].Value);
                    con.Close();

                }
                catch (Exception)
                {

                    id_codigo_perfil = 0;
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                    }

                }
            }
            return id_codigo_perfil;
        }
        public int ActualizarCliente(Cliente_BE Ent)
        {

            Conexion_DL oConectar = new Conexion_DL();
            Cliente_BE objCliente_BE = new Cliente_BE();
            int id_cliente = 0;
            using (SqlConnection con = new SqlConnection(oConectar.CadenaConexion()))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_actualizar_cliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("@id_cliente", Ent.id_cliente);
                    cmd.Parameters.AddWithValue("@telefono", Ent.telefono);
                    cmd.Parameters.AddWithValue("@email", Ent.email);
                    cmd.Parameters.AddWithValue("@usuario_modificacion", Ent.usuario_modificacion);




                    // set parameter values


                    // open connection and execute stored procedure
                    con.Open();
                    id_cliente = cmd.ExecuteNonQuery();

                    // read output value from @NewId

                    con.Close();

                }
                catch (Exception)
                {

                    id_cliente = 0;
                }
                finally
                {
                    if (con.State == ConnectionState.Open)
                    {
                        con.Close();
                    }

                }
            }
            return id_cliente;
        }



        public List<Cliente_BE> ListarDatoCliente(Cliente_BE Ent)
        {
            List<Cliente_BE> ListaDatoCliente = new List<Cliente_BE>();
            Conexion_DL oConectar = new Conexion_DL();

            using (SqlConnection con = new SqlConnection(oConectar.CadenaConexion()))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("usp_listar_cliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id_usuario", Ent.usuario);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Cliente_BE objDatoCliente_BE = new Cliente_BE();
                            objDatoCliente_BE.nombre = Convert.ToString(reader["nombre"]);
                            objDatoCliente_BE.apellido_paterno = Convert.ToString(reader["apellido_paterno"]);
                            objDatoCliente_BE.apellido_materno = Convert.ToString(reader["apellido_materno"]);
                            objDatoCliente_BE.email = Convert.ToString(reader["email"]);
                            objDatoCliente_BE.telefono = Convert.ToString(reader["telefono"]);
                            objDatoCliente_BE.numero_documento = Convert.ToString(reader["numero_documento"]);
                            objDatoCliente_BE.id_tipo_documento = Convert.ToInt32(reader["id_tipo_documento"]);
                            objDatoCliente_BE.id_ocupacion = Convert.ToString(reader["id_ocupacion"]);

                            ListaDatoCliente.Add(objDatoCliente_BE);
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
            return ListaDatoCliente;
        }
    }
}
