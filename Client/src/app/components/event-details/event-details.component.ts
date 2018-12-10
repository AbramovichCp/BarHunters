import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { RegistrationService } from '../../services/registration-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  data: any;
  constructor(
    public modalRef: BsModalRef,
    private registrationService: RegistrationService,
    private auth: AuthService,
    private router: Router,
    public alertService: AlertsService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.eventButtonStatus();
  }

  registerOnEvent(id: number) {
    const registerOnEventMessage = this.translate.instant('alertMessages.registerOnEvent');
    if (this.auth.isAuthenticated()) {
      this.registrationService.registerToEvent(id).subscribe(res => {
        this.alertService.create('success', registerOnEventMessage);
        this.registrationService.refreshEvent();
      });
    } else {
      this.router.navigate(['/BarsHunters/sign-in']);
    }
  }
  eventButtonStatus() {
    const registerAndUnregisterButton = this.translate.instant('eventDetails.ifRegistered');
    const registerButton = document.getElementById('button-for-registration');
    const modalFooterinformation = document.getElementsByClassName('if-user-registered')[0];
    const arrayOfEventRegistration = localStorage.getItem('user-events-id');
    if (arrayOfEventRegistration != null) {
      const arrayOfRegisteredEvents = arrayOfEventRegistration.split(',');
      for (let i = 0; i < arrayOfRegisteredEvents.length; i++) {
        if (this.data.event_id == arrayOfRegisteredEvents[i]) {
          registerButton.style.display = 'none';
          modalFooterinformation.innerHTML = registerAndUnregisterButton;
        }
      }
    }
  }
}
