package com.keppel.consumer.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.WebServiceTemplate;
import com.google.gson.JsonObject;
import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.dto.SecurityDeposit;
import com.keppel.consumer.service.KeppelConsumerService;
import com.keppel.consumer.utils.FTPUtils;
import com.keppelCM.CMRETPERMTY.CMRETPERMTY;
import com.keppelCM.CMRETPERMTY.CMRETPERMTY.Input;
import com.keppelCMPROMO.CmPromotionCodeGenerationBS.CmPromotionCodeGenerationBS;
import com.keppelCMPROMO.CmPromotionCodeGenerationBS.CmPromotionCodeGenerationBS.Promocoderesult;
import com.keppelCMR.CMRECPLAN.CMRECPLAN;
import com.keppelCMRET.CMRetSDAmt.CMRetSDAmt;
import com.keppelCMRMS.CMRetMsgStatus.CMRetMsgStatus;
import com.keppelCMRMS.CMRetMsgStatus.CMRetMsgStatus.Results;
import com.keppelM1.M1MMCTR.M1MMCTR;
import com.keppelM1.M1MMCTR.M1MMCTR.ReceiveDetails;
import com.keppelM1.M1MMCTR.M1MMCTR.ReceiveDetails.ReceiveData;
import com.keppelM1.M1MMCTR.M1MMCTR.ReceiveDetails.ReceiveData.ConsumerTransfer;
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

	@Qualifier("CMRMS")
	@Autowired
	private WebServiceTemplate webServiceTemplateCMRMS;

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
		// receiveDetail.setMarketingEmail(accountDto.getMarketingEmail());

		if (accountDto.getMarketingSMS() != null) {
			receiveDetail.setMarketingPhone(accountDto.getMarketingSMS());
			receiveDetail.setMarketingSMS(accountDto.getMarketingSMS());
		}

		receiveDetail.setCurrentMeterType(accountDto.getMeterType());
		receiveDetail.setTC("true");
		receiveDetail.setPDPA("true");
		receiveDetail.setEMA("true");
		receiveDetail.setServiceEndDate(accountDto.getServiceEndDate());
		receiveDetail.setMarketingConsent(accountDto.getMarketingConsent());
		receiveDetail.setContactPhoneType("M");
		receiveDetail.setCity("Singapore");

		String timeStamp = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		receiveDetail.setSubscriptionDate(timeStamp);

		ConsumerTransfer consumerTransfer = new ConsumerTransfer();
		consumerTransfer.setActionDate(accountDto.getServiceStartDate());
		consumerTransfer.setBillingOption("RCB");
		consumerTransfer.setConsumerName(accountDto.getFirstName() + " " + accountDto.getLastName());
		consumerTransfer.setSendingPartyType("SE");
		consumerTransfer.setUserId("KAR");

		if (accountDto.getPaymentMethod() != null && accountDto.getPaymentMethod().equalsIgnoreCase("GIRO")) {
			long random = (long) Math.floor(Math.random() * 9_000_000_0000L) + 1_000_000_0000L;
			String iddaCode = Long.toString(random);
			receiveDetail.setIDDACode(iddaCode);
		}

		String paperBill = accountDto.getOptionalService1();
		String smartMeter = accountDto.getOptionalService2();
		if ((smartMeter != null && smartMeter.equals("Smart Meter"))
				&& (paperBill != null && !paperBill.equals("Paper Bill"))) {
			consumerTransfer.setMeterOption("AMI");
			receiveDetail.setOptionalService2("SMAR");
		} else if ((paperBill != null && paperBill.equals("Paper Bill"))
				&& (smartMeter != null && !smartMeter.equals("Smart Meter"))) {
			consumerTransfer.setSelfReadOption("X");
			consumerTransfer.setMeterOption("SRLP");
			receiveDetail.setOptionalService1("PAPE");
		} else if ((paperBill != null && paperBill.equals("Paper Bill"))
				&& (smartMeter != null && smartMeter.equals("Smart Meter"))) {
			consumerTransfer.setMeterOption("AMI");
			receiveDetail.setOptionalService1("PAPE");
			receiveDetail.setOptionalService2("SMAR");
		} else {
			consumerTransfer.setSelfReadOption("X");
			consumerTransfer.setMeterOption("SRLP");
		}

		ReceiveData receiveData = new ReceiveData();
		receiveData.setReceiveDetail(receiveDetail);
		receiveData.setConsumerTransfer(consumerTransfer);

		ReceiveDetails receiveDetails = new ReceiveDetails();
		receiveDetails.setReceiveData(receiveData);

		List<ReceiveDetails> receiveDetailsList = new ArrayList<>();
		receiveDetailsList.add(receiveDetails);
		m1mmctr.getReceiveDetails().addAll(receiveDetailsList);
		M1MMCTR m1mmctrResponse = (M1MMCTR) webServiceTemplateM1MMCTR.marshalSendAndReceive(m1mmctr);

		// if (accountDto.getAttachmentData() != null &&
		// accountDto.getAttachmentData().length() > 100)
		// submitUserImageData(accountDto);

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

	@Override
	public JsonObject getPromoCode(String promocode) {
		CmPromotionCodeGenerationBS body = new CmPromotionCodeGenerationBS();
		body.setCmPromoCode(promocode);
		body = (CmPromotionCodeGenerationBS) webServiceTemplateCMPROMO.marshalSendAndReceive(body);
		JsonObject response = new JsonObject();

		if (body != null && body.getIsValidPromoCode().equals("true")) {
			List<Promocoderesult> result = body.getPromocoderesult();
			if (result != null && result.size() > 0) {
				response.addProperty("success", "true");
				response.addProperty("amount",
						result.get(0).getCmDiscountType3() + result.get(0).getCmDiscountAmount2());
			} else {
				response.addProperty("success", "false");
				response.addProperty("message", "Please enter a valid promo code");
			}
		} else {
			response.addProperty("success", "false");
			response.addProperty("message", "Please enter a valid promo code");
		}
		return response;
	}

	@Override
	public JsonObject getTrackStatus(String messageid) {
		CMRetMsgStatus body = new CMRetMsgStatus();
		body.setMessageId(messageid);
		body = (CMRetMsgStatus) webServiceTemplateCMRMS.marshalSendAndReceive(body);
		JsonObject response = new JsonObject();

		if (body != null) {
			if (body.getResults() != null && body.getResults().size() > 0) {
				Results result = body.getResults().get(0);
				String description = result.getDescription();
				String imageVisible = null;

				if (description != null) {
					if (description.equals("Canceled") || description.equals("Remove From Processing")
							|| description.equals("Termination Notice Sent")) {
						imageVisible = "I";
					} else if (description.equals("Initilized") || description.equals("Wait Cooling Period")
							|| description.equals("Message Sent") || description.equals("Message Created")
							|| description.equals("MessageSend Error")
							|| description.equals("Validation Acknowledgement Failed")
							|| description.equals("Validation Failed") || description.equals("Wait Validation Ack")) {
						imageVisible = "WCP";
					} else if (description.equals("New Action Date Required")
							|| description.equals("New Action Date Notice Sent")
							|| description.equals("Update Action Date") || description.equals("Wait CTR Report")) {
						imageVisible = "VF";
					} else if (description.equals("Completed") || description.equals("CTR Report Received")) {
						imageVisible = "C";
					}
					
					response.addProperty("success", "true");
					response.addProperty("message", result.getDescription());
					response.addProperty("image", imageVisible);
					
				} else {
					response.addProperty("success", "false");
					response.addProperty("message", "No Application Status found.");
				}
			} else {
				response.addProperty("success", "false");
				response.addProperty("message", "No Application Status found.");
			}

		} else {
			response.addProperty("success", "false");
			response.addProperty("message", "No Application Status found.");
		}

		return response;
	}
}
