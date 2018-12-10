/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Place } from '../../models/place';
import { PlaceService } from '../../services/place.service';
import { ValidateService } from '../../services/validator.service';
import { MapsAPILoader} from '@agm/core';
// import {} from '@types/googlemaps';
import { AlertsService } from '../../services/alerts.service';
import { AlertType } from '../../interfaces/alert/alert-type';
import { from } from 'rxjs';
declare var google: any;


@Component({
  selector: 'app-add-places',
  templateUrl: './add-places.component.html',
  styleUrls: ['./add-places.component.scss' , './../../../common/formStyle.scss']
})
export class AddPlacesComponent implements OnInit {
  public addPlaceForm: FormGroup;
  private newPlace: Place;
  private places: object[];
  public selectedPlace: string[];
  private submitForm() {
    this.newPlace = {
      place_name: this.addPlaceForm.value.placeName,
      place_address: this.addPlaceForm.value.placeAddres,
      place_contact: '+380' + this.addPlaceForm.value.placeContactNumber,
      place_capacity: this.addPlaceForm.value.placeCapacity,
      place_type:  'bar',
      event_poster: '',
      place_photo: 'bartka.jpg',
      place_coords: [this.coords[0], this.coords[1]],
      place_id: null,
    };
    this.placeServise.addPlace(this.newPlace).subscribe((res) => {
    });
    this.openAlert();
    this.addPlaceForm.reset();
  }
//gmapStatus
  latitude = 48.28614105264287;
  longitude = 25.93828805284113;
  locationChosen: boolean = true;
  gmapStatus: boolean = false;
  coords = [];
  address: string;

  @ViewChild('search') public searchElement: ElementRef;

  constructor(
    private placeServise: PlaceService,
    private formBuilder: FormBuilder,
    private validator: ValidateService,
    private MapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private alertService: AlertsService
     ) {
    this.addPlaceForm = this.formBuilder.group({
      'placeName': [null, this.validator.name()],
      'placeAddres': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ])],
      'placeContactNumber': [null, this.validator.phone()],
      'placeCapacity': [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(4),
      ])],
    });
  }
  ngOnInit() {
    this.placeServise.getPlaces().subscribe((data: object[]) => {
      this.places = data;
    });
    this.MapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"]});
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run (() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if(place.geometry === undefined || place.geometry === null ) {
              return;
            }
            this.coords[0]=place.geometry.location.lat();
            this.coords[1]=place.geometry.location.lng();
            this.address = place.name;
            this.addPlaceForm.value.placeAddres = this.address;
            this.latitude = this.coords[0];
            this.longitude = this.coords[1];
            console.log(place)
          })
        })
      }
    )
  }
  openAlert(type: AlertType = 'success') {
    this.alertService.create(type, 'Place has been added successfully');
  }
  getNameErrMsg() {
    return this.validator.getNameErrMsg(this.addPlaceForm.controls.placeName);
  }
  getPlaceErrMsg() {
    return this.validator.getLocationErrMsg(this.addPlaceForm.controls.placeAddres);
  }
  getPhoneErrMsg() {
    return this.validator.getPhoneErrMsg(this.addPlaceForm.controls.placeContactNumber);
  }

  openGoogleMaps(){
    this.gmapStatus = !this.gmapStatus;
  }

  onChoseLocation(event){
    this.locationChosen = true;
    this.coords[0] = event.coords.lat;
    this.coords[1] = event.coords.lng ;
    this.getAddress(event.coords.lat, event.coords.lng); 
  }

  confirmCoords(){
    this.gmapStatus = !this.gmapStatus;
  }

  getAddress(lat: number, lng: number) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = {latLng: latlng};
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            this.address=(rsltAdrComponent[resultLength - 7].short_name+", "+rsltAdrComponent[resultLength - 8].short_name);
            this.addPlaceForm.value.placeAddres = this.address;
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }
}
