import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { ApiConstants } from '../../../network_layer/api_constants';
import { ServiceCall } from '../../../network_layer/web_service_call';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';
import { localJSON } from '../../../commom_methods/localJSON';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingModule } from 'ngx-loading';
import { recaptcha } from '../../../recaptcha/recaptcha.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateNric } from '../../../Utility/nric_validatior';
import { DataShare } from '../../../Utility/data_share.service';




declare var $: any
declare var grecaptcha: any
@Component({
    selector: 'app-user-recommendation',
    templateUrl: './user-recommendation.component.html',
    styleUrls: ['./user-recommendation.component.css'],
    providers: [recaptcha]
})
export class UserRecommendationComponent implements OnInit {

    dwlTypePlans;
    dwellingTypes;
    firstTwoDwlingPlans: any = [];
    firstTwoDwlingPlansRP: any = [];
    firstTwoBenifits: any = [];
    otherBenifits: any = [];
    otherdwlPlans: any = [];
    otherdwlPlansRP: any = [];
    selectedDwlType;
    selectedFirstIndex: any = -1;
    selectedSecondIndex: any = -1;
    showDetails: boolean = false;
    otpForm: boolean = false;
    packageForm: boolean = false;
    public loading = false;
    public onlineOffline: boolean = navigator.onLine;
    captcha: any;
    signUpForm: FormGroup;
    isValidCaptcha: boolean = false;
    captchaErr: boolean = false;
    todayDateTime: Date;
    planIndex = 2;
    activeRecmPlan;

    localRecomPlans: any = [];
    localPlans;
    localTwo: any = [];

    recomendedJson;
    planJson;

    map = new Map();


    constructor(private sbService: SidebarService, private httpClient: HttpClient, private service: ServiceCall,
        public localJson: localJSON, private spinnerService: Ng4LoadingSpinnerService, private _recaptcha: recaptcha, private fb: FormBuilder, private router: Router, private datashare: DataShare) {
        window.localStorage.clear();
        this.sbService.getSidebar("newUser")
        document.documentElement.scrollTop = 0;
        console.log("Constructor=======>");
        // // this.dwlTypePlans = this.localJson.dwlTypePlans;
        this.dwellingTypes = this.localJson.dwellingTypes.dwelling_type;
        // this.localPlans = this.localJson.dwlTypePlans;
        // //  this.localRecomPlans = this.localJson.recommPlan;
        // //this.localRecomPlans = this.localJson.recommPlan;
    }

    dataAccToRecomPlan() {
        for (let i = 0; i < this.recomendedJson.length; i++) {
            if (this.datashare.usderDetailObj.premiseType == this.recomendedJson[i].premiseType) {
                this.localRecomPlans.push(this.recomendedJson[i])
            }
        }
        for (let i = 0; i < this.planJson.length; i++) {
            this.map.set(this.planJson[i].plan, this.planJson[i])
        }
        this.firstTwoDwlPlans();
    }

    firstTwoDwlPlans() {
        let j = 0;
        let k = 0;
        for (let i = 0; i < this.localRecomPlans.length; i++) {
            if (this.localRecomPlans[i].recommendedPlan == "true") {
                this.firstTwoDwlingPlans.push(this.map.get(this.localRecomPlans[i].plan))
                this.firstTwoDwlingPlans[j]["recomPlans"] = this.localRecomPlans[i]
                this.firstTwoDwlingPlansRP.push(this.localRecomPlans[i]);
                j = j + 1;
            } else {
                this.otherdwlPlans.push(this.map.get(this.localRecomPlans[i].plan));
                this.otherdwlPlans[k]["recomPlans"] = this.localRecomPlans[i]
                this.otherdwlPlansRP.push(this.localRecomPlans[i]);
                k = k + 1;
            }
        }
        console.log(this.firstTwoDwlingPlans)
        this.getBenifitArray();
    }

    getBenifitArray() {
        for (let i = 0; i < this.firstTwoDwlingPlans.length; i++) {
            var benefits = this.firstTwoDwlingPlans[i].benefits
            this.firstTwoBenifits = benefits.split(",")
            this.firstTwoDwlingPlans[i]["planBenifits"] = this.firstTwoBenifits;
        }

        for (let i = 0; i < this.otherdwlPlans.length; i++) {
            var benefits = this.otherdwlPlans[i].benefits
            this.otherBenifits = benefits.split(",")
            this.otherdwlPlans[i]["planBenifits"] = this.otherBenifits;
        }
    }

    planSelected(index, dwlType) {
        this.selectedDwlType = index;
        if (navigator.onLine) {
            this.spinnerService.show();
            if (dwlType == 'Condominium') {
                this.datashare.usderDetailObj.premiseType = 'CONDO'
            } else if (dwlType == 'Landed Property') {
                this.datashare.usderDetailObj.premiseType = 'LANDPROP'
            } else if (dwlType == 'Others') {
                this.datashare.usderDetailObj.premiseType = 'OTHER'
            } else {
                this.datashare.usderDetailObj.premiseType = dwlType;
            }

            this.getPlansCall();
        } else {
            alert('Please Check Internet Connection')
        }
    }

    planDropDown(event) {
        this.planSelected('', event.target.value)
    }

    planSelectionBtn(index, plan) {
        this.selectedFirstIndex = index;
        this.selectedSecondIndex = -1;
        this.otpForm = true;
        this.activeRecmPlan = plan.recomPlans.recommendedPlan;
        this.datashare.usderDetailObj.selectedPlanObj = plan;
    }
    planSlctnBtn(index, plan) {
        this.selectedSecondIndex = index;
        this.selectedFirstIndex = -1;
        this.otpForm = true
        this.activeRecmPlan = plan.recomPlans.recommendedPlan;
        this.datashare.usderDetailObj.selectedPlanObj = plan;
    }


    showDetailClicked(index) {
        var a = document.getElementById('show' + index).innerText
        if (a == "SHOW DETAILS (+)") {
            document.getElementById('show' + index).innerText = "Hide Details (-)";
        } else {
            document.getElementById('show' + index).innerText = "Show Details (+)"
        }
        $("#" + index).toggle();
    }

    showHideDetailClicked(index) {
        var a = document.getElementById('showHide' + index).innerText
        if (a == "SHOW DETAILS (+)") {
            document.getElementById('showHide' + index).innerText = "Hide Details (-)";
        } else {
            document.getElementById('showHide' + index).innerText = "Show Details (+)"
        }
        $("#" + "detail" + index).toggle();
    }






    getPlansCall() {
        let _url = ApiConstants.GET_PLANS_URL;
        this.service.getPlans(_url).subscribe(
            data => {
                this.planJson = JSON.parse(data.planJson);
                this.recomendedJson = JSON.parse(data.recomendedJson);
                // console.log(this.planJson)
                // console.log(this.recomendedJson)
                this.map.clear();
                this.localRecomPlans = [];
                this.firstTwoDwlingPlans = [];
                this.otherdwlPlans = [];
                this.spinnerService.hide();
                this.packageForm = true;
                this.dataAccToRecomPlan();
            }, (error: any) => {
                alert("Something went wrong")
                this.spinnerService.hide();
            }
        );

        // var headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/json; charset=utf-8');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET');
        // headers.append('Access-Control-Allow-Origin', '*');
    }

    moreLessClicked() {
        var PlansDiv = $("#collapseMorePlans");
        var toggleBtn = $("#collapseMorePlansBtn");
        if (!PlansDiv.is(':visible')) {
            toggleBtn.html("See less plans");
            toggleBtn.addClass("toggle");
            PlansDiv.css("display", "flex");
        } else {
            toggleBtn.html("See more plans");
            toggleBtn.removeClass("toggle");
            PlansDiv.hide();
        }
    }

    ngOnInit() {
        document.getElementById('bg').style.backgroundColor = "#F3F3F3";
        this.signUpForm = this.fb.group({
            idNumber: ['', [Validators.required, ValidateNric]],
            mobileNumber: ['', [Validators.required, Validators.pattern('(8|9)[0-9]{7}$')]],
        })
        //  $(document).ready(function () {
        //Script on Page Load
        //   $('button.selectPlanButton').on("click", function () {
        //       //Reset the selections
        //       $('button.selectPlanButton').removeClass("btn-primary");
        //       $('button.selectPlanButton').addClass("btn-secondary");
        //       $(".PlanDetailCard").removeClass("selected");

        //             //Highlight the correct panel
        //             $(this).parent().addClass("selected");
        //             $(this).removeClass("btn-secondary");
        //             $(this).addClass("btn-primary");

        //             //Show next step
        //             $("#Grp_IDOTP").show();
        //         });

        // $(".PlanDetailSummary").on("click", function () {
        //     $(this).next().click();
        // });

        // $('button.selectPropertyTypeButton').on("click", function () {
        //     $('button.selectPropertyTypeButton').removeClass("selected");
        //     $(this).addClass("selected");
        //     $('#Grp-Package').show();
        // });
        // $("#Grp-DwellingType-MobileSelect").change(function () {
        //     $('#Grp-Package').show();
        // });


        // $("a.kpl-PlanDetailShowHide").on("click", function () {
        //     var CurrentText = $(this).html();
        //     if (CurrentText == "Show Details (+)") {
        //         $(this).html("Hide Details (-)");
        //     }
        //     else $(this).html("Show Details (+)");
        //     $(this).prev().toggle();
        // });



        // $("#collapseMorePlansBtn").on("click", function () {
        //     var PlansDiv = $("#collapseMorePlans");
        //     var toggleBtn = $("#collapseMorePlansBtn");
        //     if (!PlansDiv.is(':visible')) {
        //         toggleBtn.html("See less plans");
        //         toggleBtn.addClass("toggle");
        //         PlansDiv.css("display", "flex");
        //     } else {
        //         toggleBtn.html("See more plans");
        //         toggleBtn.removeClass("toggle");
        //         PlansDiv.hide();
        //     }
        // });

        //   });
    }

    // getPlan(plan,i) {
    //     this.datashare.usderDetailObj.selectedPlanObj = plan;
    // }

    getCapthaToken(event) {
        if (this.captchaErr == true) {
            document.getElementById('verified_captcha').style.display = 'none';
        }
        this.isValidCaptcha = true;
        this.captcha = event.token;
    }

    resetCaptcha() {
        this.isValidCaptcha = false;
        this.captchaErr = false;
        grecaptcha.reset()
    }

    userSignUp() {

        if (this.signUpForm.invalid) {
            for (let control in this.signUpForm.controls) {
                this.signUpForm.get(control).markAsTouched();
                this.signUpForm.get(control).invalid;
                this.signUpForm.get(control).updateValueAndValidity();
            }
            console.error("form is not valid")
            return;
        } if (this.isValidCaptcha == false) {
            this.captchaErr = true;
            return;
        } else {
            // this.datashare.usderDetailObj.icNumberType = "NRIC";
            this.datashare.usderDetailObj.icNumber = this.signUpForm.controls['idNumber'].value;
            this.datashare.usderDetailObj.mobileNumber = '+65' + this.signUpForm.controls['mobileNumber'].value;

            let _url = "";
            let reqJson = JSON.stringify({
                "idNumber": this.signUpForm.controls['idNumber'].value,
                "mobileNumber": this.signUpForm.controls['mobileNumber'].value,
                "captcha": this.captcha,
            });
            console.log(reqJson);
            this.todayDateTime = new Date
            $('#OTPModal').modal('show');
            this.resetCaptcha();
            this.datashare.getUserDetails()

        }

        // window.localStorage.setItem('newUserData', JSON.stringify(this.datashare.usderDetailObj))
        // this.signUpForm.reset();


        // this.router.navigateByUrl('');
        // this.httpPostCall(_url, reqJson).subscribe(
        //     (data) => {
        //         this.resetCaptcha();
        //         console.log(data)
        //     },
        //     (error) => {
        //         this.resetCaptcha();
        //         console.log(error)
        //     });
        // data-toggle="modal" data-target="#OTPModal"
    }

    get idNumber() { return this.signUpForm.get('idNumber'); }
    get mobileNumber() { return this.signUpForm.get('mobileNumber'); }






















    //Code for EMA Sheet Data

    calculateEMIFactSheet() {

        // var pdfDotAmount: any;
        // var pdfFppAmount: any;
        //  var pdfTier1Amount: any;
        // var pdfPeakValueT1: any;
        // var pdfTier3Amount: any;
        // var pdfPeakValueT3: any;
        //String selectedPlanMap = null;
        // var selectedRPlan: any;


        // String subscriptionBaseSizeDisValue = null;
        // String subscriptionBasePriceDisValue = null;
        // String subscriptionBlockSizeDisValue = null;
        // String subscriptionBlockPriceDisValue = null;
        // String subscriptionMaxBlocksDisValue = null;

        var tier1Amount: any = this.datashare.usderDetailObj.selectedPlanObj.t1; //: any = null;
        var tier2Amount: any = this.datashare.usderDetailObj.selectedPlanObj.t2;
        var tier3Amount: any = this.datashare.usderDetailObj.selectedPlanObj.t3;

        console.log("Tier 1 Amount===>", tier1Amount);
        console.log("Tier 2 Amount===>", tier2Amount);
        console.log("Tier 3 Amount===>", tier3Amount);


        var productName: any = this.datashare.usderDetailObj.selectedPlanObj.product.substring(0, 3);
        var activePlan: boolean = Boolean(this.activeRecmPlan) //boolean.parse(this.activeRecmPlan)

        // New Code
        // if (activePlan) {
        // String productName = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "product", activePlanMap);
        //log.info("planName: " + this.datashare.emaFactSheetData.selectedRPlan + "::activePlanMap size: " + activePlanMap.size());
        // if (productsMap.containsKey(productName))
        // productMapKeyVal = productsMap.get(productName);
        // log.info(":: Product Name:: " + productMapKeyVal);
        if (productName == ("DOT")) {
            console.log(":: Product Name::  DOT");
            // String tier1Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t1", activePlanMap);
            // String tier2Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t2", activePlanMap);
            // String tier3Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t3", activePlanMap);
            if (tier1Amount == (tier2Amount) && tier1Amount == (tier3Amount)) {
                //var dotAmountDbl: any = tier1Amount;
                // String dotAmount = String.valueOf(dotAmountDbl);
                // var dotAmount: any = Math.round(dotAmountDbl);
                this.datashare.emaFactSheetData.pdfDotAmount = tier1Amount;
                this.datashare.emaFactSheetData.pdfFppAmount = "";
                console.log("dotAmount in DOT--> " + tier1Amount);

            }
            if (tier1Amount == tier2Amount && tier2Amount != tier3Amount) {
                var tier1AmountDbl: any = tier1Amount * 100;
                // tier1Amount = String.valueOf(tier1AmountDbl);
                //tier1Amount = Math.round(tier1AmountDbl);
                console.log("if t1 and t2 are equal tier1Amount DOT --> " + tier1Amount);
                var tier3AmountDbl: any = tier3Amount * 100;
                // tier3Amount = String.valueOf(tier3AmountDbl);
                //tier3Amount = Math.round(tier3AmountDbl);

                var peakValueT1: any = null;
                var peakValueT3: any = null;
                //if (tiersMap.containsKey("T1"))
                //  peakValueT1 = tiersMap.get("T1");
                //if (tiersMap.containsKey("T3"))
                //  peakValueT3 = tiersMap.get("T3");
                console.log("if t1 and t2 are equal peakValue DOT " + peakValueT1);
                peakValueT1 = " 07:00AM To 11:00PM";
                peakValueT3 = " 11:00PM To 07:00AM";
                this.datashare.emaFactSheetData.pdfTier1Amount = tier1AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
                this.datashare.emaFactSheetData.pdfTier3Amount = tier3AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

            }
            if (tier2Amount == tier3Amount && tier1Amount != tier2Amount) {
                var peakValueT1: any = null;
                var peakValueT3: any = null;
                // var tier3AmountDbl: any = tier3Amount ;//* 100;
                // tier3Amount = String.valueOf(tier3AmountDbl);
                // tier3Amount = Math.round(tier3AmountDbl);
                console.log("if t2 and t3 are equal tier3Amount DOT--> " + tier3Amount);
                //  var tier1AmountDbl: any = tier1Amount.// * 100;
                // tier1Amount = String.valueOf(tier1AmountDbl);
                //tier1Amount = Math.round(tier1AmountDbl);
                console.log("if t2 and t3 are equal tier1Amount--> " + tier1Amount);
                //if (tiersMap.containsKey("T3"))
                //  peakValueT3 = tiersMap.get("T3");
                //if (tiersMap.containsKey("T1"))
                //  peakValueT1 = tiersMap.get("T1");
                console.log("if t2 and t3 are equal peakValue DOT" + peakValueT3);
                peakValueT1 = " 07:00AM To 11:00PM";
                peakValueT3 = " 11:00PM To 07:00AM";
                this.datashare.emaFactSheetData.pdfTier1Amount = tier1Amount;
                this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
                this.datashare.emaFactSheetData.pdfTier3Amount = tier3Amount;
                this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

            }
        } else if (productName == "FIX") {
            console.log(":: Product Name:: FIX");
            // String tier1Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t1", activePlanMap);
            // String tier2Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t2", activePlanMap);
            // String tier3Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t3", activePlanMap);
            console.log("tier amounts in FIX --->tier1Amount " + tier1Amount + "  tier2Amount--> " + tier2Amount
                + "  tier3Amount::: " + tier2Amount);
            if (tier1Amount == (tier2Amount) && tier1Amount == (tier3Amount)) {
                var dotAmountDbl: any = tier1Amount * 100;
                // String fppAmount = String.valueOf(dotAmountDbl);
                // var fppAmount: any = Math.round(dotAmountDbl);
                this.datashare.emaFactSheetData.pdfFppAmount = dotAmountDbl;
                this.datashare.emaFactSheetData.pdfDotAmount="";
                console.log("fppAmount--> " + dotAmountDbl);
            }
            if (tier1Amount == (tier2Amount) && tier2Amount != (tier3Amount)) {
                var peakValueT1: any = null;
                var peakValueT3: any = null;
                var tier1AmountDbl: any = tier1Amount * 100;
                // tier1Amount = String.valueOf(tier1AmountDbl);
                //var tier1Amount: any = Math.round(tier1AmountDbl);
                console.log("if t1 and t2 are equal in FIX tier1Amount--> " + tier1Amount);
                var tier3AmountDbl: any = tier3Amount * 100;
                // tier3Amount = String.valueOf(tier3AmountDbl);
                // tier3Amount = Math.round(tier3AmountDbl);
                //                  log.info("if t2 and t3 are equal FIX tier3Amount--> " + tier3Amount);
                //                  if (tiersMap.containsKey("T1"))
                //                      peakValueT1 = tiersMap.get("T1");
                //                  if (tiersMap.containsKey("T3"))
                //                      peakValueT3 = tiersMap.get("T3");
                console.log("if t2 and t3 are equal peakValue in FIX" + peakValueT3);
                console.log("if t1 and t2 are equal peakValue in FIX" + peakValueT1);
                peakValueT1 = " 07:00AM To 11:00PM";
                peakValueT3 = " 11:00PM To 07:00AM";
                this.datashare.emaFactSheetData.pdfTier1Amount = tier1AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
                this.datashare.emaFactSheetData.pdfTier3Amount = tier3AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

            }
            if (tier2Amount == tier3Amount && tier1Amount != tier2Amount) {
                var peakValueT1: any = null;
                var peakValueT3: any = null;
                var tier3AmountDbl: any = tier3Amount * 100;
                // tier3Amount = String.valueOf(tier3AmountDbl);
                // tier3Amount = Math.round(tier3AmountDbl);
                console.log("if t2 and t3 are equal tier3Amount--> " + tier3Amount);
                var tier1AmountDbl: any = tier1Amount * 100;
                // tier1Amount = String.valueOf(tier1AmountDbl);
                // tier1Amount = Math.round(tier1AmountDbl);
                //                  log.info("if t1 and t2 are equal tier1Amount in FPP--> " + tier1Amount);
                //                  if (tiersMap.containsKey("T3"))
                //                      peakValueT3 = tiersMap.get("T3");
                //                  if (tiersMap.containsKey("T1"))
                //                      peakValueT1 = tiersMap.get("T1");
                console.log("if t2 and t3 are equal peakValue " + peakValueT3);
                peakValueT1 = " 07:00AM To 11:00PM";
                peakValueT3 = " 11:00PM To 07:00AM";
                this.datashare.emaFactSheetData.pdfTier1Amount = tier1AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
                this.datashare.emaFactSheetData.pdfTier3Amount = tier3AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

            }
        } else if (productName == "POOL") {
            //non standard
            //String adminFee = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "adminFee", activePlanMap);
        } else if (productName == ("SUB")) {
            //non standard
            // subscriptionBaseSizeDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBaseSize", activePlanMap);
            // subscriptionBasePriceDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBasePrice", activePlanMap);
            // subscriptionBlockSizeDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBlockSize", activePlanMap);
            // subscriptionBlockPriceDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBlockPrice", activePlanMap);
            // subscriptionMaxBlocksDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionMaxBlocks", activePlanMap);

        }
        // }  else {

        //     if (productName == ("DOT")) {
        //         console.log(":: Product Name:: InActive Map DOT");
        //         //  String tier1Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t1", inActivePlanMap);
        //         //  String tier2Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t2", inActivePlanMap);
        //         //  String tier3Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t3", inActivePlanMap);
        //         if (tier1Amount.equals(tier2Amount) && tier1Amount.equals(tier3Amount)) {
        //             var dotAmountDbl: any = tier1Amount;
        //             // String dotAmount = String.valueOf(dotAmountDbl);
        //             var dotAmount: any = Math.round(dotAmountDbl);
        //             console.log("dotAmount--> " + dotAmount);
        //             this.datashare.emaFactSheetData.pdfDotAmount = dotAmount;
        //         }
        //         if (tier1Amount == tier2Amount && !tier2Amount == tier3Amount) {
        //             var peakValueT1: any = null;
        //             var peakValueT3: any = null;
        //             var tier1AmountDbl: any = tier1Amount * 100;
        //             // tier1Amount = String.valueOf(tier1AmountDbl);
        //             tier1Amount = Math.round(tier1AmountDbl);
        //             console.log("if t1 and t2 are equal tier1Amount InActive Map DOT--> " + tier1Amount);
        //             var tier3AmountDbl: any = tier3Amount * 100;
        //             // tier3Amount = String.valueOf(tier3AmountDbl);
        //             tier3Amount = Math.round(tier3AmountDbl);
        //             //                  log.info("if t2 and t3 are equal tier3Amount--> " + tier3Amount);
        //             //                  if (tiersMap.containsKey("T1"))
        //             //                      peakValueT1 = tiersMap.get("T1");
        //             //                  if (tiersMap.containsKey("T3"))
        //             //                      peakValueT3 = tiersMap.get("T3");
        //             console.log("if t1 and t2 are equal peakValue InActive Map DOT" + peakValueT1);
        //             peakValueT1 = " 07:00AM To 11:00PM";
        //             peakValueT3 = " 11:00PM To 07:00AM";
        //             this.datashare.emaFactSheetData.pdfTier1Amount = tier1Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
        //             this.datashare.emaFactSheetData.pdfTier3Amount = tier3Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

        //         }
        //         if (tier2Amount == tier3Amount && tier1Amount != tier2Amount) {
        //             var peakValueT1: any = null;
        //             var peakValueT3: any = null;
        //             var tier3AmountDbl: any = tier3Amount * 100;
        //             // tier3Amount = String.valueOf(tier3AmountDbl);
        //             tier3Amount = Math.round(tier3AmountDbl);
        //             console.log("if t2 and t3 are equal tier3Amount InActive Map DOT--> " + tier3Amount);
        //             var tier1AmountDbl: any = tier1Amount * 100;
        //             // tier1Amount = String.valueOf(tier1AmountDbl);
        //             tier1Amount = Math.round(tier1AmountDbl);
        //             //                  log.info("if t1 and t2 are equal tier1Amount InActive Map DOT--> " + tier1Amount);
        //             //                  if (tiersMap.containsKey("T3"))
        //             //                      peakValueT3 = tiersMap.get("T3");
        //             //                  if (tiersMap.containsKey("T1"))
        //             //                      peakValueT1 = tiersMap.get("T1");
        //             console.log("if t2 and t3 are equal peakValue InActive Map DOT" + peakValueT3);
        //             peakValueT1 = " 07:00AM To 11:00PM";
        //             peakValueT3 = " 11:00PM To 07:00AM";
        //            this.datashare.emaFactSheetData.pdfTier1Amount = tier1Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
        //             this.datashare.emaFactSheetData.pdfTier3Amount = tier3Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

        //         }
        //     } else if (productName == "FIX") {
        //         //String tier1Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t1", inActivePlanMap);
        //         //String tier2Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t2", inActivePlanMap);
        //         //String tier3Amount = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "t3", inActivePlanMap);
        //         if (tier1Amount == tier2Amount && tier1Amount == tier3Amount) {
        //             var dotAmountDbl: any = tier1Amount * 100;
        //             // String fppAmount = String.valueOf(dotAmountDbl);
        //             var fppAmount: any = Math.round(dotAmountDbl);
        //             this.datashare.emaFactSheetData.pdfFppAmount = fppAmount;
        //             console.log("fppAmount--> " + fppAmount);

        //         }
        //         if (tier1Amount == tier2Amount && !tier2Amount == tier3Amount) {
        //             var peakValueT1: any = null;
        //             var peakValueT3: any = null;
        //             var tier1AmountDbl: any = tier1Amount * 100;
        //             // tier1Amount = String.valueOf(tier1AmountDbl);
        //             tier1Amount = Math.round(tier1AmountDbl);
        //             console.log("if t1 and t2 are equal tier1Amount InActive Map FIX--> " + tier1Amount);
        //             //                  if (tiersMap.containsKey("T1"))
        //             //                      peakValueT1 = tiersMap.get("T1");
        //             var tier3AmountDbl: any = tier3Amount * 100;
        //             // tier3Amount = String.valueOf(tier3AmountDbl);
        //             tier3Amount = Math.round(tier3AmountDbl);
        //             console.log("if t2 and t3 are equal tier3Amount InActive Map FIX--> " + tier3Amount);
        //             //                  if (tiersMap.containsKey("T3"))
        //             //                      peakValueT3 = tiersMap.get("T3");
        //             console.log("if t1 and t2 are equal peakValue InActive Map FIX" + peakValueT1);
        //             peakValueT1 = " 07:00AM To 11:00PM";
        //             peakValueT3 = " 11:00PM To 07:00AM";
        //            this.datashare.emaFactSheetData.pdfTier1Amount = tier1Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
        //             this.datashare.emaFactSheetData.pdfTier3Amount = tier3Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

        //         }
        //         if (tier2Amount == tier3Amount && tier1Amount != tier2Amount) {
        //             var peakValueT1: any = null;
        //             var peakValueT3: any = null;
        //             var tier3AmountDbl: any = tier3Amount * 100;
        //             // tier3Amount = String.valueOf(tier3AmountDbl);
        //             tier3Amount = Math.round(tier3AmountDbl);
        //             console.log("if t2 and t3 are equal tier3Amount InActive Map FIX--> " + tier3Amount);
        //             //                  if (tiersMap.containsKey("T3"))
        //             //                      peakValueT3 = tiersMap.get("T3");
        //             var tier1AmountDbl: any = tier1Amount * 100;
        //             // tier1Amount = String.valueOf(tier1AmountDbl);
        //             tier1Amount = Math.round(tier1AmountDbl);
        //             console.log("if t1 and t2 are equal tier1Amount InActive Map FIX--> " + tier1Amount);
        //             //                  if (tiersMap.containsKey("T1"))
        //             //                      peakValueT1 = tiersMap.get("T1");
        //             console.log("if t2 and t3 are equal peakValue InActive Map FIX" + peakValueT3);
        //             peakValueT1 = " 07:00AM To 11:00PM";
        //             peakValueT3 = " 11:00PM To 07:00AM";
        //            this.datashare.emaFactSheetData.pdfTier1Amount = tier1Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
        //             this.datashare.emaFactSheetData.pdfTier3Amount = tier3Amount;
        //             this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

        //         }
        //     } else if (productName == "POOL") {
        //         //String adminFee = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "adminFee", inActivePlanMap);
        //     } else if (productName == "SUB") {
        //         // subscriptionBaseSizeDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBaseSize", inActivePlanMap);
        //         // subscriptionBasePriceDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBasePrice", inActivePlanMap);
        //         // subscriptionBlockSizeDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBlockSize", inActivePlanMap);
        //         // subscriptionBlockPriceDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionBlockPrice", inActivePlanMap);
        //         // subscriptionMaxBlocksDisValue = getRPVersion(this.datashare.emaFactSheetData.selectedRPlan, "subscriptionMaxBlocks", inActivePlanMap);

        //     }
        // }
        console.log(this.datashare.emaFactSheetData);
        window.localStorage.setItem('emaFactData', JSON.stringify(this.datashare.emaFactSheetData))
    }


}
