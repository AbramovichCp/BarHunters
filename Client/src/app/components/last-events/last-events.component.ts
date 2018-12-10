import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-last-events',
  templateUrl: './last-events.component.html',
  styleUrls: ['./last-events.component.scss'],
})
export class LastEventsComponent implements OnInit {
  eventsList: Event[];
  eventBlank: Event = new Event("all-events");

  slideConfigLastEvents = {
    initialSlide: 3,
    infinite: false,
    slidesToShow: 3,
    speed: 800,
    dots: true,
    dotsClass: 'my-dots slick-dots',
    prevArrow: document.getElementsByClassName('btn-prev'),
    nextArrow: document.getElementsByClassName('btn-next'),
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  constructor(
    private eventService: EventService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.getUpcomingEvents();
  }

  getUpcomingEvents() {
    this.eventService.getUpcomingEvents().subscribe(events => {
      this.eventsList = events;
      this.eventsList.unshift(this.eventBlank);
    });
  }
  public eventDetails(id: number) {
    this.modalService.openModalByEventId(id);
  }
}
