import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AlertEmit} from '../interfaces/alert/alert-emit';
import {AlertSettings} from '../interfaces/alert/alert-settings';
import {AlertType} from '../interfaces/alert/alert-type';

@Injectable()
export class AlertsService {
  alert$: Subject<AlertEmit> = new Subject();

  create(
    type: AlertType = 'success',
    message: any = '',
    title: any = '',
    override: AlertSettings = {}
  ) {
    this.alert$.next({type, title, message, override});
  }
}
