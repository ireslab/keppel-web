import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { ApiConstants } from '../../../network_layer/api_constants';
import { ServiceCall } from '../../../network_layer/web_service_call';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers,Http,RequestOptions } from '@angular/http';
import { localJSON } from '../../../localJSON';

declare var $: any
@Component({
    selector: 'app-user-recommendation',
    templateUrl: './user-recommendation.component.html',
    styleUrls: ['./user-recommendation.component.css'],
})
export class UserRecommendationComponent implements OnInit {
    
    dwlTypePlans;
    dwellingTypes;
    firstTwoDwlingPlans:any = [];
    otherdwlPlans:any = [];
    selectedFirstIndex:any = -1;
    selectedSecondIndex:any = -1;
    showDetails:boolean= false;
    show:boolean=false

    constructor(private sbService:SidebarService,private httpClient: HttpClient,private service:ServiceCall,
                  public localJson:localJSON) {
        this.sbService.getSidebar("newUser")
       this.dwlTypePlans = this.localJson.dwlTypePlans;
       this.dwellingTypes = this.localJson.dwellingTypes
    }

  
  firstTwoDwlPlans(){
      for (let index = 0; index < this.localJson.dwlTypePlans.length; index++) {
          if (index < 2){
            this.firstTwoDwlingPlans[index] = this.localJson.dwlTypePlans[index];
          }else{
              this.otherdwlPlans[index-2] = this.localJson.dwlTypePlans[index];
          }
      }
  }
 

  planSelected(){
       this.firstTwoDwlPlans();
      // this.getPlansCall();
  }          

  planSelectionBtn(index){
     this.selectedFirstIndex = index;
     this.selectedSecondIndex = -1;
     $("#Grp_IDOTP").show();
  }
  planSlctnBtn(index){
    this.selectedSecondIndex = index;
    this.selectedFirstIndex = -1;
    $("#Grp_IDOTP").show();
  }


  showDetailClicked(index){
       var a = document.getElementById('show'+index).innerText
    if (a == "SHOW DETAILS (+)") {
        document.getElementById('show'+index).innerText = "Hide Details (-)";
    } else {
        document.getElementById('show'+index).innerText = "Show Details (+)"
    }
   $("#"+index).toggle();
  }

  showHideDetailClicked(index){
    var a = document.getElementById('showHide'+index).innerText
    if (a == "SHOW DETAILS (+)") {
       document.getElementById('showHide'+index).innerText = "Hide Details (-)";
    } else {
       document.getElementById('showHide'+index).innerText = "Show Details (+)"
    }
   $("#"+"detail"+index).toggle();
 }



   

   
   getPlansCall(){
    let _url = ApiConstants.GET_PLANS_URL;

    let localURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    
    // getWriterWithFavBooks() {
        this.service.getYahoo(localURL).subscribe(
            data => { 
                alert('success');
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






  ngOnInit() {
    
    $(document).ready(function () {
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
    }

}
