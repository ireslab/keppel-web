//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.04.02 at 03:03:59 PM IST 
//


package com.keppelM1.M1MMCTR;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.keppelM1.M1MMCTR package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _M1MMCTRCreationDateTime_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "creationDateTime");
    private final static QName _M1MMCTRStatusUpdateDateTime_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "statusUpdateDateTime");
    private final static QName _M1MMCTRActionDt_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "actionDt");
    private final static QName _M1MMCTRActualActionDate_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "actualActionDate");
    private final static QName _M1MMCTRTransactionDetailsTransactionDataReceivedVAck_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "receivedVAck");
    private final static QName _M1MMCTRTransactionDetailsTransactionDataReceivedNewADR_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "receivedNewADR");
    private final static QName _M1MMCTRTransactionDetailsTransactionDataReceivedChangeComplete_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "receivedChangeComplete");
    private final static QName _M1MMCTRTransactionDetailsTransactionDataReceivedNewCPN_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "receivedNewCPN");
    private final static QName _M1MMCTRTransactionDetailsTransactionDataReceivedInTTN_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "receivedInTTN");
    private final static QName _M1MMCTRTransactionDetailsTransactionDataIsMassCTR_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "isMassCTR");
    private final static QName _M1MMCTRTransactionDetailsTransactionDataIsVCreated_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "isVCreated");
    private final static QName _M1MMCTRSendDetailsRequestDataConsumerTransferActionDate_QNAME = new QName("http://ouaf.oracle.com/webservices/cm/M1MMCTR", "ActionDate");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.keppelM1.M1MMCTR
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link Fault }
     * 
     */
    public Fault createFault() {
        return new Fault();
    }

    /**
     * Create an instance of {@link M1MMCTR }
     * 
     */
    public M1MMCTR createM1MMCTR() {
        return new M1MMCTR();
    }

    /**
     * Create an instance of {@link M1MMCTR.RelatedMessageGroup }
     * 
     */
    public M1MMCTR.RelatedMessageGroup createM1MMCTRRelatedMessageGroup() {
        return new M1MMCTR.RelatedMessageGroup();
    }

    /**
     * Create an instance of {@link M1MMCTR.TransactionDetails }
     * 
     */
    public M1MMCTR.TransactionDetails createM1MMCTRTransactionDetails() {
        return new M1MMCTR.TransactionDetails();
    }

    /**
     * Create an instance of {@link M1MMCTR.SendDetails }
     * 
     */
    public M1MMCTR.SendDetails createM1MMCTRSendDetails() {
        return new M1MMCTR.SendDetails();
    }

    /**
     * Create an instance of {@link M1MMCTR.SendDetails.RequestData }
     * 
     */
    public M1MMCTR.SendDetails.RequestData createM1MMCTRSendDetailsRequestData() {
        return new M1MMCTR.SendDetails.RequestData();
    }

    /**
     * Create an instance of {@link M1MMCTR.ReceiveDetails }
     * 
     */
    public M1MMCTR.ReceiveDetails createM1MMCTRReceiveDetails() {
        return new M1MMCTR.ReceiveDetails();
    }

    /**
     * Create an instance of {@link M1MMCTR.ReceiveDetails.ReceiveData }
     * 
     */
    public M1MMCTR.ReceiveDetails.ReceiveData createM1MMCTRReceiveDetailsReceiveData() {
        return new M1MMCTR.ReceiveDetails.ReceiveData();
    }

    /**
     * Create an instance of {@link Fault.ResponseData }
     * 
     */
    public Fault.ResponseData createFaultResponseData() {
        return new Fault.ResponseData();
    }

    /**
     * Create an instance of {@link Fault.ServerMessage }
     * 
     */
    public Fault.ServerMessage createFaultServerMessage() {
        return new Fault.ServerMessage();
    }

    /**
     * Create an instance of {@link M1MMCTR.RelatedMessageGroup.RelatedMessages }
     * 
     */
    public M1MMCTR.RelatedMessageGroup.RelatedMessages createM1MMCTRRelatedMessageGroupRelatedMessages() {
        return new M1MMCTR.RelatedMessageGroup.RelatedMessages();
    }

    /**
     * Create an instance of {@link M1MMCTR.TransactionDetails.TransactionData }
     * 
     */
    public M1MMCTR.TransactionDetails.TransactionData createM1MMCTRTransactionDetailsTransactionData() {
        return new M1MMCTR.TransactionDetails.TransactionData();
    }

    /**
     * Create an instance of {@link M1MMCTR.SendDetails.RequestData.ConsumerTransfer }
     * 
     */
    public M1MMCTR.SendDetails.RequestData.ConsumerTransfer createM1MMCTRSendDetailsRequestDataConsumerTransfer() {
        return new M1MMCTR.SendDetails.RequestData.ConsumerTransfer();
    }

    /**
     * Create an instance of {@link M1MMCTR.ReceiveDetails.ReceiveData.ReceiveDetail }
     * 
     */
    public M1MMCTR.ReceiveDetails.ReceiveData.ReceiveDetail createM1MMCTRReceiveDetailsReceiveDataReceiveDetail() {
        return new M1MMCTR.ReceiveDetails.ReceiveData.ReceiveDetail();
    }

    /**
     * Create an instance of {@link M1MMCTR.ReceiveDetails.ReceiveData.ConsumerTransfer }
     * 
     */
    public M1MMCTR.ReceiveDetails.ReceiveData.ConsumerTransfer createM1MMCTRReceiveDetailsReceiveDataConsumerTransfer() {
        return new M1MMCTR.ReceiveDetails.ReceiveData.ConsumerTransfer();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "creationDateTime", scope = M1MMCTR.class)
    public JAXBElement<XMLGregorianCalendar> createM1MMCTRCreationDateTime(XMLGregorianCalendar value) {
        return new JAXBElement<XMLGregorianCalendar>(_M1MMCTRCreationDateTime_QNAME, XMLGregorianCalendar.class, M1MMCTR.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "statusUpdateDateTime", scope = M1MMCTR.class)
    public JAXBElement<XMLGregorianCalendar> createM1MMCTRStatusUpdateDateTime(XMLGregorianCalendar value) {
        return new JAXBElement<XMLGregorianCalendar>(_M1MMCTRStatusUpdateDateTime_QNAME, XMLGregorianCalendar.class, M1MMCTR.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "actionDt", scope = M1MMCTR.class)
    public JAXBElement<XMLGregorianCalendar> createM1MMCTRActionDt(XMLGregorianCalendar value) {
        return new JAXBElement<XMLGregorianCalendar>(_M1MMCTRActionDt_QNAME, XMLGregorianCalendar.class, M1MMCTR.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "actualActionDate", scope = M1MMCTR.class)
    public JAXBElement<XMLGregorianCalendar> createM1MMCTRActualActionDate(XMLGregorianCalendar value) {
        return new JAXBElement<XMLGregorianCalendar>(_M1MMCTRActualActionDate_QNAME, XMLGregorianCalendar.class, M1MMCTR.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "receivedVAck", scope = M1MMCTR.TransactionDetails.TransactionData.class, defaultValue = "false")
    public JAXBElement<Boolean> createM1MMCTRTransactionDetailsTransactionDataReceivedVAck(Boolean value) {
        return new JAXBElement<Boolean>(_M1MMCTRTransactionDetailsTransactionDataReceivedVAck_QNAME, Boolean.class, M1MMCTR.TransactionDetails.TransactionData.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "receivedNewADR", scope = M1MMCTR.TransactionDetails.TransactionData.class, defaultValue = "false")
    public JAXBElement<Boolean> createM1MMCTRTransactionDetailsTransactionDataReceivedNewADR(Boolean value) {
        return new JAXBElement<Boolean>(_M1MMCTRTransactionDetailsTransactionDataReceivedNewADR_QNAME, Boolean.class, M1MMCTR.TransactionDetails.TransactionData.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "receivedChangeComplete", scope = M1MMCTR.TransactionDetails.TransactionData.class, defaultValue = "false")
    public JAXBElement<Boolean> createM1MMCTRTransactionDetailsTransactionDataReceivedChangeComplete(Boolean value) {
        return new JAXBElement<Boolean>(_M1MMCTRTransactionDetailsTransactionDataReceivedChangeComplete_QNAME, Boolean.class, M1MMCTR.TransactionDetails.TransactionData.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "receivedNewCPN", scope = M1MMCTR.TransactionDetails.TransactionData.class, defaultValue = "false")
    public JAXBElement<Boolean> createM1MMCTRTransactionDetailsTransactionDataReceivedNewCPN(Boolean value) {
        return new JAXBElement<Boolean>(_M1MMCTRTransactionDetailsTransactionDataReceivedNewCPN_QNAME, Boolean.class, M1MMCTR.TransactionDetails.TransactionData.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "receivedInTTN", scope = M1MMCTR.TransactionDetails.TransactionData.class, defaultValue = "false")
    public JAXBElement<Boolean> createM1MMCTRTransactionDetailsTransactionDataReceivedInTTN(Boolean value) {
        return new JAXBElement<Boolean>(_M1MMCTRTransactionDetailsTransactionDataReceivedInTTN_QNAME, Boolean.class, M1MMCTR.TransactionDetails.TransactionData.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "isMassCTR", scope = M1MMCTR.TransactionDetails.TransactionData.class, defaultValue = "false")
    public JAXBElement<Boolean> createM1MMCTRTransactionDetailsTransactionDataIsMassCTR(Boolean value) {
        return new JAXBElement<Boolean>(_M1MMCTRTransactionDetailsTransactionDataIsMassCTR_QNAME, Boolean.class, M1MMCTR.TransactionDetails.TransactionData.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "isVCreated", scope = M1MMCTR.TransactionDetails.TransactionData.class, defaultValue = "false")
    public JAXBElement<Boolean> createM1MMCTRTransactionDetailsTransactionDataIsVCreated(Boolean value) {
        return new JAXBElement<Boolean>(_M1MMCTRTransactionDetailsTransactionDataIsVCreated_QNAME, Boolean.class, M1MMCTR.TransactionDetails.TransactionData.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link XMLGregorianCalendar }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://ouaf.oracle.com/webservices/cm/M1MMCTR", name = "ActionDate", scope = M1MMCTR.SendDetails.RequestData.ConsumerTransfer.class)
    public JAXBElement<XMLGregorianCalendar> createM1MMCTRSendDetailsRequestDataConsumerTransferActionDate(XMLGregorianCalendar value) {
        return new JAXBElement<XMLGregorianCalendar>(_M1MMCTRSendDetailsRequestDataConsumerTransferActionDate_QNAME, XMLGregorianCalendar.class, M1MMCTR.SendDetails.RequestData.ConsumerTransfer.class, value);
    }

}
