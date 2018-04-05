import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { CommonServices } from '../../../commom_methods/common_service'

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {

  constructor(private sbService:SidebarService, private commonservice: CommonServices) {
    this.sbService.getSidebar("newUser")
    this.commonservice.gotoTopOfView();
  }

  ngOnInit() {
  }

}
