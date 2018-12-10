import { Component, OnInit, NgModule, ViewChild, OnDestroy } from '@angular/core';
import {FormDataModel} from '../../models/formContentModel';
import { Observable, of, Subscription } from 'rxjs';
import {FormGroupDirective} from '@angular/forms';
import {EditEventService} from '../../services/edit-event.service';
import {AddEventService} from '../../services/add-event.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import {Url} from '../../../config/config';
import { BsLocaleService, defineLocale } from 'ngx-bootstrap';
import { itLocale } from 'ngx-bootstrap/locale';
import { ShareDataService } from '../../services/share-data.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss' , './../../../common/formStyle.scss']
})


export class EditEventComponent implements OnInit {
  constructor(
    private editEventService: EditEventService,
     private fb: FormBuilder, 
      private httpConnectionService: AddEventService,
     private localeService: BsLocaleService,
    private data: ShareDataService
    ) 
    { 
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setFullYear(this.minDate.getFullYear() - 2);
      this.maxDate.setFullYear(this.maxDate.getFullYear() + 6);

      defineLocale('it', itLocale);
      this.localeService.use('it');
   }

    getSelectedPlace(id, placesArray) {
      let place_name: any;

      placesArray.forEach(function(i) {
         let element = placesArray.find(obj => obj.place_id == id);
         if(element) {
          place_name = element.place_name;
       }
      });
      return place_name;
    }

  ngOnInit() {
    this.defaultValue = new Date();
    this.getData();
    this.data.currentMessage.subscribe((data: any) => {
      this.insertDataToForm(data)
      });
  }

  closeForm() {
    this.data.changeMessage('false');
  }

  imageChangeUploaded(event) {
    this.selectedFile = <File> event.target.files[0];
    let name = this.selectedFile.name;;
    this.imageStatus = this.selectedFile.name;
  }

  insertDataToForm(data) {
    this.eventId = data.event_id;
    this.selectedOption = data;
    let selectedEvent = data.event_title;
    this.desValue = data.event_about;
    this.eventNameValue = data.event_title;
    this.dateValue = data.event_date;
    this.timePicker = data.event_date;
    this.selectedPlace = data.place_id;
    this.selectedArtists = data.artists;
    this.premium = data.premium;
  }

  editEvent(form: FormGroupDirective) {
    //prepare eventContent
    const createEventModel = form.value;
    createEventModel.event_id = this.eventId;
    createEventModel.dataPicker = this.mergeDateTimePickers(createEventModel.dataPicker, this.timePicker);
     createEventModel.location = this.selectedPlace;
     createEventModel.artists = this.selectedArtists;
     createEventModel.oldPosterName = this.selectedOption.event_poster;
    createEventModel.premium = this.premium;
    
    createEventModel.managers = this.getManagersId(createEventModel.location, this.managers);

    
    //prepare image
    const fdImage = new FormData();
    if(this.selectedFile) {
      fdImage.append('image', this.selectedFile, this.selectedFile.name);
      fdImage.append('locationId', this.selectedPlace);
      this.sub = this.editEventService.updateImg(fdImage).subscribe((res: any) => {})
    }
    
    this.sub = this.editEventService.updateEvent(createEventModel).subscribe((res: any) => {});
  
    form.resetForm();
    form.reset();
    this.selectedFile = null;
    this.eventId = null;
    this.defaultValue = new Date();
    this.data.changeMessage('closeForm');
  }

  mergeDateTimePickers(datePicker, timePicker) {
    
    let newDate = new Date(datePicker);
    if(timePicker){
     newDate.setHours(timePicker.getHours(), timePicker.getMinutes(), timePicker.getSeconds());
    return datePicker;}
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
      
    if(element) {
      managerId = i.manager_id;
  }
    });
    return managerId;
  }

  onChangeSelectedForSearch(event) {
    if(event) {
    let token = event.place_id;
    this.sub = this.editEventService.getEventsForEdit(token).subscribe((data: any) => {
      this.events = data;
     })
    } 
    return;
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
  })

}
  
ngOnDestroy() {
  this.sub.unsubscribe;
  this.artistsArray = null;
  this.placesArray = null;
  this.managers = null;
  this.selectedFile = null;
  this.eventLocationForImage = null;
  this.defaultValue = null;
  this.selectedPlace = null;
  this.selectedArtists = null;
  }

    //global vars
  private eventsUrl = `${Url}`; 
  buttonDisabledEventSelected: boolean = true;
  timePicker: Date = new Date(); 
  premium: boolean = false;
  sub: Subscription;
  asyncSelected: string;
  selectedOption: any;
  statesComplex: any[] = [];
  typeaheadLoading: boolean;
  valuePlace: string;
  desValue: string;
  defaultPlaceSelected: string;
  eventNameValue: string;
  dateValue: string;
  imageStatus: string = 'Choose';

  minDate: Date;
  maxDate: Date;

  formDataModel: FormDataModel = {
    eventTitle: 'Edit event title',
    dateTitle: 'Edit date',
    desTitle: 'Edit description',
    locTitle: 'Edit location',
    participantsTitle: 'Edit participants',
    posterTitle: 'Edit poster',
    buttonText: 'Edit event',
    buttonColor: 'primary',
  };
 
  bsValue = new Date();
  bsRangeValue: Date[];

//dateTimePicker
bsConfig: Partial<BsDatepickerConfig>;

  formSubmitted = false;

  displayKey: boolean;
  artistsArray: any;
  placesArray: any;
  managers: any;
  selectedFile: File  = null;
  eventLocationForImage = null;
  public defaultValue: Date;

  selectedPlaceForSearch: any;
  selectedPlace: any;
  selectedArtists: any;
  events: any;
  eventNameForSearch: string;
  eventId: any;
}
