package com.keppel.consumer.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="ACTIVITY_AUDIT")
public class ActivityAudit {
	
	@Id
	//@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ACTIVITY_AUDIT_SEQUENCE")
	//@SequenceGenerator(name = "ACTIVITY_AUDIT_SEQUENCE", sequenceName = "ACTIVITY_AUDIT_SEQ")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	
	@Column(name="EMAIL" , length=60)
	private String email;
	
	@Column(name="APPLICATION_ID" , length=60)
	private String applicationId;
	
	@Column(name="APP_VERSION" , length=60)
	private String appVersion;
	
	
	@Column(name="DEVICE_MODEL" , length=60)
	private String deviceModel;
	
	
	@Column(name="DEVICE_ID" , length=60)
	private String deviceId;
	
	@Column(name="IMEI" , length=60)
	private String imei;

	@Column(name="INTERNET_TYPE" , length=60)
	private String internetType;
	
	
	@Column(name="OPERATING_SYSTEM" , length=60)
	private String operatingSystem;
	
	
	@Column(name="ACTIVITY_TYPE" , length=60)
	private String activityType;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATION_DATE")
	private Date creationDate;
	
	@Column(name="LATITUDE" , length=60)
	private String latitude;
	
	@Column(name="LONGITUDE" , length=60)
	private String longitude;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}

	public String getAppVersion() {
		return appVersion;
	}

	public void setAppVersion(String appVersion) {
		this.appVersion = appVersion;
	}

	public String getDeviceModel() {
		return deviceModel;
	}

	public void setDeviceModel(String deviceModel) {
		this.deviceModel = deviceModel;
	}

	public String getImei() {
		return imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public String getInternetType() {
		return internetType;
	}

	public void setInternetType(String internetType) {
		this.internetType = internetType;
	}

	public String getOperatingSystem() {
		return operatingSystem;
	}

	public void setOperatingSystem(String operatingSystem) {
		this.operatingSystem = operatingSystem;
	}


	public String getActivityType() {
		return activityType;
	}

	public void setActivityType(String activityType) {
		this.activityType = activityType;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	
}
