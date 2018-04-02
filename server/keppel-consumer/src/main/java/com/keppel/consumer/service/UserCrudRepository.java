package com.keppel.consumer.service;

import org.springframework.data.repository.CrudRepository;

import com.keppel.consumer.model.Account;


public interface UserCrudRepository extends CrudRepository<Account, String> {

}
