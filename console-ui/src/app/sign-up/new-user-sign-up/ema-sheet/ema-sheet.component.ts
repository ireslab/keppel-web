import { Component, OnInit } from '@angular/core';
import { DataShare } from '../../../Utility/data_share.service';


@Component({
  selector: 'app-ema-sheet',
  templateUrl: './ema-sheet.component.html',
  styleUrls: ['./ema-sheet.component.css']
})
export class EmaSheetComponent implements OnInit {
  _userDetailObj;
  planType;
  currentDate = new Date();
  constructor(private datashare: DataShare) {
    this._userDetailObj = JSON.parse(window.localStorage.getItem('newUserData'));
    var planName = this._userDetailObj.selectedPlanObj.plan.substring(0, 5);
    if(planName == "FIXED")
      {
        this.planType = "Fixed price plan"
      }else {
        this.planType = "Non Standard"
      }
   }

  ngOnInit() {
    // this.datashare.userDetails.subscribe(
    //   (value) => {
    //     console.log("value")
    //     console.log(value)
    //     this._userDetailObj = value;
    //   }
    // );
  }

}
