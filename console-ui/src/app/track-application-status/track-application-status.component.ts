import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiConstants } from '../network_layer/api_constants';
import { Http, Response, Headers } from '@angular/http';
import { ServiceCall } from '../network_layer/web_service_call';
import { DataShare } from '../Utility/data_share.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { recaptcha } from '../recaptcha/recaptcha.component';


declare var $: any
declare var grecaptcha: any

@Component({
  selector: 'app-track-application-status',
  templateUrl: './track-application-status.component.html',
  styleUrls: ['./track-application-status.component.css', '../../assets/css/track.css'],
  providers: [recaptcha]

})
export class TrackApplicationStatusComponent implements OnInit {

  trackForm: FormGroup;
  trackStatus: boolean = false;
  trackValue;
  captchaErr: boolean = false;
  isValidCaptcha: boolean = false;
  trackIDError: boolean = false;
  captcha: any;
  appNumber = '';

  constructor(private sbService: SidebarService, private spinner: Ng4LoadingSpinnerService,
    private http: Http, private dataShare: DataShare, private serverCall: ServiceCall,
    private formBuilder: FormBuilder, private _recaptcha: recaptcha) {
    this.sbService.getSidebar("appTrack")
  }


  ngOnInit() {
    document.getElementById('bg').style.backgroundColor = "#302c2d";
    this.trackForm = this.formBuilder.group({
      trackAppNumber: ['', [Validators.required, Validators.pattern('[0-9]{14}$')]]
    })
  }

  trackIDEntered(event) {
    if (event.target.value.length == 14) {
      this.dataShare.trackAppNumber = event.target.value;
      this.trackIDError = false
    }
    this.appNumber = event.target.value
  }

  trackClicked() {
    if (this.trackForm.invalid) {
      for (let control in this.trackForm.controls) {
        this.trackForm.get(control).markAsTouched();
        this.trackForm.get(control).invalid;
        this.trackForm.get(control).updateValueAndValidity();
      }
      this.trackIDError = true
      return;
    }
    // if(this.appNumber.length != 14 || this.appNumber == 'undefined'){
    //    this.trackIDError = true
    //    return;
    // }
    else if (this.isValidCaptcha == false) {
      this.captchaErr = true;
      return;
    } else {
      this.spinner.show()
      this.resetCaptcha();
      // var localURL = "http://192.168.0.4:7001/keppelconsumer/v1/newResiSignup"  //"http://192.168.0.4:7001/keppelconsumer_2"//"http://192.168.0.4:7001/keppelconsumer/v1/newResiSignup";
      let _url = ApiConstants.GET_APP_STATUS + this.dataShare.trackAppNumber;
      this.serverCall.getPlans(_url).subscribe(
        data => {
          if (data.success == 'true') {
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
          alert(error.message)
        }
      );
    }


  }

  updateTrackStatus() {
    //document.getElementById('bg').style.display = "none";
    document.getElementById('bg').style.backgroundColor = "#302c2d";
    var stage = ['one', 'two', 'three', 'four', 'remove'];
    var track;
    if (this.trackValue == 'I') {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[0]);
    } else if (this.trackValue == 'WCP') {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[1]);
    } else if (this.trackValue == 'VF') {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[2]);
    } else if (this.trackValue == 'C') {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[3]);
    } else {
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[4]);
    }

  }

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

  get trackAppNumber() { return this.trackForm.get('trackAppNumber'); }

}
