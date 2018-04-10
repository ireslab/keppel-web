import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { DataShare } from '../../../Utility/data_share.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidateNric } from '../../../Utility/nric_validatior';
import { Router } from '@angular/router';
import { CommonServices } from '../../../commom_methods/common_service';
import { ServiceCall } from '../../../network_layer/web_service_call';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { element } from 'protractor';


declare var $: any
@Component({
  selector: 'app-user-contract',
  templateUrl: './user-contract.component.html',
  styleUrls: ['./user-contract.component.css']
})
export class UserContractComponent implements OnInit {
  contractForm: FormGroup;

  optionalServices = [];
  selectedOptionalServices = [];
  tenantOrOwner: string = this.datashare.usderDetailObj.tenantOrOwner;
  paymentMethod: string = this.datashare.usderDetailObj.paymentMethod;
  paymentMessage: boolean = false;
  ownershipMessage: boolean = false;
  sameAddress: boolean = true;
  postcodeBilling: string;
  billingAddress: string;
  billingAddress2: string;
  formIsNotValid: boolean = false;
  postalError: boolean = false;
  postalBillError: boolean = false;
  optionalServiceOne:any;
  optionalServiceTwo:any;
  optionalServiceThree:any;

  _postcode: string = '';
  _streetName: string = '';
  _block: string = '';
  _buildingName: string = '';
  _floorLevel: string = '';

  constructor(private sbService: SidebarService, private datashare: DataShare, private fb: FormBuilder,
    private router: Router, private commonService: CommonServices, private serverCall: ServiceCall, 
    private spinnerService: Ng4LoadingSpinnerService) {
    this.sbService.getSidebar("newUser");
    this.commonService.gotoTopOfView()
    
    this.optionalServices = [
      { "serviceName": "vas#1", "serviceCost": "1" },
      { "serviceName": "vas#2", "serviceCost": "2" },
      { "serviceName": "vas#3", "serviceCost": "3" },
    ]
    this.optionalServiceOne = { "serviceName": "vas#1", "serviceCost": "1" };
    this.optionalServiceTwo = { "serviceName": "vas#2", "serviceCost": "2" };
    this.optionalServiceThree = { "serviceName": "vas#3", "serviceCost": "3" };

  }

  // selectedServices(optService) {
  //   if (this.selectedOptionalServices.indexOf(optService) == -1) {
  //     this.selectedOptionalServices.push(optService)
  //   } else {
  //     this.selectedOptionalServices.splice(this.selectedOptionalServices.indexOf(optService), 1);
  //   }
  //   console.log(this.selectedOptionalServices);
  // }
  selectedServices(index){
    if(index == 1){
      if(this.datashare.usderDetailObj.optionalService1 != ""){
        this.datashare.usderDetailObj.optionalService1 = ""
      } else {
        this.datashare.usderDetailObj.optionalService1 = this.optionalServiceOne
      }
      
    } else if(index == 2){
      if(this.datashare.usderDetailObj.optionalService1 != ""){
        this.datashare.usderDetailObj.optionalService2 = ""
      } else {
        this.datashare.usderDetailObj.optionalService2 = this.optionalServiceTwo
      }
    } else {
      if(this.datashare.usderDetailObj.optionalService3 != ""){
        this.datashare.usderDetailObj.optionalService3 = ""
      } else {
        this.datashare.usderDetailObj.optionalService3 = this.optionalServiceThree
      }
    }
  }
  showSelectedOptService(){
    if(this.datashare.usderDetailObj.optionalService1 != ""){
      document.getElementById("btnOne").className = 'btn btn-lg btn-block btn-secondary selectOptionalSvcsButton btn-Option selected';
    }
    if(this.datashare.usderDetailObj.optionalService2 != ""){
      document.getElementById("btnTwo").className = 'btn btn-lg btn-block btn-secondary selectOptionalSvcsButton btn-Option selected';
    }
    if(this.datashare.usderDetailObj.optionalService3 != ""){
      document.getElementById("btnThree").className = 'btn btn-lg btn-block btn-secondary selectOptionalSvcsButton btn-Option selected';
    }

  }



  ngOnInit() {
    this.showSelectedOptService();

    this.contractForm = this.fb.group({
      serviceStartDate: [this.datashare.usderDetailObj.serviceStartDate, Validators.required],
      promoCode: [this.datashare.usderDetailObj.promoCode, [Validators.pattern('[A-Za-z0-9]*$')]],
      icNumberType: [this.datashare.usderDetailObj.icNumberType, Validators.required],
      icNumber: [this.datashare.usderDetailObj.icNumber, [Validators.required, ValidateNric]],
      firstName: [this.datashare.usderDetailObj.firstName, [Validators.required, Validators.pattern('[A-Za-z][A-Za-z ]*$')]],
      lastName: [this.datashare.usderDetailObj.lastName, [Validators.required, Validators.pattern('[A-Za-z][A-Za-z ]*$')]],
      eMail: [this.datashare.usderDetailObj.eMail, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i)]],
      postcode: [this.datashare.usderDetailObj.postcode, [Validators.required, Validators.pattern('[0-9]{6}$')]],
      streetName: [this.datashare.usderDetailObj.streetName, Validators.required],
      block: [this.datashare.usderDetailObj.block, Validators.required],
      buildingName: this.datashare.usderDetailObj.buildingName,
      floorLevel: [this.datashare.usderDetailObj.floorLevel, Validators.required],
      postcodeBill: this.datashare.usderDetailObj.postcodeBill,
      streetNameBill: this.datashare.usderDetailObj.streetNameBill,
      blockBill: this.datashare.usderDetailObj.blockBill,
      buildingNameBill: this.datashare.usderDetailObj.buildingNameBill,
      floorLevelBill: this.datashare.usderDetailObj.floorLevelBill,
    })


    $(document).ready(function () {
      $(".selectPaymentMethodButton").on("click", function () {
        $(".selectPaymentMethodButton").removeClass("selected");
        $(this).toggleClass("selected");
      });

      $(".selectOwnerTypeButton").on("click", function () {
        $(".selectOwnerTypeButton").removeClass("selected");
        $(this).toggleClass("selected");
      });

      $(".selectOptionalSvcsButton").on("click", function () {
        $(this).toggleClass("selected");
      });

      $(".modal_imgBtn").on("click", function () {
        $(".modal_imgBtn").removeClass("On");
        $(this).toggleClass("On");
      });

      $("#bool_isSameBillingAddress").change(function () {
        /*var ischecked = $(this).is(':checked');
        if (!ischecked)
            alert('uncheckd ' + $(this).val());*/
        $("#BillingAddress").toggle();
      });

      $("#AddNewPremiseButton").click(function () {
        $(".PremiseInfo").clone().appendTo(".PremiseSection");
      });

      $(".PanelRevealButton, .PanelClose-Top, .PanelClose-Bottom").click(function () {
        TogglePanel();
      });

      $(".kpl-SummaryCallout").on("click", function () {
        if ($(window).width() < 1200) {
          TogglePanel();
        } else return
      });

      $(document).on("scroll", function () {

        if ($(window).width() <= 1200) {
          //
        } else {
          var mainContentTopMargin = 180;
          var PanelHeight = $('.kpl-SummaryCallout').outerHeight() + $('.PremiseInfo').outerHeight();
          var endPos = mainContentTopMargin + PanelHeight;
          var triggerPosFixed = endPos - $(window).height();
          console.log(triggerPosFixed);

          if (pageYOffset >= triggerPosFixed) {
            $(".PremiseSection").css("position", "fixed");
            $(".PremiseSection").css("bottom", "0px");
          }
          if (pageYOffset < triggerPosFixed) {
            $(".PremiseSection").css("position", "absolute");
            $(".PremiseSection").css("bottom", "auto");
          }
        }
      });

    });
    function TogglePanel() {
      $(".kpl-SummaryCallout, .PremiseInfo, .PanelRevealButton").toggle();
    }


  }
  // <<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>
  findSameAddress(e) {
    if (e.target.checked) {
      this.sameAddress = true
    } else {
      this.sameAddress = false;
      this.contractForm.controls['postcodeBill'].reset();
      this.contractForm.controls['streetNameBill'].reset();
      this.contractForm.controls['blockBill'].reset();
      this.contractForm.controls['buildingNameBill'].reset();
      this.contractForm.controls['floorLevelBill'].reset();
      this.contractForm.controls['postcodeBill'].setValidators([Validators.required]);
      this.contractForm.controls['streetNameBill'].setValidators([Validators.required]);
      this.contractForm.controls['blockBill'].setValidators([Validators.required]);
      this.contractForm.controls['buildingNameBill'].setValidators([Validators.required]);
      this.contractForm.controls['floorLevelBill'].setValidators([Validators.required]);
      this.contractForm.controls['postcodeBill'].updateValueAndValidity();
      this.contractForm.controls['streetNameBill'].updateValueAndValidity();
      this.contractForm.controls['blockBill'].updateValueAndValidity();
      this.contractForm.controls['buildingNameBill'].updateValueAndValidity();
      this.contractForm.controls['floorLevelBill'].updateValueAndValidity();
    }
  }

  getPayment(paymentMethod) {
    this.paymentMessage = false;
    this.paymentMethod = paymentMethod
  }
  getOwnership(ownership) {
    this.ownershipMessage = false;
    this.tenantOrOwner = ownership
  }

  getAddressPostcode(e) {
    this.postalError = false;
    let _postCode = e.target.value
    if (_postCode.length != 6) {
      return;
    } else {
      this.spinnerService.show();
      let _url = "https://developers.onemap.sg/commonapi/search?searchVal=" + _postCode + "&returnGeom=N&getAddrDetails=Y&pageNum=1";
      console.log(_url)
      this.serverCall.getPlans(_url).subscribe(
        data => {
          if (data.found == 0) {
            this.postalError = true;
            let address = data.results[0];
            this.contractForm.patchValue({
              streetName: "",
              block: "",
              buildingName: "",
              floorLevel: ""
            })
            return;
          } else {
            let address = data.results[0];
            this.contractForm.patchValue({
              streetName: address.ROAD_NAME,
              block: address.BLK_NO,
              buildingName: address.BUILDING,
              floorLevel: '',
            })
          }
          this.spinnerService.hide();
        }, (error: any) => {
          this.spinnerService.hide();
          alert("error")
        }
      );
    }
  }
  getAddressPostcodeBill(e) {
    this.postalBillError = false;
    let _postCode = e.target.value
    if (_postCode.length != 6) {
      return;
    } else {
      this.spinnerService.show();
      let _url = "https://developers.onemap.sg/commonapi/search?searchVal=" + _postCode + "&returnGeom=N&getAddrDetails=Y&pageNum=1";
      console.log(_url)
      this.serverCall.getPlans(_url).subscribe(
        data => {
          if (data.found == 0) {
            this.postalBillError = true;
            let address = data.results[0];
            this.contractForm.patchValue({
              streetNameBill: "",
              blockBill: "",
              buildingNameBill: "",
              floorLevelBill: "",
            })
            return;
          } else {
            let address = data.results[0];
            this.contractForm.patchValue({
              streetNameBill: address.ROAD_NAME,
              blockBill: address.BLK_NO,
              buildingNameBill: address.BUILDING,
              floorLevelBill: '',
            })
          }
          this.spinnerService.hide();
        }, (error: any) => {
          this.spinnerService.hide();
          alert("error")
        }
      );
    }
  }

  submitContractDetails() {
    this.formIsNotValid = false;
    if (this.contractForm.invalid) {
      for (let control in this.contractForm.controls) {
        this.contractForm.get(control).markAsTouched();
        this.contractForm.get(control).invalid;
        this.contractForm.get(control).updateValueAndValidity();
      }
      this.formIsNotValid = true;
      console.error("form is not valid")
      return;
    } else if (this.paymentMethod == "") {
      this.paymentMessage = true;
      return;
    } else if (this.tenantOrOwner == "") {
      this.ownershipMessage = true;
      return;
    } else {
      let optionalService1 = "";
      let optionalService2 = "";
      let optionalService3 = "";

      if (this.selectedOptionalServices.length > 0) {
        for (let i = 0; i < this.selectedOptionalServices.length; i++) {
          if (i == 0) {
            optionalService1 = this.selectedOptionalServices[i]
          } else if (i == 1) {
            optionalService2 = this.selectedOptionalServices[i]
          } else {
            optionalService3 = this.selectedOptionalServices[i]
          }
        }

      }
      
      let postcode = this.contractForm.controls['postcode'].value
      let premiseAddress = this.contractForm.controls['block'].value + " " + " " + this.contractForm.controls['streetName'].value;
      let premiseAddress2 = this.contractForm.controls['buildingName'].value + " " + " " +  this.contractForm.controls['floorLevel'].value + " " + " " + " SINGAPORE " + " " + " " + postcode;

      if (this.sameAddress == true) {
        this.postcodeBilling = postcode;
        this.billingAddress = premiseAddress;
        this.billingAddress2 = premiseAddress2;
      } else {
        this.postcodeBilling = this.contractForm.controls['postcodeBill'].value;
        this.billingAddress = this.contractForm.controls['blockBill'].value + " " + " " + this.contractForm.controls['streetNameBill'].value;
        this.billingAddress2 = this.contractForm.controls['buildingNameBill'].value + " " + " " + this.contractForm.controls['floorLevelBill'].value + " " +" "+" SINGAPORE " + " " +" "+ this.postcodeBilling;
      }

      this.datashare.usderDetailObj.serviceStartDate = this.contractForm.controls['serviceStartDate'].value;
      // this.datashare.usderDetailObj.optionalService1 = optionalService1;
      // this.datashare.usderDetailObj.optionalService2 = optionalService2;
      // this.datashare.usderDetailObj.optionalService3 = optionalService3;
      this.datashare.usderDetailObj.promoCode = this.contractForm.controls['promoCode'].value;
      this.datashare.usderDetailObj.paymentMethod = this.paymentMethod;
      this.datashare.usderDetailObj.icNumberType = this.contractForm.controls['icNumberType'].value;
      this.datashare.usderDetailObj.icNumber = this.contractForm.controls['icNumber'].value;
      this.datashare.usderDetailObj.firstName = this.contractForm.controls['firstName'].value;
      this.datashare.usderDetailObj.lastName = this.contractForm.controls['lastName'].value;
      this.datashare.usderDetailObj.eMail = this.contractForm.controls['eMail'].value;
      this.datashare.usderDetailObj.postcode = this.contractForm.controls['postcode'].value;
      this.datashare.usderDetailObj.streetName = this.contractForm.controls['streetName'].value;
      this.datashare.usderDetailObj.block = this.contractForm.controls['block'].value;
      this.datashare.usderDetailObj.buildingName = this.contractForm.controls['buildingName'].value;
      this.datashare.usderDetailObj.floorLevel = this.contractForm.controls['floorLevel'].value;
      this.datashare.usderDetailObj.postcodeBill = this.postcodeBilling;
      this.datashare.usderDetailObj.streetNameBill = this.contractForm.controls['streetNameBill'].value;
      this.datashare.usderDetailObj.blockBill = this.contractForm.controls['blockBill'].value;
      this.datashare.usderDetailObj.buildingNameBill = this.contractForm.controls['buildingNameBill'].value;
      this.datashare.usderDetailObj.floorLevelBill = this.contractForm.controls['floorLevelBill'].value;

      this.datashare.usderDetailObj.premiseAddress = premiseAddress;
      this.datashare.usderDetailObj.premiseAddress2 = premiseAddress2;

      this.datashare.usderDetailObj.billingAddress = this.billingAddress;
      this.datashare.usderDetailObj.billingAddress2 = this.billingAddress2;

      this.datashare.usderDetailObj.tenantOrOwner = this.tenantOrOwner;
      this.datashare.getUserDetails();
      this.router.navigateByUrl("new-user-confirmation");
      // let reqJson = JSON.stringify({
      //   "serviceStartDate": this.contractForm.controls['serviceStartDate'].value,
      //   "optionalService1": optionalService1,
      //   "optionalService2": optionalService2,
      //   "optionalService3": optionalService3,
      //   "promoCode": this.contractForm.controls['promoCode'].value,
      //   "paymentMethod": this.paymentMethod,
      //   "icNumberType": this.contractForm.controls['icNumberType'].value,
      //   "icNumber": this.contractForm.controls['icNumber'].value,
      //   "firstName": this.contractForm.controls['firstName'].value,
      //   "lastName": this.contractForm.controls['lastName'].value,
      //   "eMail": this.contractForm.controls['eMail'].value,
      //   "postcode": this.contractForm.controls['postcode'].value,
      //   "premiseAddress": premiseAddress,
      //   "premiseAddress2": premiseAddress2,
      //   "billingPostalcode": this.postcodeBilling,
      //   "billingAddress": this.billingAddress,
      //   "billingAddress2": this.billingAddress2,
      // });
      // console.log(reqJson);
    }
  }





  get serviceStartDate() { return this.contractForm.get('serviceStartDate'); }
  get promoCode() { return this.contractForm.get('promoCode'); }
  get icNumberType() { return this.contractForm.get('icNumberType'); }
  get icNumber() { return this.contractForm.get('icNumber'); }
  get firstName() { return this.contractForm.get('firstName'); }
  get lastName() { return this.contractForm.get('lastName'); }
  get eMail() { return this.contractForm.get('eMail'); }
  get postcode() { return this.contractForm.get('postcode'); }
  get streetName() { return this.contractForm.get('streetName'); }
  get block() { return this.contractForm.get('block'); }
  get buildingName() { return this.contractForm.get('buildingName'); }
  get floorLevel() { return this.contractForm.get('floorLevel'); }
  get postcodeBill() { return this.contractForm.get('postcodeBill'); }
  get streetNameBill() { return this.contractForm.get('streetNameBill'); }
  get blockBill() { return this.contractForm.get('blockBill'); }
  get buildingNameBill() { return this.contractForm.get('buildingNameBill'); }
  get floorLevelBill() { return this.contractForm.get('floorLevelBill'); }




}
