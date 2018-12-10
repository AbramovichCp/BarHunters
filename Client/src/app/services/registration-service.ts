import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../config/config';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    constructor(private http: HttpClient) { }
    public newEventSubject = new Subject<any>();

    registerToEvent(id) {
        return this.http.post(`${Url}/subscribe-to-event`, { event_id: id });
    }

    refreshEvent() {
      this.newEventSubject.next();
    }

    unsubscribeFromEvent(id) {
      return this.http.post(`${Url}/unsubscribe-from-event`, { event_id: id });
    }
}
