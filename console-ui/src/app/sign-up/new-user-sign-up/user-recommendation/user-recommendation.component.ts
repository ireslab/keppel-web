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
        this.dwellingTypes = this.localJson.dwellingTypes.dwelling_type;
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
        $("#myBody").removeAttr('class');
        $("#myBody").addClass('signupBg');
        // $("#footer").removeAttr('class');
        // $("#footer").addClass('mainFooter');
        // let ft = document.getElementById("footer");
        // ft.classList.add("mainFooter");
        // document.getElementById('bg').style.backgroundColor = "#F3F3F3";
        this.signUpForm = this.fb.group({
            idNumber: ['', [Validators.required, ValidateNric]],
            mobileNumber: ['', [Validators.required, Validators.pattern('(8|9)[0-9]{7}$')]],
        })

    }



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
            this.datashare.usderDetailObj.icNumber = this.signUpForm.controls['idNumber'].value;
            this.datashare.usderDetailObj.mobileNumber = '+65' + this.signUpForm.controls['mobileNumber'].value;

            let _url = "";
            let reqJson = JSON.stringify({
                "idNumber": this.signUpForm.controls['idNumber'].value,
                "mobileNumber": this.signUpForm.controls['mobileNumber'].value,
                "captcha": this.captcha,
            });
            this.todayDateTime = new Date
            $('#OTPModal').modal('show');
            this.resetCaptcha();
            this.datashare.getUserDetails()

        }


    }

    get idNumber() { return this.signUpForm.get('idNumber'); }
    get mobileNumber() { return this.signUpForm.get('mobileNumber'); }


    //Code for EMA Sheet Data

    calculateEMIFactSheet() {
        var tier1Amount: any = this.datashare.usderDetailObj.selectedPlanObj.t1; //: any = null;
        var tier2Amount: any = this.datashare.usderDetailObj.selectedPlanObj.t2;
        var tier3Amount: any = this.datashare.usderDetailObj.selectedPlanObj.t3;

        var productName: any = this.datashare.usderDetailObj.selectedPlanObj.product.substring(0, 3);
        var activePlan: boolean = Boolean(this.activeRecmPlan) //boolean.parse(this.activeRecmPlan)

        if (productName == ("DOT")) {
            if (tier1Amount == (tier2Amount) && tier1Amount == (tier3Amount)) {
                this.datashare.emaFactSheetData.pdfDotAmount = tier1Amount;
                this.datashare.emaFactSheetData.pdfFppAmount = "";

            }
            if (tier1Amount == tier2Amount && tier2Amount != tier3Amount) {
                var tier1AmountDbl: any = tier1Amount * 100;
                var tier3AmountDbl: any = tier3Amount * 100;
                var peakValueT1: any = null;
                var peakValueT3: any = null;
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
                peakValueT1 = " 07:00AM To 11:00PM";
                peakValueT3 = " 11:00PM To 07:00AM";
                this.datashare.emaFactSheetData.pdfTier1Amount = tier1Amount;
                this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
                this.datashare.emaFactSheetData.pdfTier3Amount = tier3Amount;
                this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

            }
        } else if (productName == "FIX") {
            if (tier1Amount == (tier2Amount) && tier1Amount == (tier3Amount)) {
                var dotAmountDbl: any = tier1Amount * 100;
                this.datashare.emaFactSheetData.pdfFppAmount = dotAmountDbl;
                this.datashare.emaFactSheetData.pdfDotAmount = "";
            }
            if (tier1Amount == (tier2Amount) && tier2Amount != (tier3Amount)) {
                var peakValueT1: any = null;
                var peakValueT3: any = null;
                var tier1AmountDbl: any = tier1Amount * 100;
                var tier3AmountDbl: any = tier3Amount * 100;
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
                var tier1AmountDbl: any = tier1Amount * 100;
                peakValueT1 = " 07:00AM To 11:00PM";
                peakValueT3 = " 11:00PM To 07:00AM";
                this.datashare.emaFactSheetData.pdfTier1Amount = tier1AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT1 = peakValueT1;
                this.datashare.emaFactSheetData.pdfTier3Amount = tier3AmountDbl;
                this.datashare.emaFactSheetData.pdfPeakValueT3 = peakValueT3;

            }
        } else if (productName == "POOL") {

        } else if (productName == ("SUB")) {

        }

        window.localStorage.setItem('emaFactData', JSON.stringify(this.datashare.emaFactSheetData))
    }


}
