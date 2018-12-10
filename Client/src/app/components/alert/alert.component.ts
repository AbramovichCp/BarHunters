import {Component, HostBinding, Output, EventEmitter, OnInit, NgZone, ViewEncapsulation} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {AlertType} from '../../interfaces/alert/alert-type';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('wrapperAn', [
      state('void', style({opacity: 0, transform: 'scale(0.75, 0.75) translate(0, -100vh)'})),
      state('leave', style({opacity: 0, transform: 'scale(0.75, 0.75) translate(0, -100vh)'})),
      state('enter', style({opacity: 1, transform: 'scale(1, 1) translate(0, 0)'})),
      transition('void => enter', animate('450ms cubic-bezier(.42, 0, .42, 1)')),
      transition('enter => leave', animate('450ms cubic-bezier(.42, 0, .42, 1)'))
    ]),
    trigger('messageAn', [
      state('void', style({opacity: 0, transform: 'translate(0, 20px) scale(0.01, 0.01)'})),
      state('leave', style({opacity: 0, transform: 'translate(0, 20px) scale(0.01, 0.01)'})),
      state('enter', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => enter', animate('450ms cubic-bezier(.42, 0, 1, 1)')),
      transition('enter => leave', animate('450ms cubic-bezier(.42, 0, 1, 1)'))
    ]),
    trigger('shortAn', [
      transition('void => enter', [
        animate('450ms 200ms ease-in-out', keyframes([
          style({opacity: 0, transform: 'scale(0, 0)', offset: 0}),
          style({transform: 'scale(1.5, 1.5)', offset: 0.35}),
          style({transform: 'scale(0.9, 0.9)',  offset: 0.85}),
          style({opacity: 1, transform: 'scale(1, 1)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {
  constructor(
    private _ngZone: NgZone
  ) {}

  @Output() close = new EventEmitter();
  @HostBinding('class') type: AlertType;

  animationState = 'enter';
  incomingData: any = {
    title: '',
    titleIsTemplate: false,
    message: '',
    messageIsTemplate: false,
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    duration: 0
  };

  ngOnInit() {
    if (this.incomingData.duration) {
      this._ngZone.runOutsideAngular(() =>
        setTimeout(() =>
            this._ngZone.run(() =>
              this.closeSelf()
            ),
          this.incomingData.duration
        )
      );
    }
  }

  closeSelf() {
    this.animationState = 'leave';
    this.close.emit({close: true, ...this.incomingData});
  }

  overlayClick() {
    if (!this.incomingData.overlayClickToClose) {
      return;
    }

    this.closeSelf();
  }
}
