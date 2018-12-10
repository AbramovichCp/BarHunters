import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, NavigationExtras } from '@angular/router'

import { PlaceService } from '../../services/place.service';
import { EventService } from '../../services/event.service';
import { ShareDataService } from '../../services/share-data.service';

import { Place } from '../../models/place';
import { Event } from '../../models/event';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  bsValue = new Date();
  dateRangeValue: Date[];
  places: Place[] = [];
  events: Event[] = [];
  selectedPlacesIDs: number[] = [];
  searchEventName: string;
  calendarDates: string[] = [];
  searchCollapse: boolean;
  wasInside: boolean = false;

  constructor(
    private placeService: PlaceService,
    private eventService: EventService,
    private shareDataService: ShareDataService,
    private router: Router
  ) {
    this.dpConfig.containerClass = 'theme-red';
    this.dpConfig.dateInputFormat = 'DD-MM-YYYY';
  }

  ngOnInit() {
    this.getBars();
  }

  changeCollapse() {
    this.searchCollapse = true;
    this.shareDataService.changeSearchCollapse(this.searchCollapse);
  };

  getBars() {
    this.placeService.getPlaces().subscribe(places => {
      this.places = places;
    })
  }

  dateFormat(date) {
    let yyyyMmDd = new Date(date),
      mm = '' + (yyyyMmDd.getMonth() + 1),
      dd = '' + yyyyMmDd.getDate(),
      yyyy = yyyyMmDd.getFullYear();
    if (mm.length < 2) { mm = '0' + mm }
    if (dd.length < 2) { dd = '0' + dd }
    return [yyyy, mm, dd].join('-');
  }

  dateFromInput(dateFromDatePicker) {
    let searchDateStart, searchDateEnd;
    if (dateFromDatePicker !== undefined && dateFromDatePicker !== null && dateFromDatePicker !== '') {
      searchDateStart = dateFromDatePicker[0].toISOString();
      searchDateEnd = dateFromDatePicker[1].toISOString();
      this.calendarDates.push(searchDateStart, searchDateEnd);
      return this.calendarDates;
    }
    else {
      return '';
    }
  }

  navigate(searchResult) {
    let navigationExtras: NavigationExtras = {
      queryParams: { searchResult }
    }
    this.router.navigate(['BarsHunters/all-events'], navigationExtras);
  }

  search() {
    let elem = document.getElementById('search');
    elem.classList.remove('search_active');
    let foundEvents: string;
    this.dateFromInput(this.dateRangeValue);
    const searchPlaces = this.selectedPlacesIDs.toString();
    const searchDates = this.calendarDates.toString();
    const searchEvent = (this.searchEventName == undefined) ? this.searchEventName = '' : this.searchEventName.toString().toLowerCase();

    let searchQueryObj =
    {
      "searchPlaces": searchPlaces,
      "searchDates": searchDates,
      "searchEvent": searchEvent
    };
    let searchQuery = JSON.stringify(searchQueryObj);
    this.eventService.search(searchQuery).subscribe(data => {
      const tmp = [];
      data.forEach(event => {
        tmp.push(event);
      });
      this.events = [...tmp];
      foundEvents = JSON.stringify(this.events);
      this.navigate(foundEvents);
      this.calendarDates = [];
    })
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.search();
      this.changeCollapse();
    }
    else if (event.keyCode == 27) {
      this.changeCollapse()
    }
  }

}
