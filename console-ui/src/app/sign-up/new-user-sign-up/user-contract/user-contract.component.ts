import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';

declare var $: any
@Component({
  selector: 'app-user-contract',
  templateUrl: './user-contract.component.html',
  styleUrls: ['./user-contract.component.css']
})
export class UserContractComponent implements OnInit {

  constructor(private sbService: SidebarService) {
    this.sbService.getSidebar("newUser")
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

      $(".selectOptionalSvcsButton").on("click", function () {
        $(this).toggleClass("selected");
      });

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


}
