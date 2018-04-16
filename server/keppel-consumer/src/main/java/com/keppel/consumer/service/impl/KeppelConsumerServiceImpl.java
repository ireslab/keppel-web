package com.keppel.consumer.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.WebServiceTemplate;

import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.dto.SecurityDeposit;
import com.keppel.consumer.service.KeppelConsumerService;
import com.keppel.consumer.utils.FTPUtils;
import com.keppelCM.CMRETPERMTY.CMRETPERMTY;
import com.keppelCM.CMRETPERMTY.CMRETPERMTY.Input;
import com.keppelCMR.CMRECPLAN.CMRECPLAN;
import com.keppelCMRET.CMRetSDAmt.CMRetSDAmt;
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

	@Qualifier("CMRET")
	@Autowired
	private WebServiceTemplate webServiceTemplateCMRET;

	@Qualifier("CMPROMO")
	@Autowired
	private WebServiceTemplate webServiceTemplateCMPROMO;

	/*
	 * @Qualifier("CREATEINCIDENTWS")
	 * 
	 * @Autowired private WebServiceTemplate webServiceTemplateCREATEINCIDENT;
	 */

	@Override
	public M1MMCTR submitNewResidentialSignupData(AccountDto accountDto) {

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
		// receiveDetail.setOptionalService3(accountDto.getOptionalService3());
		receiveDetail.setPaymentMethod(accountDto.getPaymentMethod());
		receiveDetail.setPlanType(accountDto.getPlanType());
		receiveDetail.setPostcode(accountDto.getPostcode());
		receiveDetail.setPremiseAddress(accountDto.getPremiseAddress());
		receiveDetail.setPremiseAddress2(accountDto.getPremiseAddress2());
		receiveDetail.setPremiseType(accountDto.getPremiseType());
		receiveDetail.setPromoCode(accountDto.getPromoCode());
		receiveDetail.setRecommendedPlans(accountDto.getSelectedPlan());
		receiveDetail.setRemarks(accountDto.getRemarks());
		receiveDetail.setServiceStartDate(accountDto.getServiceStartDate());
		receiveDetail.setTenantorOwner(accountDto.getTenantOrOwner());
		receiveDetail.setRecommendedPlanVersion(accountDto.getSelectedPlanVersion());
		receiveDetail.setPastMonthConsumptionDetails(accountDto.getPastMonthConsumptionDetail());
		receiveDetail.setMarketingEmail(accountDto.getMarketingEmail());
		receiveDetail.setMarketingPhone(accountDto.getMarketingPhone());
		receiveDetail.setMarketingSMS(accountDto.getMarketingSMS());
		receiveDetail.setCurrentMeterType(accountDto.getMeterType());
		receiveDetail.setTC(accountDto.getTC());
		receiveDetail.setPDPA(accountDto.getPDPA());

		ReceiveData receiveData = new ReceiveData();
		receiveData.setReceiveDetail(receiveDetail);

		ReceiveDetails receiveDetails = new ReceiveDetails();
		receiveDetails.setReceiveData(receiveData);

		List<ReceiveDetails> receiveDetailsList = new ArrayList<>();
		receiveDetailsList.add(receiveDetails);
		m1mmctr.getReceiveDetails().addAll(receiveDetailsList);
		M1MMCTR m1mmctrResponse = (M1MMCTR) webServiceTemplateM1MMCTR.marshalSendAndReceive(m1mmctr);

		if (accountDto.getAttachmentData() != null && accountDto.getAttachmentData().length() > 100)
			submitUserImageData(accountDto);

		return m1mmctrResponse;
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
			ftpUploader.uploadFile(accountDto.getIcNumber() + '.' + fileExt, "/u01/FRC/SignUpDocs/Mobile/",
					accountDto.getAttachmentData());
			ftpUploader.disconnect();

		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}

	@Override
	public CMRECPLAN getRecomendedPlans() {
		CMRECPLAN body = new CMRECPLAN();
		body.setBo("CM-MasterRecomendedPlans");
		CMRECPLAN respone = (CMRECPLAN) webServiceTemplateCMRECPLAN.marshalSendAndReceive(body);
		return respone;
	}

	@Override
	public SecurityDeposit.SecurityDepositResponse getSecutityDeposit(SecurityDeposit deposits) {
		CMRetSDAmt body = new CMRetSDAmt();
		CMRetSDAmt.Input input = new CMRetSDAmt.Input();
		input.setIdType(deposits.getIdType());
		input.setPayMethod(deposits.getPayMethod());
		input.setPremiseType(deposits.getPremiseType());
		body.setInput(input);
		CMRetSDAmt respone = (CMRetSDAmt) webServiceTemplateCMRET.marshalSendAndReceive(body);

		SecurityDeposit.SecurityDepositResponse depositResponse = deposits.new SecurityDepositResponse();
		if (respone == null || respone.getOutput() == null || respone.getOutput().getSdAmount() == null
				|| respone.getOutput().getSdAmount().length() <= 0) {
			depositResponse.setSuccess(false);
			depositResponse.setSd_amount(null);
		} else {
			depositResponse.setSuccess(true);
			depositResponse.setSd_amount(respone.getOutput().getSdAmount());
		}
		return depositResponse;
	}

}
