import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { DataShare } from '../../../Utility/data_share.service';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  _usderDetailObj = {}
  constructor(private sbService: SidebarService, private DS: DataShare) {
    this.sbService.getSidebar("newUser")
  }

  ngOnInit() {
    this.DS.userDetails.subscribe(
      (value) => {
        this._usderDetailObj = value
        console.log(JSON.stringify(value))
      }
    )
  }

}
