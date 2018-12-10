import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShareDataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private searchResultHeaderSource = new BehaviorSubject<boolean>(false);
  currentsearchResultHeader = this.searchResultHeaderSource.asObservable();

  private searchCollapseSource = new BehaviorSubject<boolean>(true);
  currentSearchCollapse = this.searchCollapseSource.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  changesearchResultHeader(searchResultHeader: boolean) {
    this.searchResultHeaderSource.next(searchResultHeader);
  }

  changeSearchCollapse(searchCollapse: boolean) {
    this.searchCollapseSource.next(searchCollapse);
  }

}
