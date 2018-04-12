import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      //Script on Page Load
      $("#kpl-ContactUsChat").click();
  });
  }

}
