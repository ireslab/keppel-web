package com.keppel.consumer.dto;

public class AccountDto extends ActivityAuditDto  {
	private String premiseId;
	private String icNumber;
	private String icNumberType;
	private String paymentMethod;
	private String premiseType;
	private String contractDuration;
	private String planType;
	private String optionalService1;
	private String optionalService2;
	private String optionalService3;
	private String firstName;
	private String lastName;
	private String dob;
	private String gender;
	private String eMail;
	private String userId;
	private String contactPhoneNumber;
	private String premiseAddress;
	private String premiseAddress2;
	private String billingAddress;
	private String billingAddress2;
	
	public String getAttachmentData() {
		return attachmentData;
	}
	public void setAttachmentData(String attachmentData) {
		this.attachmentData = attachmentData;
	}
	private String billingPostalcode;
	
	private String ebsOrMSSLAccountNumber;

	private String city;
	private String postcode;
	private String serviceStartDate;
	private String remarks;
	private String tenantOrOwner;
	private String attachmentData;
	private String attachmentName;
	
	
	public String getEbsOrMSSLAccountNumber() {
		return ebsOrMSSLAccountNumber;
	}
	public void setEbsOrMSSLAccountNumber(String ebsOrMSSLAccountNumber) {
		this.ebsOrMSSLAccountNumber = ebsOrMSSLAccountNumber;
	}
	public String getIcNumber() {
		return icNumber;
	}
	public void setIcNumber(String icNumber) {
		this.icNumber = icNumber;
	}
	public String getIcNumberType() {
		return icNumberType;
	}
	public void setIcNumberType(String icNumberType) {
		this.icNumberType = icNumberType;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public String getPremiseType() {
		return premiseType;
	}
	public void setPremiseType(String premiseType) {
		this.premiseType = premiseType;
	}
	public String getContractDuration() {
		return contractDuration;
	}
	public void setContractDuration(String contractDuration) {
		this.contractDuration = contractDuration;
	}
	public String getPlanType() {
		return planType;
	}
	public void setPlanType(String planType) {
		this.planType = planType;
	}
	public String getOptionalService1() {
		return optionalService1;
	}
	public void setOptionalService1(String optionalService1) {
		this.optionalService1 = optionalService1;
	}
	public String getOptionalService2() {
		return optionalService2;
	}
	public void setOptionalService2(String optionalService2) {
		this.optionalService2 = optionalService2;
	}
	public String getOptionalService3() {
		return optionalService3;
	}
	public void setOptionalService3(String optionalService3) {
		this.optionalService3 = optionalService3;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String geteMail() {
		return eMail;
	}
	public void seteMail(String eMail) {
		this.eMail = eMail;
	}
	public String getContactPhoneNumber() {
		return contactPhoneNumber;
	}
	public void setContactPhoneNumber(String contactPhoneNumber) {
		this.contactPhoneNumber = contactPhoneNumber;
	}
	public String getPremiseAddress() {
		return premiseAddress;
	}
	public void setPremiseAddress(String premiseAddress) {
		this.premiseAddress = premiseAddress;
	}
	public String getPremiseAddress2() {
		return premiseAddress2;
	}
	public void setPremiseAddress2(String premiseAddress2) {
		this.premiseAddress2 = premiseAddress2;
	}
	public String getBillingAddress() {
		return billingAddress;
	}
	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}
	public String getBillingAddress2() {
		return billingAddress2;
	}
	public void setBillingAddress2(String billingAddress2) {
		this.billingAddress2 = billingAddress2;
	}
	public String getBillingPostalcode() {
		return billingPostalcode;
	}
	public void setBillingPostalcode(String billingPostalcode) {
		this.billingPostalcode = billingPostalcode;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	public String getServiceStartDate() {
		return serviceStartDate;
	}
	public void setServiceStartDate(String serviceStartDate) {
		this.serviceStartDate = serviceStartDate;
	}
	public String getCurrentMeterType() {
		return currentMeterType;
	}
	public void setCurrentMeterType(String currentMeterType) {
		this.currentMeterType = currentMeterType;
	}
	public String getPromoCode() {
		return promoCode;
	}
	public void setPromoCode(String promoCode) {
		this.promoCode = promoCode;
	}
	public String getCustomerType() {
		return customerType;
	}
	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}
	public String getResidential() {
		return residential;
	}
	public void setResidential(String residential) {
		this.residential = residential;
	}
	public String getRecommendedPlans() {
		return recommendedPlans;
	}
	public void setRecommendedPlans(String recommendedPlans) {
		this.recommendedPlans = recommendedPlans;
	}
	public String getRenantorOwner() {
		return renantorOwner;
	}
	public void setRenantorOwner(String renantorOwner) {
		this.renantorOwner = renantorOwner;
	}
	private String currentMeterType;
	private String promoCode;
	private String customerType;

	private String residential;
	private String recommendedPlans;
	private String renantorOwner;



	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getTenantOrOwner() {
		return tenantOrOwner;
	}
	public void setTenantOrOwner(String tenantOrOwner) {
		this.tenantOrOwner = tenantOrOwner;
	}
	public String getPremiseId() {
		return premiseId;
	}
	public void setPremiseId(String premiseId) {
		this.premiseId = premiseId;
	}
	public String getAttachmentName() {
		return attachmentName;
	}
	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}


}