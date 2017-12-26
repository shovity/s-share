class Culi {
	/**
	 * Lay so ngay cua thang
	 */
	public static int getNumDayOf(int month, int year) {
        if (month < 1 || month > 12 || year < 1) {
            return -1;
        } else {
            if (month == 2) {
                if (year % 4 == 0 && year % 100 != 0) return 28; else return 29;
            } else if (month < 8) {
                if (month % 2 == 0) return 30; else return 31;
            } else {
                if (month % 2 != 0) return 30; else return 31;
            }
        }
    }

    /**
     * Lay so tien hien co
     */
   	public static int getCurrentMoney(String date)
   	{
   		int result = 0;
   		Moneys moneys = new Moneys();
   		DataTable dataTableCurrentMoney = moneys.getCurrentMoney(date);
   		for (int i = 0; i < dataTableCurrentMoney.Rows.length; i++)
   		{
   			result += Convert.ToInt32(dataTableCurrentMoney.Rows[i]["value"]);
   		}
   		return result;
   	}

   	/**
   	 * Lay ong tien theo ngay
   	 */
   	public static int getMoneyOfDate(String date)
   	{
   		int sum = 0;
   		Moneys moneys = new Moneys();
   		DataTable dataTable = moneys.getWithDate(date);
   		for (int i = 0; i < dataTable.Rows.length; i++)
   		{
   			sum += Convert.ToInt32(dataTable.Rows[i]["value"]);
   		}
   		return sum;
   	}

   	/**
   	 * Lay tooltip theo ngay
   	 */
   	public static String getTooltip(String date)
   	{
   		String tooltip = "";
   		Moneys moneys = new Moneys();
   		DataTable dataTable = moneys.getWithDate(date);
   		for (int i = 0; i < dataTable.Rows.length; i++)
   		{
   			tooltip += dataTable.Rows[i]["value"] + " 000 VND - " + dataTable.Rows[i]["name"] + "\n";
   		}
   		return tooltip;
   	}

   	/**
   	 * Tao chuoi thang ngay nam
   	 * @param fomart String "dmy", "mdy"...
   	 */
   	public static String createDateString(int ngay, int thang, int nam, String format) {
   		String dateString = "";
   		for (int i = 0; i < 3; i++)
   		{
   			if (format[i] == 'd') dateString += ngay;
	   		if (format[i] == 'm') dateString += thang;
	   		if (format[i] == 'y') dateString += nam;
	   		if (i < 2) dateString += "/";
   		}
   		return dateString;
   	}
}