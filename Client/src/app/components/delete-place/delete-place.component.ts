import { Component, OnInit, OnDestroy } from '@angular/core';
import {PlaceService} from '../../services/place.service';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../services/alerts.service';
import { AlertType } from '../../interfaces/alert/alert-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-place',
  templateUrl: './delete-place.component.html',
  styleUrls: ['./delete-place.component.scss']
})
export class DeletePlaceComponent implements OnInit, OnDestroy {
  public places;
  private subscription: Subscription;
  
  constructor(
    private placeService: PlaceService,
    public alertService: AlertsService
  ) { }

  ngOnInit() {
    this.subscription = this.placeService.getPlaces().subscribe(data => {this.places = data;
  });
  }
  deletePlace(placeId: any) {
    console.log(placeId);
    try{
      this.placeService.deletePlace(placeId).subscribe(res => console.log(`delete response ${res}`));
      this.openSuccessAlert();
      this.placeService.getPlaces().subscribe(data => this.places = data);
    } catch (err) {
      this.openErrAlert();
    }
  }
  openErrAlert(type: AlertType = 'error') {
    this.alertService.create(type, 'Something going wrong');
  }
  openSuccessAlert(type: AlertType = 'success') {
    this.alertService.create(type, 'Place has been deleted successfully');
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
}

}
