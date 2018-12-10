import { Component, OnInit } from '@angular/core';
import { Directive, ViewContainerRef } from '@angular/core';
import { ShareDataService } from '../../services/share-data.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  styleUrls: ['./admin-panel.component.scss', './../../../common/formStyle.scss']
})
export class AdminPanelComponent implements OnInit {
  isViewable: boolean = false;
    isViewableEventList: boolean = false;
  public setOfForms: object = {
    changeEvent: 'chanceEventForm',
    addManager: 'addManagerForm',
    addPlace: 'addPlaceForm',
    addEvent: 'addEventForm',
    delatePlace: 'deletePlace',
    deleteEvent: 'deleteEvent'
  };
  public currentForm = 'addEventForm';


  public alertText = 'default Text';
  public showAlert(newAlertText) {
    this.alertText = newAlertText;
  }
  public showForm(formName: string ) {
    this.currentForm = formName;
  }

  constructor(
    public viewContainerRef: ViewContainerRef,
    private data: ShareDataService
  ) { }
  ngOnInit() {
    this.data.currentMessage.subscribe((data: any) => {
      if (data.event_title) {
        this.isViewable = true;
        this.isViewableEventList = false;
      } else {
        this.isViewable = false;
        this.isViewableEventList = true;
      }
      });
  }
}
