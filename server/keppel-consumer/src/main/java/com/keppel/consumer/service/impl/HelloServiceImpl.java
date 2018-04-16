/*package com.keppel.consumer.service.impl;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.Holder;

import org.apache.cxf.configuration.jsse.TLSClientParameters;
import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;
import org.apache.cxf.transport.http.HTTPConduit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.keppel.consumer.model.Account;
import com.keppel.consumer.service.HelloService;
import com.keppel.consumer.service.UserCrudRepository;
import com.oracle.m1mmctr.M1MMCTR;
import com.oracle.m1mmctr.ObjectFactory;
import com.oracle.ouaf.Fault;
import com.oracle.ouaf.spl.xaixapp.xaiserver.m1mmctr.M1MMCTRFault;
import com.oracle.ouaf.spl.xaixapp.xaiserver.m1mmctr.M1MMCTRPortType;
import com.oracle.ouaf.spl.xaixapp.xaiserver.m1mmctr.M1MMCTRService;


@Component
public class HelloServiceImpl implements HelloService {

	@Autowired
	private UserCrudRepository userCrudRepository;
	
	
//	@Autowired
//	private PatientService patientService;

	public String getMessage() {

		List<Account> users = (List<Account>) userCrudRepository.findAll();
		
		
M1MMCTRService m1mmctrService = new M1MMCTRService();
		
		
		
		M1MMCTRPortType m1mmctrPortType = m1mmctrService.getM1MMCTRPort();
		BindingProvider provider = (BindingProvider)m1mmctrPortType;
		// You can set the address per request here
		provider.getRequestContext().put(
		     BindingProvider.ENDPOINT_ADDRESS_PROPERTY,
		     "https://10.21.32.1:6501/ouaf/XAIApp/xaiserver/M1MMCTR");

		

		
		
		provider.getRequestContext().put(
				BindingProvider.USERNAME_PROPERTY,
			     "SYSUSER");
		provider.getRequestContext().put(
				BindingProvider.PASSWORD_PROPERTY,
			     "sysuser00");
		
		Holder<M1MMCTR> holder = new Holder<>();
		M1MMCTR body = new M1MMCTR();
		
		body.setAccountId("1234524322");
		GregorianCalendar c = new GregorianCalendar();
		c.setTime(new Date());
		XMLGregorianCalendar date2 = null;
		try {
			date2 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c);
		} catch (DatatypeConfigurationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		ObjectFactory objectFactory=new ObjectFactory();
		objectFactory.createM1MMCTRActualActionDate(date2);
		body.setActionDt(objectFactory.createM1MMCTRActualActionDate(date2));
		
		
		
		holder.value=body;
		Client client = ClientProxy.getClient(m1mmctrPortType);
		
		HTTPConduit http = (HTTPConduit) client.getConduit();
		
		 String targetAddr = http.getTarget().getAddress().getValue();
		 if (targetAddr.toLowerCase().startsWith("https:")) {
		        TrustManager[] simpleTrustManager = new TrustManager[] { new X509TrustManager() {
		            public void checkClientTrusted(
		                    java.security.cert.X509Certificate[] certs, String authType) {
		            }

		            public void checkServerTrusted(
		                    java.security.cert.X509Certificate[] certs, String authType) {
		            }
		            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
		                return null;
		            }
		        } };
		        TLSClientParameters tlsParams = new TLSClientParameters();
		        tlsParams.setTrustManagers(simpleTrustManager);
		        tlsParams.setDisableCNCheck(true);
		        http.setTlsClientParameters(tlsParams);
		    }
		

		try {
			m1mmctrPortType.m1MMCTR(holder);
		} catch (M1MMCTRFault e) {
			// TODO Auto-generated catch block
			Fault fault = e.getFaultInfo();
			e.printStackTrace();
		}catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		patientService.callKeppleSignUp();

		return "hello!!! ashish spring config working fine---";
	}

}
*/