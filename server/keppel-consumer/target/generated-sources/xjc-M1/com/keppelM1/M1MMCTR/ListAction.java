//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.03.31 at 02:26:28 PM IST 
//


package com.keppelM1.M1MMCTR;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for listAction.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="listAction"&gt;
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}token"&gt;
 *     &lt;enumeration value="delete"/&gt;
 *     &lt;enumeration value="add"/&gt;
 *     &lt;enumeration value="update"/&gt;
 *   &lt;/restriction&gt;
 * &lt;/simpleType&gt;
 * </pre>
 * 
 */
@XmlType(name = "listAction")
@XmlEnum
public enum ListAction {

    @XmlEnumValue("delete")
    DELETE("delete"),
    @XmlEnumValue("add")
    ADD("add"),
    @XmlEnumValue("update")
    UPDATE("update");
    private final String value;

    ListAction(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static ListAction fromValue(String v) {
        for (ListAction c: ListAction.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
