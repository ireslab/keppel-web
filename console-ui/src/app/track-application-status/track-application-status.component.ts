import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

declare var $: any
@Component({
  selector: 'app-track-application-status',
  templateUrl: './track-application-status.component.html',
  styleUrls: ['./track-application-status.component.css']
})
export class TrackApplicationStatusComponent implements OnInit {

  constructor(private sbService: SidebarService) {
    this.sbService.getSidebar("appTrack")
  }

  ngOnInit() {
    var stage = ['one', 'two', 'three', 'four', 'remove'];
    var track = 3;
    $('#toggler').on('click', function () {
      console.log('clicking');
      $('.bulb-wrapper').attr('class', 'bulb-wrapper');
      $('.bulb-wrapper').addClass(stage[track % 5]);
      track++;
    });

    $('#track').on('click', function () {
      $('.page1').css('display', 'none');
      $('.page2').removeAttr('style');
    });
  }

}
