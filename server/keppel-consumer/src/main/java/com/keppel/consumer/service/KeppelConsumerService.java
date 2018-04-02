package com.keppel.consumer.service;

import java.util.List;

import com.keppel.consumer.dto.AccountDto;
import com.keppelCMR.CMRECPLAN.CMRECPLAN;

public interface KeppelConsumerService {
	public void submitUserData(AccountDto accountDto);

	public void submitUserImageData(AccountDto accountDto);

	public void getDwellingTypes();

	public List<CMRECPLAN.Plans> getRecomendedPlans();
}
