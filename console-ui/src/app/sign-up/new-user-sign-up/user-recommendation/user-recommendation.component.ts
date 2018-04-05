import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
<<<<<<< .mine
import { recaptcha } from '../../../recaptcha/recaptcha.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateNric } from '../../../Utility/nric_validatior'




=======
import { ApiConstants } from '../../../network_layer/api_constants';
import { ServiceCall } from '../../../network_layer/web_service_call';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers,Http,RequestOptions } from '@angular/http';
import { localJSON } from '../../../commom_methods/localJSON';
import { Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import { LoadingModule } from 'ngx-loading'
>>>>>>> .theirs





declare var $: any
declare var grecaptcha: any
@Component({
    selector: 'app-user-recommendation',
    templateUrl: './user-recommendation.component.html',
    styleUrls: ['./user-recommendation.component.css'],
    providers: [recaptcha]
})
export class UserRecommendationComponent implements OnInit {
<<<<<<< .mine

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
=======
    
    dwlTypePlans;
    dwellingTypes;
    firstTwoDwlingPlans:any = [];
    firstTwoBenifits:any = [];
    otherBenifits:any = [];
    otherdwlPlans:any = [];












>>>>>>> .theirs
    selectedDwlType;
    selectedFirstIndex:any = -1;
    selectedSecondIndex:any = -1;
    showDetails:boolean= false;
    otpForm:boolean=false;
    packageForm:boolean=false;
    public loading = false;
    public onlineOffline: boolean = navigator.onLine;
    planIndex = 2;

<<<<<<< .mine
    constructor(private sbService: SidebarService, private _recaptcha: recaptcha, private fb: FormBuilder, private router: Router) {


=======
    constructor(private sbService:SidebarService,private httpClient: HttpClient,private service:ServiceCall,
                  public localJson:localJSON, private spinnerService:Ng4LoadingSpinnerService)
     {
>>>>>>> .theirs
        this.sbService.getSidebar("newUser")
<<<<<<< .mine
        



=======
        document.documentElement.scrollTop = 0;
       this.dwlTypePlans = this.localJson.dwlTypePlans;
       this.dwellingTypes = this.localJson.dwellingTypes.dwelling_type
       
>>>>>>> .theirs
    }

<<<<<<< .mine

























































=======

    // dropDownSelect(){
    //     this.planSelected('');
    //     //$('#Grp-Package').show();
    // }
  
  firstTwoDwlPlans(){
      for (let index = 0; index < this.localJson.dwlTypePlans.length; index++) {
          if (index < 2){
             this.firstTwoDwlingPlans[index] = this.localJson.dwlTypePlans[index];
             var benefits = this.firstTwoDwlingPlans[index].benefits
             this.firstTwoBenifits = benefits.split(",")
             this.firstTwoDwlingPlans[index]["planBenifits"] = this.firstTwoBenifits;
          }else{
              this.otherdwlPlans[index-2] = this.localJson.dwlTypePlans[index];
              var benefits = this.otherdwlPlans[index-2].benefits
              this.otherBenifits = benefits.split(",")
              this.otherdwlPlans[index-2]["planBenifits"] = this.otherBenifits;
          }
          console.log(this.firstTwoDwlingPlans[0].plan)
      }
  }
//   email = "12 Months, 19% Discount Off SP Tariff, Loss"

//   let toArray =  this.email.split(",");

  planSelected(index){
      this.selectedDwlType = index;
      if(navigator.onLine){
     //   this.spinnerService.show();
        // this.firstTwoDwlPlans();
        this.getPlansCall();
      }else{
          alert('Please Check Internet Connection')
      }
       
     
       
    //   setTimeout(function() {
    //     this.spinnerService.hide();
    //   }.bind(this), 10000);
        // this.loading = true;
       
  }          
  planSelectionBtn(index){
    
     this.selectedFirstIndex = index;
     this.selectedSecondIndex = -1;
     this.otpForm = true
    //  $("#Grp_IDOTP").show();
  }
  planSlctnBtn(index){
    this.selectedSecondIndex = index;
    this.selectedFirstIndex = -1;
    this.otpForm = true
    // $("#Grp_IDOTP").show();
  }
>>>>>>> .theirs


<<<<<<< .mine
    firstTwoDwlPlans() {
        for (let index = 0; index < this.dwlTypePlans.length; index++) {
            if (index < 2) {
                this.firstTwoDwlingPlans[index] = this.dwlTypePlans[index];
            } else {
                this.otherdwlPlans[index - 2] = this.dwlTypePlans[index];
            }
        }
    }
=======
  showDetailClicked(index){
       var a = document.getElementById('show'+index).innerText
    if (a == "SHOW DETAILS (+)") {
        document.getElementById('show'+index).innerText = "Hide Details (-)";
    } else {
        document.getElementById('show'+index).innerText = "Show Details (+)"
    }
   $("#"+index).toggle();
  }
>>>>>>> .theirs

<<<<<<< .mine
    planSelected() {
        this.firstTwoDwlPlans();
    }






=======
  showHideDetailClicked(index){
    var a = document.getElementById('showHide'+index).innerText
    if (a == "SHOW DETAILS (+)") {
       document.getElementById('showHide'+index).innerText = "Hide Details (-)";
    } else {
       document.getElementById('showHide'+index).innerText = "Show Details (+)"
    }
   $("#"+"detail"+index).toggle();
 }
>>>>>>> .theirs



   

<<<<<<< .mine














































































=======
   
   getPlansCall(){
      
    let _url = ApiConstants.GET_PLANS_URL;

    let localURL ="https://api.github.com/users/AkshayKumar-123" //"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    
    // getWriterWithFavBooks() {
        this.service.getYahoo(localURL).subscribe(
            data => { 
               this.spinnerService.hide();
               this.packageForm = true;
               this.firstTwoDwlPlans();
            },(error:any) =>{
                alert("Something went wrong")
            }
            );
    //   } 




    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    // this.httpClient.get(_url,{headers: headers}).subscribe(data => {
    //     alert('Success')
    //     console.log(data);
    // },(error:any) => {
    //     alert(error.message)
    // })



    // ServiceCall.httpGetCall(_url,'').subcribe (
    //     (data) => {
    //         alert('Success')
    //         console.log(data);
    //     },
    //     (error: any) => {
    //         alert('ServiceFail')
    //         console.log(error);
    //     }
    // )

   }

   moreLessClicked(){
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
    
    $(document).ready(function () {
      //Script on Page Load
    //   $('button.selectPlanButton').on("click", function () {
    //       //Reset the selections
    //       $('button.selectPlanButton').removeClass("btn-primary");
    //       $('button.selectPlanButton').addClass("btn-secondary");
    //       $(".PlanDetailCard").removeClass("selected");
>>>>>>> .theirs

<<<<<<< .mine



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
=======
    //             //Highlight the correct panel
    //             $(this).parent().addClass("selected");
    //             $(this).removeClass("btn-secondary");
    //             $(this).addClass("btn-primary");


















>>>>>>> .theirs

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
