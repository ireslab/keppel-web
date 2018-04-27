import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { DataShare } from '../../../Utility/data_share.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServiceCall } from '../../../network_layer/web_service_call';
import { Http, Response, Headers } from '@angular/http';
import { CommonServices } from '../../../commom_methods/common_service'
import { Router } from '@angular/router';
import { ApiConstants } from '../../../network_layer/api_constants';

import { GiroPdf } from '../../../Utility/pdfBase64URL.service';

declare var $: any
declare var pdfMake: any
@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css'],
  providers: [GiroPdf]
})
export class UserConfirmationComponent implements OnInit {
  _usderDetailObj;
  termConditionFirst:boolean = false;
  termConditionScnd:boolean = false;
  termConditionThird:boolean = false;
  editDetails:boolean = false;

  constructor(private sbService: SidebarService, private DS: DataShare, private spinner: Ng4LoadingSpinnerService,
    private serverCall: ServiceCall, private http: Http, private commonService: CommonServices,
    private router: Router, private giropdf: GiroPdf) {
      this.DS.usderDetailObj = JSON.parse(window.localStorage.getItem('newUserData'));
      this._usderDetailObj = this.DS.usderDetailObj;
    this.sbService.getSidebar("newUser")
    this.commonService.gotoTopOfView();
  }

  ngOnInit() {
    // this.DS.userDetails.subscribe(
    //   (value) => {
    //     this._usderDetailObj = value
    //     console.log(JSON.stringify(value))
    //     console.log(this._usderDetailObj.selectedPlanObj.plan)
    //   }
    // )
  }
  getPdf() {
    var image1 = this.giropdf.giro1Base64;
    // var image2 = this.giropdf.giro2Base64;
    var docDefinition = {
      content: [
        { image: image1, width: 530 }
        // { image: image2, width: 550 }
      ],
      pageMargins: [30, 25, 25, 30],
      defaultStyle: {
        columnGap: 30,
        color: '#676262',
      }
    };
 
    pdfMake.createPdf(docDefinition).download("Keppel_Electric_Giro_Application_Form_Residential");
  };

  confirmClicked() {
  if(this.termConditionOne && this.termConditionScnd && this.termConditionThird){
    if (navigator.onLine) {
      
      this.spinner.show();
      
      var rqst_json = {
        "icNumber": this.DS.usderDetailObj.icNumber,
        "icNumberType": this.DS.usderDetailObj.icNumberType,
        "paymentMethod": this.DS.usderDetailObj.paymentMethod,
        "premiseType": this.DS.usderDetailObj.premiseType,
        "contractDuration": this._usderDetailObj.selectedPlanObj.contractDuration,//this.DS.usderDetailObj.selectedPlanObj,
        "planType": '',
        "optionalService1": this._usderDetailObj.optionalService1.serviceName,//this.DS.usderDetailObj.optionalService1,
        "optionalService2": this._usderDetailObj.optionalService2.serviceName,//this.DS.usderDetailObj.optionalService2,
        "optionalService3": this._usderDetailObj.optionalService3.serviceName,//this.DS.usderDetailObj.optionalService3,
        "firstName": this.DS.usderDetailObj.firstName,
        "lastName": this.DS.usderDetailObj.lastName,
        "dob": '',
        "gender": "",
        "eMail": this.DS.usderDetailObj.eMail,
        "contactPhoneNumber": this.DS.usderDetailObj.mobileNumber,
        "premiseAddress": this.DS.usderDetailObj.premiseAddress,
        "premiseAddress2": this.DS.usderDetailObj.premiseAddress2,
        "postcode": this.DS.usderDetailObj.postcode,
        "billingAddress": this.DS.usderDetailObj.billingAddress,
        "billingAddress2": this.DS.usderDetailObj.billingAddress2,
        "billingPostalcode": this.DS.usderDetailObj.postcodeBill,
        "ebsOrMSSLAccountNumber": '',
        "serviceStartDate": this.DS.usderDetailObj.serviceStartDate,
        "tenantOrOwner": this.DS.usderDetailObj.tenantOrOwner,
        "applicationId": '',
        "city": "",
        "remarks": "",
        "attachmentData": "",
        "attachmentName": "",
        "promoCode": this.DS.usderDetailObj.promoCode,
        "selectedPlan": this._usderDetailObj.selectedPlanObj.plan,
        "selectedPlanVersion": this._usderDetailObj.selectedPlanObj.version,
        "pastMonthConsumptionDetail": "",
        "marketingEmail": "",
        "marketingPhone": "",
        "marketingSMS": "",
        "TC": "",
        "PDPA": "",
        "securityDeposit":this._usderDetailObj.sd_amount,
        "pdfDotAmount" : this.DS.emaFactSheetData.pdfDotAmount,
        "pdfFppAmount" : this.DS.emaFactSheetData.pdfFppAmount,
        "pdfTier1Amount" : this.DS.emaFactSheetData.pdfTier1Amount,
        "pdfPeakValueT1" : this.DS.emaFactSheetData.pdfPeakValueT1,
        "pdfTier3Amount" : this.DS.emaFactSheetData.pdfTier3Amount,
        "pdfPeakValueT3" : this.DS.emaFactSheetData.pdfPeakValueT3,
        "meterType" : this.DS.meterType,
        "serviceEndDate" : this.DS.usderDetailObj.serviceEndDate,
        "tier1Amount" : this.DS.usderDetailObj.selectedPlanObj.t1,
        "tier2Amount" : this.DS.usderDetailObj.selectedPlanObj.t2, 
        "tier3Amount" : this.DS.usderDetailObj.selectedPlanObj.t3,
        "productMapKeyVal" : this.DS.usderDetailObj.selectedPlanObj.plan
      }
      console.log(rqst_json);
      if (this.DS.usderDetailObj.paymentMethod == 'IDDA (DBS)') {
        window.open('https://internet-banking.dbs.com.sg', '_blank');
      } else if (this.DS.usderDetailObj.paymentMethod == 'Giro') {
        // window.open('https://www.iras.gov.sg/irashome/uploadedFiles/IRASHome/Quick_Links/GIRO_IIT_appln_form.pdf', '_blank');
        this.getPdf();
      }
      this.makeServerCall(rqst_json);
      

    } else {
      alert("Please Check Internet Connection")
    }
  } else {
    if(!this.termConditionFirst){
      alert("Please select Term and Conditions")
      return
    } else if(!this.termConditionScnd)
    {
      alert("Please select EMA Factsheet ")
      return
    } else {
      alert("Please select PDPA")
      return
    }
       
  }
  }


  termConditionOne(event,count){
    if(count == 1)
    {
      if (event.target.checked) 
        this.termConditionFirst = true;
      else 
        this.termConditionFirst = false;   
    } else if(count == 2)
    {
      if (event.target.checked) 
        this.termConditionScnd = true;
      else 
        this.termConditionScnd = false;  
    } else {
      if (event.target.checked) 
        this.termConditionThird = true;
      else 
        this.termConditionThird = false; 
    }
  
  }

  makeServerCall(rqst_json) {
  
    // var localURL = "http://192.168.0.4:7001/keppelconsumer/v1/newResiSignup"  //"http://192.168.0.4:7001/keppelconsumer_2"//"http://192.168.0.4:7001/keppelconsumer/v1/newResiSignup";
    let _url = ApiConstants.NEW_USER_SIGNUP;
    ServiceCall.httpPostCall(rqst_json, _url, this.http).subscribe(
      (data) => {
        console.log(data[0].messageId)
        if (data[0].messageId != '') {
          this.router.navigateByUrl("aknowledgement");
          this.spinner.hide()
        } else {
          alert("Something went wrong");
          this.spinner.hide();
        }
      }, (error: any) => {
        alert('Service Failed')
        this.spinner.hide()
      })
  }
  // S5416486F
}
