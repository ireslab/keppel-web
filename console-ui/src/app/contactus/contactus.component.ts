import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataShare } from '../Utility/data_share.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApiConstants } from '../network_layer/api_constants';
import { Http, Response, Headers } from '@angular/http';
import { ServiceCall } from '../network_layer/web_service_call';
import { Router } from '@angular/router';



declare var $: any
declare var grecaptcha: any
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactUsForm: FormGroup;

  captchaErr: boolean = false;
  isValidCaptcha: boolean = false;
  captcha: any;
  formIsNotValid: boolean = false;
  refrenceNo;
  showModal: boolean = false;
  constructor(private sbService: SidebarService, private fb: FormBuilder, public datashare: DataShare,
              public spinnerService : Ng4LoadingSpinnerService, public http: Http,public router:Router ) { }

  ngOnInit() {
    // document.getElementById('bg').style.backgroundColor = "#302c2d";
    // document.getElementById('bg').style.backgroundColor = "red";
    this.sbService.getSidebar("appTrack")
    $("#myBody").removeAttr('class');
    $("#myBody").addClass('contactBg');
    $("#footer").removeClass('mainFooter');
    $("#footer").removeClass('trackFooter');
    $("#footer").addClass('contactFooter');

    this.contactUsForm = this.fb.group({
      contactUs_Subject: [this.datashare.contactUSData.subject, [Validators.required, Validators.pattern('[A-Za-z][A-Za-z ]*$')]],
      contactUs_InquiryType: [this.datashare.contactUSData.inquiryType, [Validators.required]],
      contactUs_Name: [this.datashare.contactUSData.userName, [Validators.required, Validators.pattern('[A-Za-z][A-Za-z ]*$')]],
      contactUs_Email: [this.datashare.contactUSData.eMail, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i)]],
      // contactUs_Number: [this.datashare.contactUSData.mobileNumber, [Validators.required, Validators.pattern('[0-9]{14}$')]],
      contactUs_Number: ['', [Validators.required, Validators.pattern('(8|9)[0-9]{7}$')]],
      contactUs_Msg: [this.datashare.contactUSData.message, [Validators.required]]

    })
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

  submitContactUs() {
    this.formIsNotValid = false;
    if (this.contactUsForm.invalid) {
      for (let control in this.contactUsForm.controls) {
        this.contactUsForm.get(control).markAsTouched();
        this.contactUsForm.get(control).invalid;
        this.contactUsForm.get(control).updateValueAndValidity();
      }
      this.formIsNotValid = true;
      console.error("form is not valid")
      return;
    } else if (this.isValidCaptcha == false) {
      this.captchaErr = true;
      return;
    } else{
      let fullName = this.contactUsForm.controls['contactUs_Name'].value;
      fullName = fullName.trim();
      let index = fullName.indexOf(" ");
      this.datashare.contactUSData.firstName = fullName.substring(0,index);
      this.datashare.contactUSData.lastName = (fullName.substring(index)).trim();
      this.resetCaptcha();
      this.contactUsServerHit();
    }
  }

  contactUsServerHit() {
    if (navigator.onLine) {
      this.spinnerService.show();

      var rqst_json = JSON.stringify({
        "firstName": this.datashare.contactUSData.firstName,
        "lastName": this.datashare.contactUSData.lastName,
        "email": this.contactUsForm.controls['contactUs_Email'].value,
        "contactNumber": this.contactUsForm.controls['contactUs_Number'].value,
        "remarks": this.contactUsForm.controls['contactUs_Msg'].value
      })

      let _url = ApiConstants.GET_CONTACTUS;
      ServiceCall.httpPostCall(rqst_json, _url, this.http).subscribe(
        (data) => {
          this.spinnerService.hide()
          this.refrenceNo = data.referenceNo
          $('#downLoadRedirect').modal('show');
          
        }, (error: any) => {
          console.log(error.success)
          this.spinnerService.hide()
        })
    }
    else {
      alert("Please Check Internet Connection")
    }
  }
  redirectToHome(){
    // alert("test")
    this.router.navigateByUrl("keppel");
  }


  get contactUs_Subject() { return this.contactUsForm.get('contactUs_Subject'); }
  get contactUs_InquiryType() { return this.contactUsForm.get('contactUs_InquiryType'); }
  get contactUs_Name() { return this.contactUsForm.get('contactUs_Name'); }
  get contactUs_Email() { return this.contactUsForm.get('contactUs_Email'); }
  get contactUs_Number() { return this.contactUsForm.get('contactUs_Number'); }
  get contactUs_Msg() { return this.contactUsForm.get('contactUs_Msg'); }

}
