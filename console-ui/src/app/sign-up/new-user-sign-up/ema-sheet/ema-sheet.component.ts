import { Component, OnInit } from '@angular/core';
import { DataShare } from '../../../Utility/data_share.service';


@Component({
  selector: 'app-ema-sheet',
  templateUrl: './ema-sheet.component.html',
  styleUrls: ['./ema-sheet.component.css']
})
export class EmaSheetComponent implements OnInit {
  _userDetailObj;
  constructor(private datashare: DataShare) {
    this.datashare.usderDetailObj = JSON.parse(window.localStorage.getItem('newUserData'));
   }

  ngOnInit() {
    // this.datashare.userDetails.subscribe(
    //   (value) => {
    //     console.log("value")
    //     console.log(value)
    //     this._userDetailObj = value;
    //   }
    // );
    alert(this.datashare.usderDetailObj.firstName + ' ' + this.datashare.usderDetailObj.lastName)
  }

}
