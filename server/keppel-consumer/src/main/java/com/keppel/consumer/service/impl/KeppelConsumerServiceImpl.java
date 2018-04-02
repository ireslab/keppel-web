package com.keppel.consumer.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.WebServiceTemplate;

import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.service.KeppelConsumerService;
import com.keppel.consumer.utils.FTPUtils;
import com.keppelCM.CMRETPERMTY.CMRETPERMTY;
import com.keppelCM.CMRETPERMTY.CMRETPERMTY.Input;
import com.keppelCMR.CMRECPLAN.CMRECPLAN;
import com.keppelM1.M1MMCTR.M1MMCTR;
import com.keppelM1.M1MMCTR.M1MMCTR.ReceiveDetails;
import com.keppelM1.M1MMCTR.M1MMCTR.ReceiveDetails.ReceiveData;
import com.keppelM1.M1MMCTR.M1MMCTR.ReceiveDetails.ReceiveData.ReceiveDetail;

@Service
public class KeppelConsumerServiceImpl implements KeppelConsumerService {

	static Logger logger = Logger.getLogger(KeppelConsumerServiceImpl.class.getName());
	@Qualifier("CMRETPERMTY")
	@Autowired
	private WebServiceTemplate webServiceTemplateCMRETPERMTY;

	@Qualifier("M1MMCTR")
	@Autowired
	private WebServiceTemplate webServiceTemplateM1MMCTR;
	
	@Qualifier("CMRECPLAN")
	@Autowired
	private WebServiceTemplate webServiceTemplateCMRECPLAN;

	/*
	 * @Qualifier("CREATEINCIDENTWS")
	 * 
	 * @Autowired private WebServiceTemplate webServiceTemplateCREATEINCIDENT;
	 */

	@Override
	public void submitUserData(AccountDto accountDto) {

		M1MMCTR m1mmctr = new M1MMCTR();
		if (accountDto.getPremiseId() != null) {

			m1mmctr.setPremiseId(accountDto.getPremiseId());
		}

		ReceiveDetail receiveDetail = new ReceiveDetail();
		receiveDetail.setBillingAddress(accountDto.getBillingAddress());
		receiveDetail.setBillingAddress2(accountDto.getBillingAddress2());
		receiveDetail.setBillingPostalcode(accountDto.getBillingPostalcode());
		receiveDetail.setCity(accountDto.getCity());
		receiveDetail.setContactPhoneNumber(accountDto.getContactPhoneNumber());
		receiveDetail.setContractDuration(accountDto.getContractDuration());
		receiveDetail.setCurrentMeterType(accountDto.getCurrentMeterType());
		receiveDetail.setCustomerType(accountDto.getCustomerType());
		receiveDetail.setDOB(accountDto.getDob());
		receiveDetail.setEBSorMSSLAccountNumber(accountDto.getEbsOrMSSLAccountNumber());
		receiveDetail.setEMail(accountDto.geteMail());
		receiveDetail.setFirstName(accountDto.getFirstName());
		receiveDetail.setGender(accountDto.getGender());
		receiveDetail.setIcNumber(accountDto.getIcNumber());
		receiveDetail.setIcNumberType(accountDto.getIcNumberType());
		receiveDetail.setLastName(accountDto.getLastName());
		receiveDetail.setOptionalService1(accountDto.getOptionalService1());
		receiveDetail.setOptionalService2(accountDto.getOptionalService2());
		receiveDetail.setOptionalService3(accountDto.getOptionalService3());
		receiveDetail.setPaymentMethod(accountDto.getPaymentMethod());
		receiveDetail.setPlanType(accountDto.getPlanType());
		receiveDetail.setPostcode(accountDto.getPostcode());
		receiveDetail.setPremiseAddress(accountDto.getPremiseAddress());
		receiveDetail.setPremiseAddress2(accountDto.getPremiseAddress2());
		receiveDetail.setPremiseType(accountDto.getPremiseType());
		receiveDetail.setPromoCode(accountDto.getPromoCode());
		receiveDetail.setRecommendedPlans(accountDto.getRecommendedPlans());
		receiveDetail.setRemarks(accountDto.getRemarks());
		receiveDetail.setServiceStartDate(accountDto.getServiceStartDate());
		receiveDetail.setTenantorOwner(accountDto.getTenantOrOwner());

		ReceiveData receiveData = new ReceiveData();
		receiveData.setReceiveDetail(receiveDetail);

		ReceiveDetails receiveDetails = new ReceiveDetails();
		receiveDetails.setReceiveData(receiveData);

		List<ReceiveDetails> receiveDetailsList = new ArrayList<>();
		receiveDetailsList.add(receiveDetails);
		m1mmctr.getReceiveDetails().addAll(receiveDetailsList);
		M1MMCTR m1mmctrResponse = (M1MMCTR) webServiceTemplateM1MMCTR.marshalSendAndReceive(m1mmctr);
		submitUserImageData(accountDto);
	}

	public void getDwellingTypes() {

		CMRETPERMTY body = new CMRETPERMTY();
		Input input = new Input();
		input.setLanguage("English");
		body.setInput(input);

		CMRETPERMTY respone = (CMRETPERMTY) webServiceTemplateCMRETPERMTY.marshalSendAndReceive(body);
		logger.info("DwellingTypes recieved- " + respone.getOutput().getPremiseType().get(0).getDescription());

	}

	@Override
	public void submitUserImageData(AccountDto accountDto) {
		accountDto.setUserId(accountDto.geteMail().substring(0, accountDto.geteMail().indexOf('@')));
		String fileExt = accountDto.getAttachmentName().substring(accountDto.getAttachmentName().lastIndexOf('.'),
				accountDto.getAttachmentName().length());
		logger.info("Attachment data starts with- " + accountDto.getAttachmentData().substring(0, 30));
		accountDto.setAttachmentData(accountDto.getAttachmentData().replace("data:image/jpeg;base64,", ""));
		logger.info("Storing user image at remote host ");
		try {
			FTPUtils ftpUploader = new FTPUtils("10.21.32.4", "oracle", "LyPp1$3@RHgR");
			ftpUploader.uploadFile("F:\\projects\\kepple\\docs\\images\\Screenshot.jpg",
					accountDto.getUserId() + '.' + fileExt, "/u01/FRC/SignUpDocs/Mobile/",
					accountDto.getAttachmentData());
			ftpUploader.disconnect();

		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}

	@Override
	public List<CMRECPLAN.Plans> getRecomendedPlans() {
		CMRECPLAN body = new CMRECPLAN();
		body.setBo("CM-MasterRecomendedPlans");
		CMRECPLAN respone = (CMRECPLAN) webServiceTemplateCMRECPLAN.marshalSendAndReceive(body);
		return respone.getPlans();
	}

}
