package com.keppel.consumer.controller;

import java.io.OutputStream;
import java.util.List;
import java.util.Properties;
import java.util.Random;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.dto.RESPONSE_CODE;
import com.keppel.consumer.dto.ResponseDto;
import com.keppel.consumer.dto.SecurityDeposit;
import com.keppel.consumer.model.Account;
import com.keppel.consumer.service.ActivityAuditService;
import com.keppel.consumer.service.KeppelConsumerService;
import com.keppel.consumer.utils.GeneratePDF;
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
	ActivityAuditService activityAuditService;

	@Autowired
	Gson gson;

	/*
	 * Path for method:
	 * "<server address>/mfp/api/adapters/SpringAdapterSample/resource"
	 */

	public String getDD() {
		// log message to server log
		logger.info("Logging info message...");

		return "Hello from 123 resource";
	}

	/*
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
	 * Path for method:
	 * "<server address>/mfp/api/adapters/SpringAdapterSample/resource/greet?name={name}"
	 */

	// @ApiOperation(value = "Query Parameter Example", notes = "Example of passing
	// query parameters to a resource. Returns a greeting containing the name that
	// was passed in the query parameter.")
	// @ApiResponses(value = { @ApiResponse(code = 200, message = "Greeting message
	// returned") })
	// @GET
	// @Produces(MediaType.TEXT_PLAIN)
	// @Path("/greet")
	// public String helloUser(
	// @ApiParam(value = "Name of the person to greet", required = true)
	// @QueryParam("name") String name) {
	// return "Hello " + name + "!";
	// }
	//
	// /*
	// * Path for method:
	// * "<server address>/mfp/api/adapters/SpringAdapterSample/resource/{path}/"
	// */
	//
	// @ApiOperation(value = "Multiple Parameter Types Example", notes = "Example of
	// passing parameters using 3 different methods: path parameters, headers, and
	// form parameters. A JSON object containing all the received parameters is
	// returned.")
	// @ApiResponses(value = {
	// @ApiResponse(code = 200, message = "A JSON object containing all the received
	// parameters returned.") })
	// @POST
	// @Produces(MediaType.APPLICATION_JSON)
	// @Path("/{path}")
	// public Map<String, String> enterInfo(
	// @ApiParam(value = "The value to be passed as a path parameter", required =
	// true) @PathParam("path") String path,
	// @ApiParam(value = "The value to be passed as a header", required = true)
	// @HeaderParam("Header") String header,
	// @ApiParam(value = "The value to be passed as a form parameter", required =
	// true) @FormParam("form") String form) {
	// Map<String, String> result = new HashMap<String, String>();
	//
	// result.put("path", path);
	// result.put("header", header);
	// result.put("form", form);
	//
	// return result;
	// }
	//
	// /*
	// * Path for method:
	// * "<server address>/mfp/api/adapters/SpringAdapterSample/resource/prop"
	// */
	//
	// @ApiOperation(value = "Configuration Example", notes = "Example usage of the
	// configuration API. A property name is read from the query parameter, and the
	// value corresponding to that property name is returned.")
	// @ApiResponses(value = { @ApiResponse(code = 200, message = "Property value
	// returned."),
	// @ApiResponse(code = 404, message = "Property value not found.") })
	// @GET
	// @Path("/prop")
	// @Produces(MediaType.TEXT_PLAIN)
	// public Response getPropertyValue(
	// @ApiParam(value = "The name of the property to lookup", required = true)
	// @QueryParam("propertyName") String propertyName) {
	// // Get the value of the property:
	// String value = configApi.getPropertyValue(propertyName);
	// if (value != null) {
	// // return the value:
	// return Response.ok("The value of " + propertyName + " is: " + value).build();
	// } else {
	// return Response.status(Status.NOT_FOUND).entity("No value for " +
	// propertyName + ".").build();
	// }
	//
	// }
	//
	// /*
	// * Path for method:
	// * "<server
	// address>/mfp/api/adapters/SpringAdapterSample/resource/unprotected"
	// */
	//
	// @ApiOperation(value = "Unprotected Resource", notes = "Example of an
	// unprotected resource, this resource is accessible without a valid token.")
	// @ApiResponses(value = { @ApiResponse(code = 200, message = "A constant string
	// is returned") })
	// @GET
	// @Path("/unprotected")
	// @Produces(MediaType.TEXT_PLAIN)
	// @OAuthSecurity(enabled = false)
	// public String unprotected() {
	// return "Hello from a resource unnnnprotected by a custom scope!";
	// // keppelConsumerService.getDwellingTypes();
	// // return null;
	// }
	//
	// /*
	// * Path for method:
	// * "<server address>/mfp/api/adapters/SpringAdapterSample/resource/protected"
	// */
	//
	// @ApiOperation(value = "Custom Scope Protection", notes = "Example of a
	// resource that is protected by a custom scope. To access this resource a valid
	// token for the scope 'myCustomScope' must be acquired.")
	// @ApiResponses(value = { @ApiResponse(code = 200, message = "A constant string
	// is returned") })
	// @GET
	// @Path("/protected")
	// @Produces(MediaType.TEXT_PLAIN)
	// @OAuthSecurity(scope = "keppelcustomescope")
	// public String customScopeProtected() {
	// return "Hello from a resource protected by a custom scope!";
	// }
	//
	// @POST
	// @Path("/submitUserData")
	// @Produces(MediaType.APPLICATION_JSON)
	// @Consumes(MediaType.APPLICATION_JSON)
	// // @OAuthSecurity(enabled = false)
	// @OAuthSecurity(scope = "keppelcustomescope")
	@RequestMapping(value = "submitNewUserSignup", method = RequestMethod.POST)
	public ResponseDto submitUserData(AccountDto accountDto) {
		// logger.info("Request for submitUserData " + gson.toJson(accountDto));
		// System.out.println("Request for submitUserData- " +
		// accountDto.getFirstName());
		ResponseDto responseDto = new ResponseDto<>();

		// accountDto.setActivityType(ActivityRequestType.SIGN_UP.name());
		// activityAuditService.saveActivityAudit(accountDto);
		// try {
		keppelConsumerService.submitNewResidentialSignupData(accountDto);
		// responseDto.setResponseCode(RESPONSE_CODE.SUCCESS.getCode());
		// responseDto.setResponseDescription(RESPONSE_CODE.SUCCESS.name());
		// logger.info("Respone for submitUserData- " + gson.toJson(responseDto));
		// } catch (Exception exception) {
		// exception.printStackTrace();
		// //logger.log(Level.SEVERE, "Error from submitUserData Service:- " +
		// ExceptionUtils.getStackTrace(exception));
		// responseDto.setResponseCode(RESPONSE_CODE.FAIL.getCode());
		// responseDto.setResponseDescription(RESPONSE_CODE.FAIL.name());

		/*
		 * if (exception instanceof SoapFaultClientException) { SoapFaultClientException
		 * serviceFault = (SoapFaultClientException) exception;
		 * responseDto.setResponseCode(serviceFault.getFaultCode().toString());
		 * responseDto.setResponseDescription(serviceFault.getFaultStringOrReason());
		 *
		 * final SoapFault soapFault = serviceFault.getSoapFault(); final
		 * SoapFaultDetail faultDetail = soapFault.getFaultDetail();
		 *
		 * for (final Iterator<SoapFaultDetailElement> detailEntryItr = faultDetail
		 * .getDetailEntries(); detailEntryItr.hasNext();) { final
		 * SoapFaultDetailElement detailEntry = detailEntryItr.next(); final Source
		 * source = detailEntry.getSource();
		 * logger.info("Request for track gps activity " + gson.toJson(accountDto));
		 *
		 * // TODO Once PS adds a namespace declaration to the fault // document
		 * unmarshaller can be used to pull out the error // message // final Object
		 * result = // this.unmarshaller.unmarshal(source);
		 *
		 * }
		 *
		 * TransformerFactory transformerFactory = TransformerFactory.newInstance();
		 * Transformer transformer = null; try { transformer =
		 * transformerFactory.newTransformer(); } catch
		 * (TransformerConfigurationException e) { // TODO Auto-generated catch block
		 * e.printStackTrace(); } DOMResult result = new DOMResult(); try {
		 * transformer.transform(serviceFault.getSoapFault().getSource(), result); }
		 * catch (TransformerException e) { // TODO Auto-generated catch block
		 * e.printStackTrace(); } NodeList nl = ((Document)
		 * result.getNode()).getElementsByTagName("detail");
		 *
		 * }
		 */
		// }

		return responseDto;
	}

	// //
	// @POST
	// @Path("/submitUserImageData")
	// @Produces(MediaType.APPLICATION_JSON)
	// @Consumes(MediaType.APPLICATION_JSON)
	// @OAuthSecurity(enabled = false)
	@RequestMapping(value = "submitNewUserBill", method = RequestMethod.POST)
	public ResponseDto submitUserImageData(AccountDto accountDto) {
		logger.info("Request for submitUserImageData " + gson.toJson(accountDto));
		System.out.println("Request for submitUserImageData- " + accountDto.getFirstName());
		ResponseDto responseDto = new ResponseDto<>();
		responseDto.setResponseCode(RESPONSE_CODE.SUCCESS.getCode());
		responseDto.setResponseDescription(RESPONSE_CODE.SUCCESS.name());
		try {
			keppelConsumerService.submitUserImageData(accountDto);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.info("Respone for submitUserData- " + gson.toJson(responseDto));
		return responseDto;

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
	// @OAuthSecurity(enabled = false)
	public String getDwellingTypes() {
		logger.info("Request info for getDwellingTypes ");
		// logger.warning("Request warning for getDwellingTypes ");
		// logger.log(Level.SEVERE, "Error from subm");
		keppelConsumerService.getDwellingTypes();
		return null;
	}

	@RequestMapping(value = "getPlans", method = RequestMethod.GET)
	public String getRecomendedPlans() {
		logger.info("Request info for getRecomendedPlans ");
		List<CMRECPLAN.Plans> responeList = keppelConsumerService.getRecomendedPlans();
		Gson gson = new Gson();
		String json = gson.toJson(responeList);
		return json;
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
		OutputStream outputStream= facesContext.getResponseStream();
		new GeneratePDF().generatePDF(facesContext,  outputStream, signUpData);
		SendEmailAttachment("123123123", signUpData);
		logger.info("Response data =====================>" + json);
		return json;
	}

	public String SendEmailAttachment(String messageId, AccountDto account) {
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
			message.addRecipient(Message.RecipientType.TO, new InternetAddress("contracts@keppelelectric.com"));
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

					"<b>" + messageId + " </b>" + "<br/><br/>Subscription Plan: " + "<b>" + account.getSelectedPlan()
					+ "</b>" + "<br/><br/>Billing Organisation: " + "<b>Keppel Electric Pte Ltd</b>" +

					"<br/><br/>Bill Reference: " + "<b>" + new Random().nextInt(6) + 1 + " </b>"
					+ "<br/><br/>If you have not provided your SP account number or a scanned copy of your past month bill, fret not! Simply, send it to "
					+ "<a href=sales@keppelelectric.com>sales@keppelelectric.com</a>"
					+ "with your Application Number as the subject title and we will get right on to it!" +

					"<br/><br/> For GIRO (DBS) application, please authorise the payment access through the DBS portal "
					+ "<a href=https://internet-banking.dbs.com.sg/>here</a>" +

					"<br/><br/>" + cantString + " wait to have you onboard!"
					+ "<br/><br/><b><i>Life Just Got Brighter,</i></b>"
					+ "<br/><br/><i>Your Customer Service friend</i>" + "<br/><br/><hr></hr>" + "Application number: "
					+ "<b>" + messageId + " </b>"
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
