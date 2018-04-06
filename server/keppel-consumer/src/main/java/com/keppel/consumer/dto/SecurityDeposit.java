package com.keppel.consumer.dto;

public class SecurityDeposit {
	String premiseType;
	String idType;
	String payMethod;

	public String getPremiseType() {
		return premiseType;
	}

	public void setPremiseType(String premiseType) {
		this.premiseType = premiseType;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}

	public class SecurityDepositResponse {
		boolean success;
		String sd_amount;

		public boolean getSuccess() {
			return success;
		}

		public void setSuccess(boolean success) {
			this.success = success;
		}

		public String getSd_amount() {
			return sd_amount;
		}

		public void setSd_amount(String sd_amount) {
			this.sd_amount = sd_amount;
		}

	}

}
