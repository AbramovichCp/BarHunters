import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { PlaceService } from './place.service';
import { Event } from '../models/event';
import { Place } from '../models/place';
import { EventDetailsComponent } from '../components/event-details/event-details.component';
import { PlaceDetailsComponent } from '../components/place-details/place-details.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  event: Event;
  place: Place;
  modalRef: BsModalRef;
  constructor(
    private eventService: EventService,
    private placeService: PlaceService,
    private ngxModalService: BsModalService,
    private http: HttpClient
  ) { }

  public openModalByEventId(id) {
    this.eventService.getEvent(id).subscribe((event: Event) => {
      this.showModa(EventDetailsComponent, 'event-details-modal', event);
    });
  }

  public openModalByPlaceId(id) {
    this.placeService.getPlace(id).subscribe((place: Place) => {
      this.showModa(PlaceDetailsComponent, 'place-details-modal', place);
    });
  }

  private showModa(component: any, className: string, data: any) {
    this.modalRef = this.ngxModalService.show(component,
      {
        class: className,
        initialState: {
          data: data
        }
      });
  }


  registerToEvent(id) {
    return this.http.post(`${Url}/subscribe-to-event`, {event_id: id});
  }
}
