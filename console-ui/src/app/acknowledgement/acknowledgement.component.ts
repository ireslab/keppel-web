import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class AcknowledgementComponent implements OnInit {

  constructor(private sbService:SidebarService) {
    this.sbService.getSidebar("aknowNew")
  }

  ngOnInit() {
    document.getElementById('bg').style.backgroundColor = "#F3F3F3";
  }

}
