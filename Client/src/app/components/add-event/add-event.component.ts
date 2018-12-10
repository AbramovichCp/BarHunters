import {Component, OnInit, NgModule, ViewChild, OnDestroy} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {AddEventService} from '../../services/add-event.service';
import {FormDataModel} from '../../models/formContentModel';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss' , './../../../common/formStyle.scss'],
})

export class AddEventComponent implements OnInit, OnDestroy {

  // global vars
  timePicker: Date = new Date();
  sub: Subscription;
  premium: boolean = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  minDate: Date;
  maxDate: Date;
  requiredPlace: boolean  = true;
 

  artistsArray: any;
  placesArray: any;
  managers: any;
  selectedFile: File  = null;
  eventLocationForImage = null;
  imageName = 'Chosen';
  public defaultValue: Date;

  selectedPlace: any;
  selectedArtists: string[];

// dateTimePicker
  bsConfig: Partial<BsDatepickerConfig>;
  formSubmitted = false;
  displayKey: boolean;


  formDataModel: FormDataModel = {
    eventTitle: 'Add event title',
    dateTitle: 'Choose date',
    desTitle: 'Add description',
    locTitle: 'choose location',
    participantsTitle: 'Add participants',
    posterTitle: 'Choose poster',
    buttonText: 'Create event',
    buttonColor: 'primary',
  };

  constructor(private httpConnectionService: AddEventService, private formBuilder: FormBuilder) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 2);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 6);

  }
  ngOnInit() {
    this.defaultValue = new Date();
    this.getData();
}

  imageChangeUploaded(event) {
    this.selectedFile = <File> event.target.files[0];
    this.imageStatus = this.selectedFile.name;
  }

  createNewEvent(form: FormGroupDirective, eventPlace) {
    // prepare eventContent
    const createEventModel = form.value;
    createEventModel.dataPicker = this.mergeDateTimePickers(createEventModel.dataPicker, this.timePicker);

    createEventModel.premium =  this.premium;
    createEventModel.artists = this.selectedArtists;
     createEventModel.location = this.selectedPlace;
    createEventModel.managers = this.getManagersId(createEventModel.location, this.managers);
    // prepare image
    const fdImage = new FormData();
    fdImage.append('image', this.selectedFile, this.selectedFile.name);
    fdImage.append('locationId', this.selectedPlace);
    this.sub = this.httpConnectionService.createEventUploadImage(fdImage).subscribe((res: any) => {
  });
    this.sub = this.httpConnectionService.createEvent(createEventModel).subscribe((res: any) => {
    });

    // clear form value
    form.resetForm();
    form.reset();
    this.selectedFile = null;
    this.selectedArtists = null;
  
    eventPlace.reset();
    
  }

  mergeDateTimePickers(datePicker, timePicker) {
    datePicker.setHours(timePicker.getHours(), timePicker.getMinutes(), timePicker.getSeconds());
    return datePicker;
  }
  getManagersId(placeId: any, managers: any){
    placeId = placeId + '';
    let managerId: any;
    managers.forEach(function(i) {
      let arr = i.places;
      if (arr == null){
        arr = [];
      }
      let element = arr.find(obj => obj == placeId);
      
    if (element) {
      managerId = i.manager_id;
}
    });
return managerId;
  }

  getData(){
    this.sub = this.httpConnectionService.getArtists().subscribe((data: any) => {
      this.artistsArray = data;
    }),
    this.sub = this.httpConnectionService.getPlaces().subscribe((data: any) => {
        this.placesArray = data;
    }),
    this.sub = this.httpConnectionService.getManagersIdPlaces().subscribe((data: any) => {
        this.managers = data;
  }
)}
ngOnDestroy() {
  this.sub.unsubscribe;
  this.artistsArray = null;
  this.placesArray = null;
  this.managers = null;
  this.selectedFile = null;
  this.eventLocationForImage = null;
  this.imageName = null;
  this.defaultValue = null;
  this.selectedPlace = null;
  this.selectedArtists = null;
  this.requiredPlace = false;
  }

  imageStatus: string = 'File is not chosen';
}
