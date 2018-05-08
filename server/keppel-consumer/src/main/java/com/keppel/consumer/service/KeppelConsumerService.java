package com.keppel.consumer.service;

import com.google.gson.JsonObject;
import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.dto.SecurityDeposit;
import com.keppelCMR.CMRECPLAN.CMRECPLAN;
import com.keppelM1.M1MMCTR.M1MMCTR;

public interface KeppelConsumerService {
	public M1MMCTR submitNewResidentialSignupData(AccountDto accountDto);

	public void submitUserImageData(AccountDto accountDto);

	public void getDwellingTypes();

	public CMRECPLAN getRecomendedPlans();

	public SecurityDeposit.SecurityDepositResponse getSecutityDeposit(SecurityDeposit deposits);

	public JsonObject getPromoCode(String promocode);

	public JsonObject getTrackStatus(String messageid);
}
