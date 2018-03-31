import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';

declare var $:any
@Component({
  selector: 'app-user-recommendation',
  templateUrl: './user-recommendation.component.html',
  styleUrls: ['./user-recommendation.component.css'],
})
export class UserRecommendationComponent implements OnInit {
    constructor(private sbService:SidebarService) {
        this.sbService.getSidebar("newUser")
    }

  ngOnInit() {
    $(document).ready(function () {
      //Script on Page Load
      $("button.selectPlanButton").on("click", function () {
          //Reset the selections
          $("button.selectPlanButton").removeClass("btn-primary");
          $("button.selectPlanButton").addClass("btn-secondary");
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
