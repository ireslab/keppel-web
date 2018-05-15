import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

declare var $: any;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private sbService: SidebarService) { }

  ngOnInit() {
    // document.getElementById('bg').style.backgroundColor = "#302c2d";
    // document.getElementById('bg').style.backgroundColor = "red";
    this.sbService.getSidebar("appTrack")
    $("#myBody").removeAttr('class'); 
    $("#myBody").addClass('contactBg');
    $("#footer").removeClass('mainFooter');
    $("#footer").removeClass('trackFooter');
    $("#footer").addClass('contactFooter');
  }

}
