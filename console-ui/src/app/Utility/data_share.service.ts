import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataShare {
  // selectedPlanObj:any;
  trackAppNumber:any;
  paperCost:any = 0;
  meterType: string;
  usderDetailObj = {
    "selectedPlanObj": {
      "plan": "",
      "version": "",
      "product": "",
      "startDate": "",
      "contractDuration": '',
      "benefits": "",
      "details": "",
      "chargeType": "",
      "t1": "",
      "t2": "",
      "t3": "",
      "mssBillingCollection": "",
      "mssBasicCharges": "",
      "mssMeterReadingDataManagement": "",
      "marketDevelopmentSystemCharge": "",
      "retailSettlementUplift": "",
      "ami1Phase": "",
      "ami3Phase": "",
      "emcAdminFinal": "",
      "posAdminFinal": "",
      "monthlyEnergyUpliftChargeFinal": "",
      "allocatedRegulationChargeFinal": "",
      "usep": "",
      "heuc": "",
      "vestingCharge": "",
    },
    "sd_amount":"",
    "optionalServiceSelected": "",
    "serviceEndDate" : "",
    "serviceStartDate": "",
    "optionalService1": "",
    "optionalService2": "",
    "optionalService3": "",
    "promoCode": "",
    "paymentMethod": "",
    "icNumberType": "",
    "icNumber": "",
    "mobileNumber": "",
    "firstName": "",
    "lastName": "",
    "eMail": "",
    "postcode": "",
    "streetName": "",
    "block": "",
    "buildingName": "",
    "floorLevel": "",
    "postcodeBill": "",
    "streetNameBill": "",
    "blockBill": "",
    "buildingNameBill": "",
    "floorLevelBill": "",
    "spAccount": "",
    "premiseAddress": "",
    "premiseAddress2": "",
    "billingAddress": "",
    "billingAddress2": "",
    "premiseType": "",
    "tenantOrOwner": "",
    "promocodeAmount":"",
    "marketingConsent":"",
    "marketingEmail":"",
    "marketingSMS":"",
    "attachmentData": "",
    "attachmentName": ""
  }

 

  emaFactSheetData = {
    "pdfDotAmount" :'',
    "pdfFppAmount" : '',
    "pdfTier1Amount" : "",
    "pdfPeakValueT1" : "",
    "pdfTier3Amount" : "",
    "pdfPeakValueT3" : "",
    "selectedRPlan" : ""
  }
  contactUSData = {
    "subject" : "",
    "inquiryType" : "",
    "userName" : "",
    "eMail" : "",
    "mobileNumber" : "",
    "message" : "",
    "firstName" : "",
    "lastName" : ""
  }


  contractDetails = new BehaviorSubject<any>(this.usderDetailObj, );
  userDetails = this.contractDetails.asObservable();

  constructor() { }

  getUserDetails() {
    this.contractDetails.next(this.usderDetailObj)
  }

}