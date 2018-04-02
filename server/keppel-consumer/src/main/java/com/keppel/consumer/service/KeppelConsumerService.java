package com.keppel.consumer.service;

import com.keppel.consumer.dto.AccountDto;

public interface KeppelConsumerService {

	public void submitUserData(AccountDto accountDto);
	
	
	public void submitUserImageData(AccountDto accountDto);
	
	
	public void getDwellingTypes();

}
