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
		webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/webservices/CMRETPERMTY");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}

	@Bean(name = "M1MMCTR")
	public WebServiceTemplate webServiceTemplateM1MMCTR() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerM1MMCTR());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerM1MMCTR());
		webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/webservices/M1MMCTR");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}
	
	@Bean(name = "CMRECPLAN")
	public WebServiceTemplate webServiceTemplateCMRECPLAN() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCMRECPLAN());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCMRECPLAN());
		webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ouaf/webservices/CMRECPLAN");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
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
	
	
	
/*	@Bean(name = "CREATEINCIDENTWS")
	public WebServiceTemplate webServiceTemplateCreateIncident() throws KeyManagementException, NoSuchAlgorithmException {
		WebServiceTemplate webServiceTemplate = new WebServiceTemplate();
		webServiceTemplate.setMarshaller(jaxb2MarshallerCREATEINCIDENTWS());
		webServiceTemplate.setUnmarshaller(jaxb2MarshallerCREATEINCIDENTWS());
//		http://xmlns.oracle.com/Keppel/ServiceCxCreateIncident/CreateIncident
		webServiceTemplate.setDefaultUri("https://10.21.32.1:6501/ServiceCxCreateIncident/CreateIncident");
		webServiceTemplate.setMessageSender(httpsUrlConnectionMessageSender());
		webServiceTemplate.setInterceptors(new ClientInterceptor[] { securityInterceptor() });
		return webServiceTemplate;
	}
	
	@Bean
	Jaxb2Marshaller jaxb2MarshallerCREATEINCIDENTWS() {
		Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
		jaxb2Marshaller.setContextPath("com.keppelCI.CreateIncident");

		return jaxb2Marshaller;
	}*/

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
