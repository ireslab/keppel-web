import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';

declare var $:any
@Component({
  selector: 'app-business-contact-details',
  templateUrl: './business-contact-details.component.html',
  styleUrls: ['./business-contact-details.component.css']
})
export class BusinessContactDetailsComponent implements OnInit {

  constructor(private sbService: SidebarService) {
    this.sbService.getSidebar("business")
  }

  ngOnInit() {
    $(document).ready(function () {
      //Script on Page Load
      $(".kpl-TimeSelector .Picker .upbutton").on("click", IncrementTime);
      $(".kpl-TimeSelector .Picker .downbutton").on("click", DecrementTime);

      //Start Chat if available
      $("#kpl-ContactUsChat").click();

      //Disable Modal dialog close on click outside
      $('#ChatModal').modal({
          backdrop: 'static',
          keyboard: false
      });

      $('#CallTimeHour, #CallTimeMin').change(function () {
          var n = $('#CallTimeHour').val();
          var m = $('#CallTimeMin').val();
          if (n < 0) $('#CallTimeHour').val(0);
          if (n > 12) $('#CallTimeHour').val(12);
          if (m > 60) $('#CallTimeMin').val(59);
          if (m < 0) $('#CallTimeMin').val(0);
      });

  });

  function IncrementTime() {
      var parentID = $(this).parent().attr("ID");
      var currentHour = parseInt($("#TimeSelectHour .display").val());
      var currentMinute = parseInt($("#TimeSelectMinute .display").val());
      var currentAMPM = $("#TimeSelectAMPM .display").val();

      if (parentID == "TimeSelectHour") {
          currentHour = ((currentHour) % 12) + 1;
          $(this).next().val(min2Digits(currentHour));
      }

      if (parentID == "TimeSelectMinute") {
          currentMinute = ((currentMinute + 1) % 60);
          $(this).next().val(min2Digits(currentMinute));
      }

      if (parentID == "TimeSelectAMPM") {
          if (currentAMPM == "AM") $(this).next().val("PM");
          if (currentAMPM == "PM") $(this).next().val("AM");
      }

  }

  function DecrementTime() {
      var parentID = $(this).parent().attr("ID");
      var currentHour = parseInt($("#TimeSelectHour .display").val());
      var currentMinute = parseInt($("#TimeSelectMinute .display").val());
      var currentAMPM = $("#TimeSelectAMPM .display").val();

      if (parentID == "TimeSelectHour") {
          currentHour = ((currentHour - 1) % 12);
          if (currentHour == 0) currentHour = 12;
          $(this).prev().val(min2Digits(currentHour));
      }

      if (parentID == "TimeSelectMinute") {
          currentMinute = ((currentMinute - 1) % 60);
          if (currentMinute == 0) currentMinute = 0o0;
          $(this).prev().val(min2Digits(currentMinute));
          if (currentMinute < 0) currentMinute = 59;
          $(this).prev().val(min2Digits(currentMinute));
      }

      if (parentID == "TimeSelectAMPM") {
          if (currentAMPM == "AM") $(this).prev().val("PM");
          if (currentAMPM == "PM") $(this).prev().val("AM");
      }
  }

  function min2Digits(n) {
      return (n < 10 ? '0' : '') + n;
  }
  }

}
