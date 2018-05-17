import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { DataShare } from '../Utility/data_share.service';

declare var $: any
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],

})
export class LandingPageComponent implements OnInit, AfterViewInit {

  constructor(private sbService: SidebarService ,private dataShare:DataShare) {
    this.sbService.getSidebar("login")
   this.dataShare.usderDetailObj = this.test();
  }

  ngAfterViewInit() {
  
    $("#SignupButton").on("click", function () {
      $(".DeskTopButtons").animate({ opacity: 0 }, 500);
      $(".DeskTopButtons").css("visibility", "hidden");
      $(".SignupOpenClick").show();
      $(".SignupPopup").css("visibility", "visible");
      $(".SignupPopup").animate({ opacity: 1 }, 500);
    });

    $(".closeBtn").on("click", function () {
      $(".SignupPopup").animate({ opacity: 0 }, 500);
      $(".SignupPopup").css("visibility", "hidden");
      $(".SignupOpenClick").hide();
      $(".DeskTopButtons").css("visibility", "visible");
      $(".DeskTopButtons").animate({ opacity: 1 }, 500);
    })

    $(".SignupOpenClick").on("click", function () {
      $(".closeBtn").click();
    });

    // this.AdjustHeight();
  }

  // AdjustHeight() {

  //   if ($(window).width() > 991) {
  //     var totalHeight = $('.innerBody').outerHeight();
  //     var JumbotronHeight = $('.Jumbotron').outerHeight();
  //     JumbotronHeight = JumbotronHeight - (totalHeight - $(window).outerHeight());
  //     let isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
  //     if (!isIEOrEdge)
  //       $('.Jumbotron img').height(JumbotronHeight + 150);
  //     else {
  //       JumbotronHeight = 372.609
  //       $('.Jumbotron img').height(JumbotronHeight);
  //     }

  //   }

  //   return;
  // }

  ngOnInit() {
    $("#myBody").removeAttr('class');
    $("#myBody").addClass('mainBg');
    // $("#footer").removeAttr('class');
    $("#footer").addClass('mainFooter');
    // let bg = document.getElementById("myBody");
    // bg.classList.add("mainBg");
    // let ft = document.getElementById("footer");
    // ft.classList.add("mainFooter");
    // document.getElementById('bg').style.backgroundColor = "#000";
  }

test(){
  return {
    "selectedPlanObj": {
      "version": "",
      "plan": "",
      "product": "",
      "startDate": "",
      "contractDuration": '',
      "benefits": "",
      "details": "",
      "chargeType": "",
      "t1": "",
      "t2": "",
      "t3": "",
      "mssBillingCollection": "",
      "mssBasicCharges": "",
      "mssMeterReadingDataManagement": "",
      "marketDevelopmentSystemCharge": "",
      "retailSettlementUplift": "",
      "ami1Phase": "",
      "ami3Phase": "",
      "emcAdminFinal": "",
      "posAdminFinal": "",
      "monthlyEnergyUpliftChargeFinal": "",
      "allocatedRegulationChargeFinal": "",
      "usep": "",
      "heuc": "",
      "vestingCharge": "",
    },
    "sd_amount":"",
    "optionalServiceSelected": "",
    "serviceEndDate" : "",
    "serviceStartDate": "",
    "optionalService1": "",
    "optionalService2": "",
    "optionalService3": "",
    "promoCode": "",
    "paymentMethod": "",
    "icNumberType": "",
    "icNumber": "",
    "mobileNumber": "",
    "firstName": "",
    "lastName": "",
    "eMail": "",
    "postcode": "",
    "streetName": "",
    "block": "",
    "buildingName": "",
    "floorLevel": "",
    "postcodeBill": "",
    "streetNameBill": "",
    "blockBill": "",
    "buildingNameBill": "",
    "floorLevelBill": "",
    "spAccount": "",
    "premiseAddress": "",
    "premiseAddress2": "",
    "billingAddress": "",
    "billingAddress2": "",
    "premiseType": "",
    "tenantOrOwner": "",
    "promocodeAmount":"",
    "marketingConsent":"",
    "marketingEmail":"",
    "marketingSMS":"",
    "attachmentData": "",
    "attachmentName": ""
  }
}



}
