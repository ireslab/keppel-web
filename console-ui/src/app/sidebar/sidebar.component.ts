import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  login: boolean = false;
  newUser: boolean = false;

  constructor(private sbService: SidebarService) { }

  ngOnInit() {
    this.sbService.sideBar.subscribe(
      (value) => {
        if (value == "login") {
          this.login = true;
        } else if (value == "newUser") {
          this.newUser = true;
        } else {
          console.log("No value found for sidebar")
        }
      });
  }
}