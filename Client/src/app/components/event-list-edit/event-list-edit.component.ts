import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import {EditEventService} from "../../services/edit-event.service";
import {AddEventService} from "../../services/add-event.service";
import {Url} from "../../../config/config";
import { ShareDataService } from "../../services/share-data.service";

@Component({
  selector: 'app-event-list-edit',
  templateUrl: './event-list-edit.component.html',
  styleUrls: ['./event-list-edit.component.scss']
})


export class EventListEditComponent implements OnInit {
  message:string;
  sub: Subscription; 

  placesArray: any;
  selectedPlaceForSearch: any;
  events:any;

  constructor(
    private editEventService: EditEventService,
    private httpConnectionService: AddEventService,
    private data: ShareDataService
  ) { }

  ngOnInit() {
    this.getData();
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  onChangeSelectedForSearch(event) {
    if(event) {
    let token = event.place_id;
    this.sub = this.editEventService.getEventsForEdit(token).subscribe((data: any) => {
      this.events = data;
     })
    } 
    return;
  }
  goToEditForm(event: any) {
    
    this.data.changeMessage(event);
  }
  getData(){
  
    this.sub = this.httpConnectionService.getPlaces().subscribe((data: any) => {
        this.placesArray = data;
    })
  }
  newMessage() {
    // this.data.changeMessage("Hello from Sibling")
  }
  }

