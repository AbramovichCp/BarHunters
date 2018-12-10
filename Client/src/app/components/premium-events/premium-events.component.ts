import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-premium-event',
  templateUrl: './premium-events.component.html',
  styleUrls: ['./premium-events.component.scss'],
})
export class PremiumEventsComponent implements OnInit {
  events: Event[];

  slideConfig = {
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotsClass: 'my-dots slick-dots',
    speed: 800,
    centerMode: true,
    centerPadding: '20vw',
    focusOnSelect: true,
    zIndex: 0,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          centerPadding: '-10px',
        },
      },
      {
        breakpoint: 767,
        settings: {
          centerPadding: '10px',
        },
      },
      {
        breakpoint: 992,
        settings: {
          centerPadding: '120px',
        },
      },
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '190px',
        },
      },
      {
        breakpoint: 1600,
        settings: {
          centerPadding: '290px',
        },
      },
      {
        breakpoint: 1930,
        settings: {
          centerPadding: '390px',
        },
      },
    ],
  };
  constructor(
    private modalService: ModalService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getPremiumEvents();
  }

  getPremiumEvents() {
    this.eventService.getPremiumEvents().subscribe(events => {
      this.events = events;
    });
  }

  public eventDetails(id: number) {
    this.modalService.openModalByEventId(id);
  }
}
