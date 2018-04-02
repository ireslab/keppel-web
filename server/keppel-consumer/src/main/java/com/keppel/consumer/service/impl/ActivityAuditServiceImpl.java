package com.keppel.consumer.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.model.ActivityAudit;
import com.keppel.consumer.service.ActivityAuditCrudRepository;
import com.keppel.consumer.service.ActivityAuditService;

@Service
public class ActivityAuditServiceImpl implements ActivityAuditService {

	@Autowired
	private ActivityAuditCrudRepository activityAuditCrudRepository;

	@Override
	public void saveActivityAudit(AccountDto accountDto) {
		ActivityAudit activityAudit = new ActivityAudit();
		activityAudit.setActivityType(accountDto.getActivityType());
		activityAudit.setApplicationId(accountDto.getApplicationId());
		activityAudit.setAppVersion(accountDto.getAppVersion());
		activityAudit.setCreationDate(new Date());
		activityAudit.setDeviceModel(accountDto.getDeviceModel());
		activityAudit.setEmail(accountDto.geteMail());
		activityAudit.setImei(accountDto.getImei());
		activityAudit.setInternetType(accountDto.getInternetType());
		activityAudit.setLatitude(accountDto.getLatitude());
		activityAudit.setLongitude(accountDto.getLongitude());
		activityAudit.setOperatingSystem(accountDto.getOperatingSystem());
		activityAudit.setDeviceId(accountDto.getDeviceId());

		activityAuditCrudRepository.save(activityAudit);
	}

}
