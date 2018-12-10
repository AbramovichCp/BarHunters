import { Component, OnInit, Inject } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { BsModalRef } from 'ngx-bootstrap/modal/';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss'],
})

export class PlaceDetailsComponent implements OnInit {
  events: Event[];
  event: Event;
  data: Event;
  hiddenData: string;
  eventCount: number;
  status: boolean = true; 
  selectedIndex : number = null;
  
  constructor(private eventService: EventService,
    public modalRef: BsModalRef,
  ) { }
  
  ngOnInit() {
    this.getEventsByPlace(this.data.place_id);
  }

  getEventsByPlace(id) {
    this.eventService.getEventsByPlaceId(id).subscribe(event => {
      this.events = event;
      this.eventCount = this.events.length;
    });
  }

  showEventDetails(id: number, i: number) {
    this.selectedIndex = i;
    this.status = false;
    this.eventService.getEvent(id).subscribe(data => {
      this.event = data;
      return this.hiddenData = `
      <div class="about-event-block">
        <h4 class="event-title">${this.event.event_title}</h4>
        <p>${this.event.event_about}</p>
      </div>
      <img class="img-cover" src="${this.event.event_poster}" alt="${this.event.event_title}">
      `;
    });
  }

  hideEventDetails() {
    if (this.status === false) {
    this.status = !this.status;
    this.selectedIndex = null;
    }
  }

}
