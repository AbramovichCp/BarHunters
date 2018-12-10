import { Component, OnInit, ViewChild, OnDestroy, ElementRef  } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';
import { Subscription } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';
import { AlertType } from '../../interfaces/alert/alert-type';
import { Event } from '../../models/event';
import { TouchSequence } from 'selenium-webdriver';
import { AuthService } from '../../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RegistrationService } from '../../services/registration-service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  edit: Boolean = true;
  @ViewChild('userName') userName: ElementRef;
  @ViewChild('userPhone') userPhone: ElementRef;

  isAuth: Boolean = true;
  eventsSub: Subscription;
  personalSub: Subscription;
  editPersonalSub: Subscription;
  checkTokenSub: Subscription;
  unsubFromEventSub: Subscription;
  events: Event[];
  personalInfoForm: FormGroup;

  isActiveSettings: Boolean = false;
  isAdmin: Boolean = true;
  personalInfo = {
    user_name: '',
    user_phone: '',
    user_email: ''
  };

  constructor(private alertService: AlertsService,
              private userProfile: UserProfileService,
              private auth: AuthService,
              private modalService: ModalService,
              private router: Router,
              private translate: TranslateService,
              private registrationService: RegistrationService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.getUserEvents();
    }
    if (!this.auth.isAuthenticated()) {
      this.isAuth = false;
    }

    this.getPersonalInfo();
    this.checkIfAdmin();


    this.personalInfoForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.pattern(/^[A-z]*?[\s]?[A-z]*$/)]),
      'phone': new FormControl('', [Validators.required, Validators.pattern(/^[+]?[0-9]+$/)])
    });

    this.registrationService.newEventSubject.subscribe(
      () => { this.getUserEvents(); }
    );

    this.auth.showProfileSubject.subscribe((show) => {
      this.isAuth = true;
    });

  }

  getUserEvents() {
    this.eventsSub = this.userProfile.getUserEvents().subscribe(events => {
      this.events = events.userEvents;
      const eventsId = events.userEvents.map(elem => elem.event_id );
      localStorage.setItem('user-events-id', eventsId);
    });
  }

  getPersonalInfo() {
    if (this.auth.isAuthenticated()) {
      this.personalSub = this.userProfile.getPersonalInfo().subscribe(res => {
        this.personalInfo = res.personalInfo;
      });
    }
  }

  submit(personalInfoForm: FormGroup, formDirective: FormGroupDirective) {
    const alertChangePersonalInfo = this.translate.instant('alertMessages.changePersonalInfo');
    this.editPersonalSub = this.userProfile.editPersonalInfo(personalInfoForm.value).subscribe(res => {
      this.edit = true;
      this.getPersonalInfo();
      this.alertService.create('success', alertChangePersonalInfo);
    });

  }

  unsubscribeFromEvent(id) {
    const alertUnsubscribeFromEvent = this.translate.instant('alertMessages.unsubscribeFromEvent');
    const alertUnsubscribeFromEventError = this.translate.instant('alertMessages.errorMessage');
    this.unsubFromEventSub = this.registrationService.unsubscribeFromEvent(id).subscribe(
      res => {
        this.getUserEvents();
        this.alertService.create('success', alertUnsubscribeFromEvent);
      }, err => {
        this.alertService.create('error', alertUnsubscribeFromEventError);
      }
    );
  }

  logout() {
    this.auth.logout();
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.navigated = false;
    // this.router.navigate(['/BarsHunters/home-page']);
    // this.auth.refreshHeader(true);
  }

  checkIfAdmin() {
    if (this.auth.isAuthenticated()) {

      if ( jwt_decode( this.auth.getAccessToken() ).role === 'admin' ) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

    }
  }


  ngOnDestroy() {
    if (this.eventsSub) {  this.eventsSub.unsubscribe(); }
    if (this.personalSub) {  this.personalSub.unsubscribe(); }
    if (this.editPersonalSub) { this.editPersonalSub.unsubscribe(); }
    if (this.unsubFromEventSub) { this.unsubFromEventSub.unsubscribe(); }
  }

  public userEventsDetails(id: number) {
    this.modalService.openModalByEventId(id);
  }

  toggleSettings() {
    this.isActiveSettings = !this.isActiveSettings;
  }

  focusOut() {
    setTimeout(() => {
      this.edit = true;
      this.userName.nativeElement.value = this.personalInfo.user_name;
      this.userPhone.nativeElement.value = this.personalInfo.user_phone;
    }, 100);
  }

  focusOn() {
    setTimeout(() => {
      this.personalInfoForm.controls.username.setValue(this.personalInfo.user_name, {emitEvent: false});
      this.personalInfoForm.controls.phone.setValue(this.personalInfo.user_phone, {emitEvent: false});
      this.userPhone.nativeElement.value = this.personalInfo.user_phone;
      this.userName.nativeElement.focus();
      this.edit = false;
    }, 100);
  }
}
