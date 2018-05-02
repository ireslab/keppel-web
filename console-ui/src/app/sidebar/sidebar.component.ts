import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  login: boolean = false;
  newUser: boolean = false;
  existingUser: boolean = false;
  aknowNew: boolean = false;
  business: boolean = false;
  appTrack: boolean = false;


  constructor(private sbService: SidebarService, private router:Router) { }

  ngOnInit() {
    this.sbService.sideBar.subscribe(
      (value) => {
        console.log(value)
        if (value == "login") {
          this.login = true;
        } else if (value == "newUser") {
          this.newUser = true;
        } else if (value == "aknowNew") {
          this.aknowNew = true;
        } else if (value == "existingUser") {
          this.existingUser = true;
        }else if (value == "business") {
          this.business = true;
        }else if (value == "appTrack") {
            this.appTrack = true;
        }else {
          console.log("No value found for sidebar")
        }
       
      });
  }
}