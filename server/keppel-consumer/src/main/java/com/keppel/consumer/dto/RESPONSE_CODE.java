/**
 * 
 */
package com.keppel.consumer.dto;

/**
 * @author rahul
 *
 */
public enum RESPONSE_CODE {

	 FAIL("100"), INVALID_FEILD_VALUE("101"), OTHERDEVICE_LOGIN_FAILURE("102"),
	 ACCOUNT_LOCK_MESSAGE("103"),USER_NOT_FOUND_MESSAGE("104"),WRONG_USER_NAME_OR_PASSWORD_MESSAGE("105"),
	 ALREADY_EXIT("107"), NOT_ALLOWED_ON_DIFFERENT_DEVICE("106"),
	 SUCCESS("200");
	private String code;

	public String getCode() {
		return code;
	}

	private RESPONSE_CODE(String code) {
		this.code = code;
	}
}
