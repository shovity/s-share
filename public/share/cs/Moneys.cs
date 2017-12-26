using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataAccessLayer;
using System.Data;

namespace BussinesLogicLayer
{
    class Moneys
    {
        private Data data = new Data();

        public DataTable getAll()
        {
            return data.getTable("select * from moneys");
        }

        public void insert(String name, String val, String per = 0, String dat)
        {
            data.runQuery("insert into moneys('name', 'value', 'per', 'dat') values('"+name+"', "+val+", "+per+", '"+dat+"')");
        }

        public void delete(String id)
        {
            data.runQuery("delete from moneys where id = '"+ id +"'");
        }

        public void update(String id, String name, String val, String per, String dat)
        {
            data.runQuery("update moneys set name='"+name+"', value="+val+", per='"+per+"', dat='"+dat+"' where id = '"+id+"'");
        }

        public DataTable getWithDate(String startDate, String endDate)
        {
            return data.getTable("select * from moneys where dat < '"+startDate+"' and dat > '"+endDate+"'");
        }

        public DataTable getWithDate(String date)
        {
            return data.getTable("select * from moneys where dat = '"+ date +"'");
        }

        public DataTable getWithPer(String per)
        {
            return data.getTable("select * from moneys where per = "+per+"")
        }

        public DataTable getCurrentMoney(String date)
        {
            return data.getTable("select * from moneys where dat <= '"+date+"'");
        }
    }
}
