//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.03.31 at 02:26:27 PM IST 
//


package com.keppelCM.CMRETPERMTY;

import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.keppelCM.CMRETPERMTY package. 
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


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.keppelCM.CMRETPERMTY
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
     * Create an instance of {@link CMRETPERMTY }
     * 
     */
    public CMRETPERMTY createCMRETPERMTY() {
        return new CMRETPERMTY();
    }

    /**
     * Create an instance of {@link CMRETPERMTY.Output }
     * 
     */
    public CMRETPERMTY.Output createCMRETPERMTYOutput() {
        return new CMRETPERMTY.Output();
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
     * Create an instance of {@link CMRETPERMTY.Input }
     * 
     */
    public CMRETPERMTY.Input createCMRETPERMTYInput() {
        return new CMRETPERMTY.Input();
    }

    /**
     * Create an instance of {@link CMRETPERMTY.Output.PremiseType }
     * 
     */
    public CMRETPERMTY.Output.PremiseType createCMRETPERMTYOutputPremiseType() {
        return new CMRETPERMTY.Output.PremiseType();
    }

}