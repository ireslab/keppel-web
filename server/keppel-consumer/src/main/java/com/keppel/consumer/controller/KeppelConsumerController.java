package com.keppel.consumer.controller;

import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Properties;
import java.util.TimeZone;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.faces.context.FacesContext;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.dto.SecurityDeposit;
import com.keppel.consumer.model.ContactUs;
import com.keppel.consumer.service.KeppelConsumerService;
import com.keppel.consumer.utils.GeneratePDF;
import com.keppelCI.CreateIncident.ProcessResponse;
import com.keppelCMR.CMRECPLAN.CMRECPLAN;
import com.keppelM1.M1MMCTR.M1MMCTR;

@CrossOrigin
@RestController
@RequestMapping(value = "/v1/*", produces = MediaType.APPLICATION_JSON_VALUE)
public class KeppelConsumerController {
	private static final Logger logger = LoggerFactory.getLogger(KeppelConsumerController.class);

	@Autowired
	KeppelConsumerService keppelConsumerService;

	@Autowired
	Gson gson;

	OutputStream outputStream;

	public OutputStream getOutputStream() {
		return outputStream;
	}

	public void setOutputStream(OutputStream outputStream) {
		this.outputStream = outputStream;
	}

	/*
	 * Used to check is APIs working in first level.
	 * 
	 * @ApiOperation(value = "Returns 'Hello from resource'", notes =
	 * "A basic example of a resource returning a constant string.")
	 * 
	 * @ApiResponses(value = { @ApiResponse(code = 200, message =
	 * "Hello message returned") })
	 */
	@RequestMapping(value = "getResourceData", method = RequestMethod.GET)
	public String getResourceData() {
		// log message to server log
		logger.info("Logging info message...");

		return "Hello from resource";
	}

	/*
	 * @ApiOperation(value = "Unprotected Resource", notes =
	 * "Example of an unprotected resource, this resource is accessible without a valid token."
	 * )
	 * 
	 * @ApiResponses(value = { @ApiResponse(code = 200, message =
	 * "A constant string is returned") })
	 */
	@RequestMapping(value = "getDwellingTypes", method = RequestMethod.GET)
	public String getDwellingTypes() {
		logger.info("Request info for getDwellingTypes ");
		keppelConsumerService.getDwellingTypes();
		return null;
	}

	@RequestMapping(value = "getPlans", method = RequestMethod.GET)
	public String getRecomendedPlans() {
		logger.info("Request info for getRecomendedPlans ");
		CMRECPLAN respone = keppelConsumerService.getRecomendedPlans();
		List<CMRECPLAN.Plans> planList = respone.getPlans();
		List<CMRECPLAN.RecomendedPlans> recomendedList = respone.getRecomendedPlans();
		Gson gson = new Gson();
		String planJson = gson.toJson(planList);
		String recomendedJson = gson.toJson(recomendedList);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("planJson", planJson);
		map.put("recomendedJson", recomendedJson);
		return gson.toJson(map);
	}

	/**
	 * This API gets security deposit.
	 * 
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "getSecutityDeposit", method = RequestMethod.POST)
	public ResponseEntity<SecurityDeposit.SecurityDepositResponse> getSecutityDeposit(
			@RequestBody SecurityDeposit deposits) {

		SecurityDeposit.SecurityDepositResponse depositResponse = keppelConsumerService.getSecutityDeposit(deposits);
		return new ResponseEntity<>(depositResponse, HttpStatus.OK);
	}

	/**
	 * This API sends contact us details.
	 * 
	 * @return
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "contactUsDetails", method = RequestMethod.POST)
	public String contactUsDetails(@RequestBody ContactUs contactUs) {
		contactUs.setIncidentState("26");
		contactUs.setStatus("Open Call Back");
		LocalDateTime ldt = LocalDateTime.now();
		contactUs.setCallBackDateTime(ldt.toString());
		contactUs.setCallBackDate(ldt.toString());
		ProcessResponse processResponse = keppelConsumerService.sendContactUs(contactUs);
		
		JsonObject response = new JsonObject();
		if(processResponse!=null) {
			response.addProperty("success", "true");
			response.addProperty("contactId", processResponse.getContactId());
			response.addProperty("incidentId", processResponse.getIncidentId());
			response.addProperty("referenceNo", processResponse.getReferenceNo());
		}else {
			response.addProperty("success", "false");
		}
	
		return response.toString();
	}

	/*
	 * @ApiOperation(value = "Unprotected Resource", notes =
	 * "Example of an unprotected resource, this resource is accessible without a valid token."
	 * )
	 * 
	 * @ApiResponses(value = { @ApiResponse(code = 200, message =
	 * "A constant string is returned") })
	 */
	@RequestMapping(value = "getPromocode/{promocode}", method = RequestMethod.GET)
	public String getPromoCode(@PathVariable String promocode) {
		logger.info("Request info for getPromocode ");
		JsonObject res = keppelConsumerService.getPromoCode(promocode);
		return res.toString();
	}

	/*
	 * @ApiOperation(value = "Unprotected Resource", notes =
	 * "Example of an unprotected resource, this resource is accessible without a valid token."
	 * )
	 * 
	 * @ApiResponses(value = { @ApiResponse(code = 200, message =
	 * "A constant string is returned") })
	 */
	@RequestMapping(value = "getAppStatus/{messageid}", method = RequestMethod.GET)
	public String getTrackStatus(@PathVariable String messageid) {
		logger.info("Request info for getPromocode ");
		JsonObject res = keppelConsumerService.getTrackStatus(messageid);
		return res.toString();
	}

	/**
	 * This API gets security deposit.
	 * 
	 * @return
	 * @throws JsonProcessingException
	 */
	// TODO Replace AccountDto with model Account Class
	@RequestMapping(value = "newResiSignup", method = RequestMethod.POST)
	public String newResidentialUserSignup(@RequestBody AccountDto signUpData) {
		M1MMCTR res = keppelConsumerService.submitNewResidentialSignupData(signUpData);
		Gson gson = new Gson();
		String json = gson.toJson(res.getReceiveDetails());
		FacesContext facesContext = FacesContext.getCurrentInstance();
		// OutputStream outputStream = facesContext.getResponseStream();
		signUpData.setApplicationId(res.getMessageId());
		try {
			new GeneratePDF().generatePDF(facesContext, outputStream, signUpData);
			SendEmailAttachment(signUpData);
		} catch (Exception exception) {
			exception.printStackTrace();
		}

		logger.info("Response data =====================>" + json);
		return json;
	}

	public String SendEmailAttachment(AccountDto account) {
		long temp = (long) Math.floor(Math.random() * 9_000_000_0000L) + 1_000_000_0000L;
		String random = Long.toString(temp);
		logger.info("sendEmailAttachment====");
		String to = account.geteMail(); // change accordingly
		String from = "noreply@keppelelectric.com"; // change accordingly
		String host = "10.59.81.244"; // or IP address

		logger.info("To Email Id::: " + to);
		// Get the session object
		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", host);
		Session session = Session.getDefaultInstance(properties);
		try {
			logger.info("in try sendEmailAttachment====");
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			// message.addRecipient(Message.RecipientType.TO, new
			// InternetAddress("sean.teo@kepinfra.com"));
			// Set Only PROD production mode
			// message.addRecipient(Message.RecipientType.TO, new
			// InternetAddress("contracts@keppelelectric.com"));
			message.setSubject("Your application with Keppel Electric has been received!");
			Multipart multipart = new MimeMultipart();
			message.setContent(multipart);
			DataSource source = new FileDataSource("/u01/FRC/SignUpDocs/SignUp_FOA.pdf");
			message.setDataHandler(new DataHandler(source));
			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setDataHandler(new DataHandler(source));
			messageBodyPart.setFileName("Form of Acceptance.pdf");
			multipart.addBodyPart(messageBodyPart);
			message.setContent(multipart);
			BodyPart htmlPart = new MimeBodyPart();
			String cantString = "can't";
			String actString = "(" + "Act" + ")";
			htmlPart.setContent("Hi " + account.getFirstName() + "," +
			// "<br/><br/>Thank you for choosing Keppel Electric! We have received your
			// application and have attached the contract. You can track the status of your
			// application with your application number" +
			// "<a
			// href=https://channel.keppelelectric.com/webcenter/portal/public/pages_trackstatus>
			// here</a>" + "<br/><br/>Application number: " +

					"<br/><br/>Thank you for choosing Keppel Electric! We have received your application and have attached the contract."
					+ "<br/><br/>Application number: " +

					"<b>" + account.getApplicationId() + " </b>" + "<br/><br/>Subscription Plan: " + "<b>"
					+ account.getSelectedPlan() + "</b>" + "<br/><br/>Billing Organisation: "
					+ "<b>Keppel Electric Pte Ltd</b>" +

					"<br/><br/>Bill Reference: " + "<b>" + random + " </b>"
					+ "<br/><br/>If you have not provided your SP account number or a scanned copy of your past month bill, fret not! Simply, send it to "
					+ "<a href=sales@keppelelectric.com>sales@keppelelectric.com</a>"
					+ "with your Application Number as the subject title and we will get right on to it!" +

					"<br/><br/> For GIRO (DBS) application, please authorise the payment access through the DBS portal "
					+ "<a href=https://internet-banking.dbs.com.sg/>here</a>" +

					"<br/><br/>" + cantString + " wait to have you onboard!"
					+ "<br/><br/><b><i>Life Just Got Brighter,</i></b>"
					+ "<br/><br/><i>Your Customer Service friend</i>" + "<br/><br/><hr></hr>" + "Application number: "
					+ "<b>" + account.getApplicationId() + " </b>"
					+ "<br/><br/>By applying for this application, you confirm that you have read, understood and agreed to be bound by the Personal Data Protection Act 2012 "
					+ actString + " and Terms and Conditions."
					+ "<br/><br/>If you have any queries, please do not hesitate to contact our Customer Service at +65 6803 3888 or email to sales@keppelelectric.com",
					"text/html");

			multipart.addBodyPart(htmlPart);
			Transport.send(message);
			logger.info("message sent successfully....");
		} catch (Exception e) {
			logger.info("in catch Exception:::::::::" + e);
			e.printStackTrace();
		}
		return null;
	}

}
