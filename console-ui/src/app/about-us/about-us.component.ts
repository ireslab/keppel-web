import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

declare var $:any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private sbService:SidebarService) { }

  ngOnInit() {
        // document.getElementById('bg').style.backgroundColor = "#302c2d";
    // document.getElementById('bg').style.backgroundColor = "red";
    this.sbService.getSidebar("appTrack")
    $("#myBody").removeAttr('class'); 
    $("#myBody").addClass('trackBg');
    $("#footer").removeClass('mainFooter'); 
    $("#footer").addClass('trackFooter');

    $("#kpl-ContactUsChat").click();
  }

}
