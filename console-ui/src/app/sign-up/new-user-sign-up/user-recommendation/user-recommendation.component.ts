import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { recaptcha } from '../../../recaptcha/recaptcha.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateNric } from '../../../Utility/nric_validatior'

declare var $: any
declare var grecaptcha: any
@Component({
    selector: 'app-user-recommendation',
    templateUrl: './user-recommendation.component.html',
    styleUrls: ['./user-recommendation.component.css'],
    providers: [recaptcha]
})
export class UserRecommendationComponent implements OnInit {

    dwellingTypes = ['HDB 1/2', 'HDB 3', 'HDB 4', 'HDB 5', 'Condominium', 'Landed Property', 'Others']
    dwlTypePlans = [
        { "planName": "SMART", "monthlyBill": "$59*", "discount": "17% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] },
        { "planName": "CLEAN", "monthlyBill": "$59*", "discount": "19% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] },
        { "planName": "SMART", "monthlyBill": "$59*", "discount": "17% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] },
        { "planName": "CLEAN", "monthlyBill": "$59*", "discount": "19% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] },
        { "planName": "SMART", "monthlyBill": "$59*", "discount": "17% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] },
        { "planName": "CLEAN", "monthlyBill": "$59*", "discount": "19% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] },
        { "planName": "SMART", "monthlyBill": "$59*", "discount": "17% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] },
        { "planName": "CLEAN", "monthlyBill": "$59*", "discount": "19% LESS", "details": ['24 Months', 'Peak Rate (7am to 11pm): $0.1/kwh', 'Off Peak Rate(11pm to 7am): $0.01/kwh', 'All charges are absorbed', 'Consumption is loss adjusted'] }
    ]
    firstTwoDwlingPlans: any = [];
    otherdwlPlans: any = [];
    captcha: any;
    signUpForm: FormGroup;
    isValidCaptcha: boolean = false;
    captchaErr: boolean = false;
    todayDateTime: Date;

    constructor(private sbService: SidebarService, private _recaptcha: recaptcha, private fb: FormBuilder, private router: Router) {
        this.sbService.getSidebar("newUser")
        
    }



    firstTwoDwlPlans() {
        for (let index = 0; index < this.dwlTypePlans.length; index++) {
            if (index < 2) {
                this.firstTwoDwlingPlans[index] = this.dwlTypePlans[index];
            } else {
                this.otherdwlPlans[index - 2] = this.dwlTypePlans[index];
            }
        }
    }

    planSelected() {
        this.firstTwoDwlPlans();
    }








    ngOnInit() {
        this.signUpForm = this.fb.group({
            idNumber: ['', [Validators.required, ValidateNric]],
            mobileNumber: ['', [Validators.required, Validators.pattern('(8|9)[0-9]{7}$')]],
        })


        $(document).ready(function () {
            //Script on Page Load
            $('button.selectPlanButton').on("click", function () {
                //Reset the selections
                $('button.selectPlanButton').removeClass("btn-primary");
                $('button.selectPlanButton').addClass("btn-secondary");
                $(".PlanDetailCard").removeClass("selected");

                //Highlight the correct panel
                $(this).parent().addClass("selected");
                $(this).removeClass("btn-secondary");
                $(this).addClass("btn-primary");

                //Show next step
                $("#Grp_IDOTP").show();
            });

            $(".PlanDetailSummary").on("click", function () {
                $(this).next().click();
            });

            $('button.selectPropertyTypeButton').on("click", function () {
                $('button.selectPropertyTypeButton').removeClass("selected");
                $(this).addClass("selected");
                $('#Grp-Package').show();
            });
            $("#Grp-DwellingType-MobileSelect").change(function () {
                $('#Grp-Package').show();
            });


            $("a.kpl-PlanDetailShowHide").on("click", function () {
                var CurrentText = $(this).html();
                if (CurrentText == "Show Details (+)") {
                    $(this).html("Hide Details (-)");
                }
                else $(this).html("Show Details (+)");
                $(this).prev().toggle();
            });

            $("#collapseMorePlansBtn").on("click", function () {
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
            });

        });
    } // <!--onInit-->


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


    }

    get idNumber() { return this.signUpForm.get('idNumber'); }
    get mobileNumber() { return this.signUpForm.get('mobileNumber'); }

}
