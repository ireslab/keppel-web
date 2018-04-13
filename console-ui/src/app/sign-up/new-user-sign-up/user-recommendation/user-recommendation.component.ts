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

    
    localRecomPlans: any = [];
    localPlans;
    localTwo: any = [];

    recomendedJson;
    planJson;

    map = new Map();


    constructor(private sbService: SidebarService, private httpClient: HttpClient, private service: ServiceCall,
        public localJson: localJSON, private spinnerService: Ng4LoadingSpinnerService, private _recaptcha: recaptcha, private fb: FormBuilder, private router: Router, private datashare: DataShare) {
        this.sbService.getSidebar("newUser")
        document.documentElement.scrollTop = 0;
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
        for (let i = 0; i < this.localRecomPlans.length; i++) {
            if (this.localRecomPlans[i].recommendedPlan == "true") {
                this.firstTwoDwlingPlans.push(this.map.get(this.localRecomPlans[i].plan))
                this.firstTwoDwlingPlansRP.push(this.localRecomPlans[i]);
            } else {
                this.otherdwlPlans.push(this.map.get(this.localRecomPlans[i].plan));
                this.otherdwlPlansRP.push(this.localRecomPlans[i]);
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
            this.datashare.usderDetailObj.premiseType = dwlType;
            this.getPlansCall();
        } else {
            alert('Please Check Internet Connection')
        }
    }

    planDropDown(event){
        this.planSelected('',event.target.value)
    }

    planSelectionBtn(index) {

        this.selectedFirstIndex = index;
        this.selectedSecondIndex = -1;
        this.otpForm = true
    }
    planSlctnBtn(index) {
        this.selectedSecondIndex = index;
        this.selectedFirstIndex = -1;
        this.otpForm = true
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
                console.log(this.planJson.length)
                console.log(this.recomendedJson.length)
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

    getPlan(plan) {
        this.datashare.usderDetailObj.selectedPlanObj = plan;
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
            this.datashare.usderDetailObj.icNumberType = "NRIC";
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

}
