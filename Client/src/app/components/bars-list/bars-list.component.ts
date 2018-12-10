import { Component, OnInit } from '@angular/core';
import { Place } from '../../models/place';
import { PlaceService } from '../../services/place.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-bars-list',
  templateUrl: './bars-list.component.html',
  styleUrls: ['./bars-list.component.scss'],
})
export class BarsListComponent implements OnInit {
  places: Place[];

  slideConfigBar = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 800,
    prevArrow: document.getElementsByClassName('btn1-prev'),
    nextArrow: document.getElementsByClassName('btn1-next'),
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
  constructor(private placeService: PlaceService, private modalService: ModalService) {}

  ngOnInit() {
    this.getAllPlace();
  }

  getAllPlace() {
    this.placeService.getPlacesForHomePage().subscribe(places => {
      this.places = places;
    });
  }

  public placeDetails(id: number) {
    this.modalService.openModalByPlaceId(id);
  }
}
