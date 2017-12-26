using System;
using System.Data.SqlClient;
using System.Data;

namespace DataAccessLayer
{
    class Data
    {
        public private String connectString = "";

        public Data() {
            // 
        }

        public Data(String connectString) {
            this.connectString = connectString;
        }

        public void setConnectString(String connectString) {
            this.connectString = connectString;
        }

        public SqlConnection getConnection()
        {
            return new SqlConnection(connectString);
        }

        public DataTable getTable(String query)
        {
            DataTable dataTable = new DataTable();
            new SqlDataAdapter(query, getConnection()).Fill(dataTable);
            return dataTable;
        }

        public void runQuery(String query)
        {
            // Opem connection
            SqlConnection conn = getConnection();
            conn.Open();

            // Create and run command
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.ExecuteNonQuery();

            conn.Dispose();
            conn.Close();
        }
    }
}
