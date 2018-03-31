import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

  public mysubject = new BehaviorSubject("");
  sideBar = this.mysubject.asObservable();

  constructor() {}

   getSidebar(e) {
    this.mysubject.next(e);
  }

}
