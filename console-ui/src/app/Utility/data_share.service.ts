import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataShare {
  selectedPlanObj:any;
  usderDetailObj = {
    "selectedPlanObj":this.selectedPlanObj,
    "serviceStartDate": "",
    "optionalService1": "",
    "optionalService2": "",
    "optionalService3": "",
    "promoCode": "",
    "paymentMethod": "",
    "icNumberType": "",
    "icNumber": "",
    "mobileNumber":"",
    "firstName": "",
    "lastName": "",
    "eMail": "",
    "postcode": "",
    "streetName":"",
    "block":"",
    "buildingName":"",
    "floorLevel":"",
    "postcodeBill": "",
    "streetNameBill":"",
    "blockBill":"",
    "buildingNameBill":"",
    "floorLevelBill":"",

    "premiseAddress": "",
    "premiseAddress2": "",
    
    "billingAddress": "",
    "billingAddress2": "",
    
    "tenantOrOwner": "",
  }


  contractDetails = new BehaviorSubject<any>(this.usderDetailObj,);
  userDetails = this.contractDetails.asObservable();

  constructor() { }

  getUserDetails() {
    this.contractDetails.next(this.usderDetailObj)
  }

}