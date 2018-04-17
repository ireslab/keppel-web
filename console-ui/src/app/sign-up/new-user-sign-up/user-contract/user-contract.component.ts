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
import { ApiConstants } from '../../../network_layer/api_constants';
import { Http, Response, Headers } from '@angular/http';

declare var $: any
@Component({
  selector: 'app-user-contract',
  templateUrl: './user-contract.component.html',
  styleUrls: ['./user-contract.component.css'],

})
export class UserContractComponent implements OnInit {
  contractForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  coolingPeriod: number = 0;
  maxDays: number;
  minDays: number;
  meterType: string;
  dateErrorSrlp: boolean = false;
  dateErrorAmi: boolean = false;
  pictureName: string = "Upload Past Month's Bill"

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
  optionalServiceOne: any;
  optionalServiceTwo: any;
  optionalServiceThree: any;


  _postcode: string = '';
  _streetName: string = '';
  _block: string = '';
  _buildingName: string = '';
  _floorLevel: string = '';
  _securityAmount;
  _payMethodKey;

  constructor(private sbService: SidebarService, public datashare: DataShare, private fb: FormBuilder,
    private router: Router, private commonService: CommonServices, private serverCall: ServiceCall,
    private spinnerService: Ng4LoadingSpinnerService, public http: Http) {
    // this.datashare.usderDetailObj = JSON.parse(window.localStorage.getItem('newUserData'));
    this.sbService.getSidebar("newUser");
    this.commonService.gotoTopOfView();

    // this.optionalServices = [
    //   { "serviceName": "Paper Bill", "serviceCost": "(+$2/bill)" },
    //   { "serviceName": "Smart Meter", "serviceCost": "(+$40 one-time payment, if applicable)" },
    //   // { "serviceName": "vas#3", "serviceCost": "3" },
    // ]
    this.optionalServiceOne = { "serviceName": "Paper Bill", "serviceCost": "(+$2/bill)" };
    this.optionalServiceTwo = { "serviceName": "Smart Meter", "serviceCost": "(+$40 one-time payment, if applicable)" };
    // this.optionalServiceThree = { "serviceName": "vas#3", "serviceCost": "3" };
    this.meterType = "SRLP"
    this.getMinDate();
    this.getMaxDate();

  }
  getMinDate() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayAdded = 1;
    if (this.coolingPeriod != 0) {
      for (let i = 1; i <= this.coolingPeriod + 1;) {
        this.minDate = new Date(Date.now() + dayAdded * 24 * 60 * 60 * 1000);
        let getday = this.minDate.getDay();
        var dayName = days[getday];
        dayAdded++;
        if (dayName == "Sunday" || dayName == "Saturday") {

        } else {
          i++;
        }
      }
    } else {
      this.minDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    }

    if (this.meterType == "SRLP") {
      this.minDays = 5;
    } else {
      this.minDays = 30;
    }
    this.minDate = new Date(this.minDate.getTime() + this.minDays * 24 * 60 * 60 * 1000);
  }
  getMaxDate() {
    this.maxDays = 90;
    this.maxDate = new Date(Date.now() + this.maxDays * 24 * 60 * 60 * 1000);
  }

  // selectedServices(optService) {
  //   if (this.selectedOptionalServices.indexOf(optService) == -1) {
  //     this.selectedOptionalServices.push(optService)
  //   } else {
  //     this.selectedOptionalServices.splice(this.selectedOptionalServices.indexOf(optService), 1);
  //   }
  //   console.log(this.selectedOptionalServices);
  // }
  dateValidation() {
    this.dateErrorAmi = false;
    this.dateErrorSrlp = false;
  }
  selectedServices(index) {
    if (index == 1) {
      if (this.datashare.usderDetailObj.optionalService1 != "") {
        this.datashare.usderDetailObj.optionalService1 = ""
      } else {
        this.datashare.usderDetailObj.optionalService1 = this.optionalServiceOne
      }
    }
    else {
      if (this.datashare.usderDetailObj.optionalService2 != "") {
        this.datashare.usderDetailObj.optionalService2 = ""
        this.meterType = "SRLP";
        this.getMinDate();

        if (this.contractForm.controls['serviceStartDate'].value != "") {
          this.dateErrorSrlp = true;
          this.dateErrorAmi = false;
        }
        this.contractForm.patchValue({
          serviceStartDate: "",
        })

      } else {
        this.datashare.usderDetailObj.optionalService2 = this.optionalServiceTwo;
        this.meterType = "AMI";
        this.getMinDate();

        if (this.contractForm.controls['serviceStartDate'].value != "") {
          this.dateErrorAmi = true;
          this.dateErrorSrlp = false;
        }
        this.contractForm.patchValue({
          serviceStartDate: "",
        })
      }
    }
    // else {
    //   if (this.datashare.usderDetailObj.optionalService3 != "") {
    //     this.datashare.usderDetailObj.optionalService3 = ""
    //   } else {
    //     this.datashare.usderDetailObj.optionalService3 = this.optionalServiceThree
    //   }
    // }

  }
  showSelectedOptService() {
    if (this.datashare.usderDetailObj.optionalService1 != "") {
      document.getElementById("btnOne").className = 'btn btn-lg btn-block btn-secondary selectOptionalSvcsButton btn-Option selected';
    }
    if (this.datashare.usderDetailObj.optionalService2 != "") {
      document.getElementById("btnTwo").className = 'btn btn-lg btn-block btn-secondary selectOptionalSvcsButton btn-Option selected';
    }
    // if(this.datashare.usderDetailObj.optionalService3 != ""){
    //   document.getElementById("btnThree").className = 'btn btn-lg btn-block btn-secondary selectOptionalSvcsButton btn-Option selected';
    // }

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
      spAccount: this.datashare.usderDetailObj.spAccount,
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
    if (paymentMethod == 'Recurring') {
      this.router.navigateByUrl("payPal");
    }
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
          this.spinnerService.hide()
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
          this.spinnerService.hide();
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

        }, (error: any) => {
          this.spinnerService.hide();
          alert("error")
        }
      );
    }
  }

  getPicture(e) {
    let uploadFileName = e.target.files[0].name;
    if (uploadFileName != undefined || uploadFileName != null) {
      this.pictureName = uploadFileName;
    } else {
      this.pictureName = "Upload Past Month's Bill";
    }



  }
  getPromoCode() {
    this.datashare.usderDetailObj.promoCode = this.contractForm.controls['promoCode'].value;
  }
  getSPaccountNumber() {
    this.datashare.usderDetailObj.spAccount = this.contractForm.controls['spAccount'].value;
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
    }
    //else if (this.datashare.usderDetailObj.optionalService2 != "") {
    //   this.meterType = "AMI";
    //   this.datashare.usderDetailObj.serviceStartDate = "";
    //   this.getMinDate();
    //   this.dateError = true;
    //   return;
    // }
    else if (this.paymentMethod == "") {
      this.paymentMessage = true;
      return;
    } else if (this.tenantOrOwner == "") {
      this.ownershipMessage = true;
      return;
    } else {
      // let optionalService1 = "";
      // let optionalService2 = "";
      // let optionalService3 = "";

      // if (this.selectedOptionalServices.length > 0) {
      //   for (let i = 0; i < this.selectedOptionalServices.length; i++) {
      //     if (i == 0) {
      //       optionalService1 = this.selectedOptionalServices[i]
      //     } else if (i == 1) {
      //       optionalService2 = this.selectedOptionalServices[i]
      //     } else {
      //       optionalService3 = this.selectedOptionalServices[i]
      //     }
      //   }

      // }


      let postcode = this.contractForm.controls['postcode'].value
      let premiseAddress = this.contractForm.controls['block'].value + " " + " " + this.contractForm.controls['streetName'].value + " " + " " + this.contractForm.controls['buildingName'].value + " " + " " +"#" +  " " + this.contractForm.controls['floorLevel'].value + " " + " " + " SINGAPORE " + " " + " " + postcode;
      // let premiseAddress2 = this.contractForm.controls['buildingName'].value + " " + " " + this.contractForm.controls['floorLevel'].value + " " + " " + " SINGAPORE " + " " + " " + postcode;

      if (this.sameAddress == true) {
        this.postcodeBilling = postcode;
        this.billingAddress = premiseAddress;
        // this.billingAddress2 = premiseAddress2;
      } else {
        this.postcodeBilling = this.contractForm.controls['postcodeBill'].value;
        this.billingAddress = this.contractForm.controls['blockBill'].value + " " + " " + this.contractForm.controls['streetNameBill'].value + " " + " " + this.contractForm.controls['buildingNameBill'].value + " " + " " +"#" + " " + this.contractForm.controls['floorLevelBill'].value + " " + " " + " SINGAPORE " + " " + " " + this.postcodeBilling;
        // this.billingAddress2 = this.contractForm.controls['buildingNameBill'].value + " " + " " + this.contractForm.controls['floorLevelBill'].value + " " + " " + " SINGAPORE " + " " + " " + this.postcodeBilling;
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
      // this.datashare.usderDetailObj.premiseAddress2 = premiseAddress2;

      this.datashare.usderDetailObj.billingAddress = this.billingAddress;
      // this.datashare.usderDetailObj.billingAddress2 = this.billingAddress2;

      this.datashare.usderDetailObj.tenantOrOwner = this.tenantOrOwner;
      this.datashare.getUserDetails();
      window.localStorage.clear();
      window.localStorage.setItem('newUserData', JSON.stringify(this.datashare.usderDetailObj));
      window.localStorage.setItem('emaFactData', JSON.stringify(this.datashare.emaFactSheetData))
      // if (this.paymentMethod == 'IDDA (DBS)') {
      //   window.open('https://internet-banking.dbs.com.sg', '_blank');
      // } else if (this.paymentMethod == 'Giro') {
      //   window.open('https://www.iras.gov.sg/irashome/uploadedFiles/IRASHome/Quick_Links/GIRO_IIT_appln_form.pdf', '_blank');
      // }
   


      if (this.datashare.usderDetailObj.paymentMethod == 'Giro') {
        this._payMethodKey = 'GIRO'
      } else if (this.datashare.usderDetailObj.paymentMethod == 'IDDA (DBS)') {
        this._payMethodKey = 'IDDA'
      } else if (this.datashare.usderDetailObj.paymentMethod == 'Recuring') {
        this._payMethodKey = 'RECUR'
      } else {
        this._payMethodKey = 'OTH'
      }
      this.getSecurityDeposit();
      //  this.router.navigateByUrl("new-user-confirmation");
    }

  }
  getSecurityDeposit() {
    if (navigator.onLine) {
      this.spinnerService.show();
      var rqst_json = JSON.stringify({
        "idType": this.datashare.usderDetailObj.icNumberType,
        "payMethod": this._payMethodKey,
        "premiseType": this.datashare.usderDetailObj.premiseType
      })
      console.log(rqst_json)
      let _url = ApiConstants.GET_SECURITY_DEPOSIT;
      ServiceCall.httpPostCall(rqst_json, _url, this.http).subscribe(
        (data) => {
          // data = JSON.parse(data)
          console.log(data)
          this.spinnerService.hide()
          if (data.success == true) {
            if (data.sd_amount != null) {
              this.datashare.usderDetailObj.sd_amount = data.sd_amount;
            } else {
              this.datashare.usderDetailObj.sd_amount = ""
            }

          } else {
            this.datashare.usderDetailObj.sd_amount = ""
          }
          this.datashare.getUserDetails();
          this.router.navigateByUrl("new-user-confirmation");

        }, (error: any) => {
          console.log(error.success)
          this.datashare.usderDetailObj.sd_amount = error.sd_amount;
          this.spinnerService.hide()
        })
    }
    else {
      alert("Please Check Internet Connection")
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
