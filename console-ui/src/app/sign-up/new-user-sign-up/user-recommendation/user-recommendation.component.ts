import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';

declare var $: any
@Component({
    selector: 'app-user-recommendation',
    templateUrl: './user-recommendation.component.html',
    styleUrls: ['./user-recommendation.component.css'],
})
export class UserRecommendationComponent implements OnInit {

    dwellingTypes = ['HDB 1/2','HDB 3','HDB 4','HDB 5','Condominium','Landed Property','Others']
    dwlTypePlans  = [  
                        {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']},  
                        {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']},  
                        {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']},  
                        {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']},  
                        {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']},  
                        {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']},  
                        {"planName":"SMART", "monthlyBill":"$59*","discount":"17% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']},  
                        {"planName":"CLEAN", "monthlyBill":"$59*","discount":"19% LESS","details":['24 Months','Peak Rate (7am to 11pm): $0.1/kwh','Off Peak Rate(11pm to 7am): $0.01/kwh','All charges are absorbed','Consumption is loss adjusted']}  
                  ] 
    firstTwoDwlingPlans:any = [];
    otherdwlPlans:any = [];

    constructor(private sbService:SidebarService) {
        this.sbService.getSidebar("newUser")
    }

  
  firstTwoDwlPlans(){
      for (let index = 0; index < this.dwlTypePlans.length; index++) {
          if (index < 2){
            this.firstTwoDwlingPlans[index] = this.dwlTypePlans[index];
          }else{
              this.otherdwlPlans[index-2] = this.dwlTypePlans[index];
          }
      }
  }
 
  planSelected(){
       this.firstTwoDwlPlans();
  }
               







  ngOnInit() {
    
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
    }

}
