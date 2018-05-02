import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataShare {
  // selectedPlanObj:any;
  paperCost:any = 0;
  meterType: string;
  usderDetailObj = {
    "selectedPlanObj": {
      "plan": "DOT12",
      "version": "1",
      "product": "DOT-TLF",
      "startDate": "2017-11-29",
      "contractDuration": 12,
      "benefits": "12 Months, 19% Discount Off SP Tariff, Loss Adjusted Consumption",
      "details": "Allows Greater Savings",
      "chargeType": "%",
      "t1": "19",
      "t2": "19",
      "t3": "19",
      "mssBillingCollection": "false",
      "mssBasicCharges": "false",
      "mssMeterReadingDataManagement": "false",
      "marketDevelopmentSystemCharge": "false",
      "retailSettlementUplift": "false",
      "ami1Phase": "true",
      "ami3Phase": "true",
      "emcAdminFinal": "false",
      "posAdminFinal": "false",
      "monthlyEnergyUpliftChargeFinal": "false",
      "allocatedRegulationChargeFinal": "false",
      "usep": "false",
      "heuc": "false",
      "vestingCharge": "false",
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


  contractDetails = new BehaviorSubject<any>(this.usderDetailObj, );
  userDetails = this.contractDetails.asObservable();

  constructor() { }

  getUserDetails() {
    this.contractDetails.next(this.usderDetailObj)
  }

}