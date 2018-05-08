import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShare } from '../Utility/data_share.service';
import { getHeapStatistics } from 'v8';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  _usderDetailObj;
  _planDetailObj;
  _planBenifitArray: any = [];
  _planBenifit: string;
  _sd_amount:string;
  selectedRecmData;
  planName:any;
  productCharges:any;
  constructor(public router: Router, public datashare: DataShare) {
    this.selectedRecmData = this.datashare.usderDetailObj.selectedPlanObj;
    this.productCharges = this.datashare.emaFactSheetData;
    this.planName = this.selectedRecmData.plan.substring(0,3);
   }

  ngOnInit() {
    this.datashare.userDetails.subscribe(
      (value) => {
        this._usderDetailObj = value;
        this._planDetailObj = this._usderDetailObj.selectedPlanObj;
        this._planBenifit = this._planDetailObj.benefits;
        this._planBenifitArray = this._planBenifit.split(",");
        if(this._usderDetailObj.sd_amount == ""){
          this._sd_amount = "00.0";
        }else{
          this._sd_amount=this._usderDetailObj.sd_amount
        }
      }
    )
  }

}
