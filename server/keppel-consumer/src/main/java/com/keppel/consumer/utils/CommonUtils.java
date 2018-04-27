package com.keppel.consumer.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtils {

	public static String round(double val) {
		try {
			double roundOff = Math.round(val * 100.0) / 100.0;
			return String.valueOf(roundOff);
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
		return "0.00";
	}

	public static String changeDateFormat(String inputDate, SimpleDateFormat originalFormat,
			SimpleDateFormat targetDataFormat) {
		Date date;
		try {
			date = originalFormat.parse(inputDate);
			return targetDataFormat.format(date);
		} catch (ParseException ex) {
			ex.printStackTrace();
			return null;
		}
	}

}
