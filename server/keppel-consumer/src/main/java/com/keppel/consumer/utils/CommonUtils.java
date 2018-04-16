package com.keppel.consumer.utils;

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

}
