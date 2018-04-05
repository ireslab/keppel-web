import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { CommonServices } from '../../../commom_methods/common_service';
import { localJSON } from '../../../commom_methods/localJSON';

declare var $: any




@Component({
  selector: 'app-user-contract',
  templateUrl: './user-contract.component.html',
  styleUrls: ['./user-contract.component.css']
})
export class UserContractComponent implements OnInit {

  optSelected = [];



  constructor(private sbService: SidebarService, private commonService: CommonServices, private localjson: localJSON) {
    this.sbService.getSidebar("newUser")
    this.commonService.gotoTopOfView();
  }

  ngOnInit() {
    $(document).ready(function () {
      $(".selectPaymentMethodButton").on("click", function () {
        $(".selectPaymentMethodButton").removeClass("selected");
        $(this).toggleClass("selected");
      });

      $(".selectOwnerTypeButton").on("click", function () {
        $(".selectOwnerTypeButton").removeClass("selected");
        $(this).toggleClass("selected");
      });

      // $(".selectOptionalSvcsButton").on("click", function () {
      //   $(this).toggleClass("selected");
      // });

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


  optPlanSelected(index) 
  {
      if(this.optSelected.indexOf(index) == -1)
           this.optSelected.push(index);
      else
           this.optSelected.splice(this.optSelected.indexOf(index), 1);    
  }


}
