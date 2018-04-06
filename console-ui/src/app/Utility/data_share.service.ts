import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataShare {

  private contractDetails = new BehaviorSubject<any>('');
  userDetails = this.contractDetails.asObservable();

  constructor() { }

  getUserDetails(userDetails) {
    this.contractDetails.next(userDetails)
  }

}