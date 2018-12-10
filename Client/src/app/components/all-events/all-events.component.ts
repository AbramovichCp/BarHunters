import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Event, Implicit } from '../../models/event';
import { EventService } from '../../services/event.service';
import { ModalService } from '../../services/modal.service';
import { ShareDataService } from '../../services/share-data.service';
import { loadMoreAnimation } from '../../animation';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss'],
  animations: [loadMoreAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush // TODO remove detection strategy
})
export class AllEventsComponent implements OnInit, OnDestroy {
  incoming: Implicit;
  eventsAll: Event[] = [];
  years: number[];
  page: number;
  hide: boolean = false;
  totalEvents: number;
  searchResult: any[];
  searchResultHeader: boolean;
  unsubscribeAll = new Subject();

  constructor(
    private modalService: ModalService,
    private eventService: EventService,
    private shareDataService: ShareDataService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.pipe(takeUntil(this.unsubscribeAll)).subscribe(params => {
      if (Object.keys(params).length !== 0 && params.constructor === Object) {
        this.searchResult = JSON.parse(params.searchResult);
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.pipe(takeUntil(this.unsubscribeAll)).subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

    this.shareDataService.currentsearchResultHeader.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(searchResultHeader => this.searchResultHeader = searchResultHeader);

  }

  ngOnInit() {
    this.page = 1;
    if (this.searchResult !== undefined) {
      this.eventsAll = this.searchResult;
      this.searchResultHeader = (this.searchResult.length > 0 || this.searchResult !== undefined);
    }
    else {
      this.getYears();
      this.getSortedAllEvents();
      this.searchResultHeader = false;
    }
    this.shareDataService.changesearchResultHeader(this.searchResultHeader);
  }

  getSortedAllEvents() {
    this.eventService.getSortedAllEvents(this.page).subscribe(events => {
      this.incoming = events;
      this.incoming.response.forEach(event => {
        this.eventsAll.push(event);
      });
      this.totalEvents = this.incoming.totalEvents;
      this.ref.markForCheck();
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getYears() {
    this.eventService.getSortedAllEvents(this.page).subscribe(events => {
      this.incoming = events;
      let x = [];
      for (let event of this.incoming.response) {
        x.push(new Date(event.event_date).getFullYear());
      }
      this.years = x.filter(this.onlyUnique).sort((a: any, b: any) => (b - a));
    });
    this.ref.markForCheck();
  }

  addUniqueYear(years: number[], year: number) {
    if (!years.includes(year)) {
      years.push(year);
    }
  }

  loadMore() {
    this.page += 1;
    this.eventService.getSortedAllEvents(this.page).subscribe(events => {
      this.incoming = events;
      const tmp = [];
      this.incoming.response.forEach(event => {
        tmp.push(event);
        this.addUniqueYear(this.years, new Date(event.event_date).getFullYear());
      });
      this.eventsAll = [...this.eventsAll, ...tmp];
      this.hide = (this.totalEvents === this.eventsAll.length);
      this.ref.markForCheck();
    });
  }

  public eventDetails(id: number) {
    this.modalService.openModalByEventId(id);
  }

  scrollTo(yPoint: number, duration: number) {
    setTimeout(() => {
      window.scrollTo(0, yPoint);
    }, duration);
    return;
  }

  scrollToBottom(className: string): void {
    setTimeout(() => {
      const elementList = document.querySelectorAll(className);
      const element = elementList[0] as HTMLElement;
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 1000);
  }

  currentYPosition() {
    if (self.pageYOffset) { return self.pageYOffset; }
    if (document.documentElement && document.documentElement.scrollTop) { return document.documentElement.scrollTop; }
    if (document.body.scrollTop) { return document.body.scrollTop; }
    return 0;
  }

  smoothScrollToTop() {
    const startY = this.currentYPosition();
    const stopY = 0;
    const distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      window.scrollTo(0, stopY);
      return;
    }
    let speed = Math.round(distance / 100);
    const step = speed;
    speed = Math.max(0.8, speed);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
      for (let i = startY; i < stopY; i += step) {
        this.scrollTo(leapY, timer * speed);
        leapY += step;
        if (leapY > stopY) {
          leapY = stopY;
          timer++;
        }
      }
      return;
    } else {
      for (let i = startY; i > stopY; i -= step) {
        this.scrollTo(leapY, timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
          timer++;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.searchResult = [];
  }

}
