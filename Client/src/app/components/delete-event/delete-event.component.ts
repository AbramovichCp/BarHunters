import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import {FormGroupDirective} from '@angular/forms';
import { mergeMap, map } from 'rxjs/operators';
import {DeleteEventService} from '../../services/delete-event.service';
import {Url} from '../../../config/config';
import {TokenModel} from '../../models/dataModel';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss' , './../../../common/formStyle.scss']
})
export class DeleteEventComponent implements OnInit {

  sub: Subscription;
  private eventsUrl = `${Url}`; // URL to web api
  asyncSelected: string;
  disabledButton: boolean = true;
  statesComplex: any[] = [];
  typeaheadLoading: boolean;
  constructor(private deleteEventService: DeleteEventService) {} 

changeTypeaheadLoading(e: boolean): void {
  this.disabledButton = true;
  this.typeaheadLoading = e;
  if(this.asyncSelected.length <= 0) {return} 
  else {
    this.sub = this.deleteEventService.getMergedEvents(this.asyncSelected)
    .subscribe((data: any) => {
      this.statesComplex = data;
    } 
  )}
  }
  ngOnInit() {}
  deleteEvent(form: FormGroupDirective) {
    const token: TokenModel = {
      tokenName: this.asyncSelected
    }
    this.deleteEventService.deleteEvent(token)
    .subscribe((data: any) => {
    })
    this.asyncSelected = null;
    this.disabledButton = true;
  }
  onSelect(event) {
    this.disabledButton = false;
  }

  // ngOnDestroy() {
  //   this.statesComplex = null;
  //   this.sub.unsubscribe();
  // }
}
