import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';

@Component({
  selector: 'app-existing-confirmation',
  templateUrl: './existing-confirmation.component.html',
  styleUrls: ['./existing-confirmation.component.css']
})
export class ExistingConfirmationComponent implements OnInit {

  constructor(private sbService:SidebarService) {
    this.sbService.getSidebar("existingUser")
  }

  ngOnInit() {
  }

}
