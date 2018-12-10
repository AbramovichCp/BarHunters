import { Component,  OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective} from '@angular/forms';
import { UserActionService } from '../../services/user-action.service';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';
import { ValidateService } from '../../services/validator.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [UserActionService]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm: FormGroup;
  resetPwSub: Subscription;

  constructor(private UserAction: UserActionService,
              private ActiveRoute: ActivatedRoute,
              private alertsService: AlertsService,
              public validator: ValidateService,
              private translate: TranslateService) {}

  ngOnInit() {

    this.resetPasswordForm = new FormGroup({
      'password': new FormControl('', [this.validator.password()]),
      'confirmPassword': new FormControl('', [this.validator.password()])
    });

  }

  submit(resetPasswordForm: FormGroup, formDirective: FormGroupDirective) {
    const alertResetPass = this.translate.instant('alertMessages.resetPass');
    resetPasswordForm.value.token = this.ActiveRoute.snapshot.queryParams['token'];
    this.resetPwSub = this.UserAction.resetPassword(resetPasswordForm.value).subscribe(res => {
      if (res['message']) {
        this.alertsService.create('success', alertResetPass);
        formDirective.resetForm();
        this.resetPasswordForm.reset();
      }
    });

  }

  getPasswordErrMsg() {
    return this.validator.getPasswordErrMsg(this.resetPasswordForm.controls.password);
  }

  ngOnDestroy() {
    if (this.resetPwSub) {
      this.resetPwSub.unsubscribe();
    }
  }

}
