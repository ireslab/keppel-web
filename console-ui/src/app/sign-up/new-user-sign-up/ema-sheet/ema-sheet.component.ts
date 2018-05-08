import { Component, OnInit } from '@angular/core';
import { DataShare } from '../../../Utility/data_share.service';


@Component({
  selector: 'app-ema-sheet',
  templateUrl: './ema-sheet.component.html',
  styleUrls: ['./ema-sheet.component.css']
})
export class EmaSheetComponent implements OnInit {
  _userDetailObj;
  _emaFactSheetData;
  planType;
  currentDate = new Date();
  smartMeter;
  optionalService1;
  optionalService2;
  constructor(private datashare: DataShare) {
    this._userDetailObj = JSON.parse(window.localStorage.getItem('newUserData'));
    this._emaFactSheetData = JSON.parse(window.localStorage.getItem('emaFactData'));
    var planName = this._userDetailObj.selectedPlanObj.plan.substring(0, 3);
    if (planName == "FIX" || planName == "DOT") {
      this.planType = "Standard"
    } else {
      this.planType = "Non Standard"
    }
    if (this._userDetailObj.optionalService2 != '') {
      this.smartMeter = 'Yes'
    } else {
      this.smartMeter = 'No'
    }
    if (this._userDetailObj.optionalService1 != '') {
      this.optionalService1 = this._userDetailObj.optionalService1.serviceName
    } else if (this._userDetailObj.optionalService2 != '') {
      this.optionalService2 = this._userDetailObj.optionalService2.serviceName
    }
  }

  ngOnInit() {
    document.getElementById('bg').style.backgroundColor = "#F3F3F3";
  }

}
