import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { DataShare } from '../Utility/data_share.service';

declare var $: any
@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class AcknowledgementComponent implements OnInit {

  constructor(private sbService:SidebarService, public router: Router, public dataShare:DataShare) {
    this.sbService.getSidebar("aknowNew")
  }

  ngOnInit() {
    // document.getElementById('bg').style.backgroundColor = "#F3F3F3";
    $("#myBody").removeAttr('class');
    $("#myBody").addClass('signupBg');
  }


  returnLogin(){
    window.localStorage.clear();
    this.router.navigateByUrl("keppel");
  }
}
