package com.keppel.consumer.config;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import org.apache.wss4j.dom.WSConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.client.support.interceptor.ClientInterceptor;
import org.springframework.ws.soap.security.wss4j2.Wss4jSecurityInterceptor;
import org.springframework.ws.transport.http.HttpsUrlConnectionMessageSender;
import com.google.gson.Gson;

@Configuration
public class KeppelWebServiceConfig {

	@Bean(name = "CMRETPERMTY")
	public WebServiceTemplate webServiceTemplateCMRETPERMTY() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCMRETPERMTY());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCMRETPERMTY());
		webServiceTemplate.setDefaultUri("https://10.21.32.10:6501/ccbsit/webservices/CMRETPERMTY?wsdl");
		//webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/webservices/CMRETPERMTY?wsdl");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}

	@Bean(name = "M1MMCTR")
	public WebServiceTemplate webServiceTemplateM1MMCTR() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerM1MMCTR());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerM1MMCTR());
		webServiceTemplate.setDefaultUri("https://10.21.32.10:6501/ccbsit/webservices/M1MMCTR?wsdl");
		//webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/webservices/M1MMCTR?wsdl");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}
	
	@Bean(name = "CMRECPLAN")
	public WebServiceTemplate webServiceTemplateCMRECPLAN() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCMRECPLAN());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCMRECPLAN());
		webServiceTemplate.setDefaultUri("https://10.21.32.10:6501/ccbsit/webservices/CMRECPLAN?wsdl");
		//webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/webservices/CMRECPLAN?wsdl");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}
	
	@Bean(name = "CMRET")
	public WebServiceTemplate webServiceTemplateCMRET() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCMRET());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCMRET());
		webServiceTemplate.setDefaultUri("https://10.21.32.10:6501/ccbsit/webservices/CM-RetSDAmt?wsdl");
		//webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/webservices/CM-RetSDAmt?wsdl");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}
	
	@Bean(name = "CMPROMO")
	public WebServiceTemplate webServiceTemplateCMPROMO() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCMPROMO());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCMPROMO());
		webServiceTemplate.setDefaultUri("https://10.21.32.10:6501/ccbsit/webservices/CmPromotionCodeGenerationBS?wsdl");
		//webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/CmPromotionCodeGenerationBS?wsdl");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}
	
	@Bean(name = "CMRMS")
	public WebServiceTemplate webServiceTemplateCMRMS() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCMRMS());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCMRMS());
		webServiceTemplate.setDefaultUri("https://10.21.32.10:6501/ccbsit/webservices/CM-RetMsgStatus?wsdl");
		//webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/CM-RetMsgStatus?wsdl");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}
	
	@Bean(name = "CI")
	public WebServiceTemplate webServiceTemplateCI() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCI());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCI());
		webServiceTemplate.setDefaultUri("http://10.21.32.5:8001/soa-infra/services/default/ServiceCxCreateIncident/createincident_client_ep?wsdl");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		Wss4jSecurityInterceptor wss4jSecurityInterceptor = new Wss4jSecurityInterceptor();
		wss4jSecurityInterceptor.setValidateRequest(false);
		wss4jSecurityInterceptor.setValidateResponse(false);
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { wss4jSecurityInterceptor });
		return webServiceTemplate;
	}
	
	

	@Bean
	Jaxb2Marshaller jaxb2MarshallerCMRETPERMTY() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelCM.CMRETPERMTY");
		return jaxb2Marshaller;
	}

	@Bean
	Jaxb2Marshaller jaxb2MarshallerM1MMCTR() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelM1.M1MMCTR");
		return jaxb2Marshaller;
	}
	
	@Bean
	Jaxb2Marshaller jaxb2MarshallerCMRECPLAN() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelCMR.CMRECPLAN");
		return jaxb2Marshaller;
	}
	
	@Bean
	Jaxb2Marshaller jaxb2MarshallerCMRET() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelCMRET.CMRetSDAmt");
		return jaxb2Marshaller;
	}
	
	@Bean
	Jaxb2Marshaller jaxb2MarshallerCMPROMO() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelCMPROMO.CmPromotionCodeGenerationBS");
		return jaxb2Marshaller;
	}
	
	@Bean
	Jaxb2Marshaller jaxb2MarshallerCMRMS() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelCMRMS.CMRetMsgStatus");
		return jaxb2Marshaller;
	}
	
	@Bean
	Jaxb2Marshaller jaxb2MarshallerCI() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelCI.CreateIncident");
		return jaxb2Marshaller;
	}
	
	
	@Bean
	public Wss4jSecurityInterceptor securityInterceptor() {
		Wss4jSecurityInterceptor wss4jSecurityInterceptor = new Wss4jSecurityInterceptor();
		wss4jSecurityInterceptor.setSecurementActions("Timestamp UsernameToken");
		wss4jSecurityInterceptor.setSecurementUsername("SYSUSER");
		wss4jSecurityInterceptor.setSecurementPassword("sysuser00");
		wss4jSecurityInterceptor.setSecurementPasswordType(WSConstants.PW_TEXT);
		wss4jSecurityInterceptor.setValidateRequest(false);
		wss4jSecurityInterceptor.setValidateResponse(false);
		return wss4jSecurityInterceptor;
	}

	@Bean
	public HttpsUrlConnectionMessageSender httpsUrlConnectionMessageSender()
			throws KeyManagementException, NoSuchAlgorithmException {

		HttpsUrlConnectionMessageSender sender = new HttpsUrlConnectionMessageSender();

		TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			public void checkClientTrusted(X509Certificate[] certs, String authType) {
			}

			public void checkServerTrusted(X509Certificate[] certs, String authType) {
			}
		} };
		sender.setTrustManagers(trustAllCerts);

		sender.setHostnameVerifier(new HostnameVerifier() {

			@Override
			public boolean verify(String hostname, SSLSession session) {
				// TODO Auto-generated method stub
				return true;
			}
		});

		return sender;
	}

	@Bean
	public Gson gson() {
		return new Gson();
	}
}
