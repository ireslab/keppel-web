import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';

declare var $:any
@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  constructor(private sbService: SidebarService) {
    this.sbService.getSidebar("business")
  }

  ngOnInit() {
    $(document).ready(function () {
      //Script on Page Load
      $("button.selectPlanButton").on("click", function () {
          //Reset the selections
          $("button.selectPlanButton").show();
          $("div.card").removeClass("planSelected");

          //Highlight the correct panel
          $(this).hide();
          $(this).parent().parent().addClass("planSelected");
      });
      $('button.selectPropertyTypeButton').on("click", function () {
          $('button.selectPropertyTypeButton').removeClass("selected");
          $(this).addClass("selected");
          $('#Grp-Package').show();
      });
  });
  function selectPlan() {
      //alert($(this).parent().html());
      //$(this).parentsUntil(".card").addClass("PlanSelected");
  }
  }

}
