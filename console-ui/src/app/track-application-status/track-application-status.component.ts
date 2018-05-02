import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiConstants } from '../network_layer/api_constants';
import { Http, Response, Headers } from '@angular/http';
import { ServiceCall } from '../network_layer/web_service_call';
import { DataShare } from '../Utility/data_share.service';


declare var $: any
@Component({
  selector: 'app-track-application-status',
  templateUrl: './track-application-status.component.html',
  styleUrls: ['./track-application-status.component.css']
})
export class TrackApplicationStatusComponent implements OnInit {

  trackStatus:boolean = false;
  trackValue;
  constructor(private sbService: SidebarService,private spinner: Ng4LoadingSpinnerService,
                 private http:Http,private dataShare:DataShare, private serverCall: ServiceCall) {
    this.sbService.getSidebar("appTrack")
  }


  ngOnInit() {
    // var stage = ['one', 'two', 'three', 'four', 'remove'];
    // var track = 4;
    // // $('#toggler').on('click', function () {
    //   console.log('clicking');
    //   $('.bulb-wrapper').attr('class', 'bulb-wrapper');
    //   $('.bulb-wrapper').addClass(stage[track % 5]);
    //   console.log([track % 5])
    //   track++;
    // });

    // $('#track').on('click', function () {
    //   $('.page1').css('display', 'none');
    //   $('.page2').removeAttr('style');
    // });
  }

  trackIDEntered(event){
    if(event.target.value.length >= 10){
      this.dataShare.trackAppNumber = event.target.value;
    }
    }

    trackClicked(){
    this.spinner.show()

      // var localURL = "http://192.168.0.4:7001/keppelconsumer/v1/newResiSignup"  //"http://192.168.0.4:7001/keppelconsumer_2"//"http://192.168.0.4:7001/keppelconsumer/v1/newResiSignup";
      let _url = ApiConstants.GET_APP_STATUS+this.dataShare.trackAppNumber;
      this.serverCall.getPlans(_url).subscribe(
        data => {
          if(data.success == 'true'){
            this.trackValue = data.image
            $('.page1').css('display', 'none');
            $('.page2').removeAttr('style');
            this.trackStatus = false
            this.updateTrackStatus();
          }
          else {
            this.trackStatus = true
          }
            this.spinner.hide()
          
        }, (error: any) => {
          this.spinner.hide();
          alert("error")
        }
      );
     
    
  }

  updateTrackStatus(){
    var stage = ['one', 'two', 'three', 'four', 'remove'];
    var track;
    if(this.trackValue == 'I')
    {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[0]);
    } else if(this.trackValue == 'WCP') {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[1]);
    } else if(this.trackValue == 'VF'){
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[2]);
    } else if(this.trackValue == 'C'){
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[3]);
    } else {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[4]);
    }
      
  }

}
