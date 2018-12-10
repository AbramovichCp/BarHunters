import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { UserActionService } from '../../services/user-action.service';
import { Subscription } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';
import { ValidateService } from '../../services/validator.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [UserActionService]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  forgotPwSub: Subscription;

  constructor(private UserAction: UserActionService, private alertService: AlertsService,
    public validator: ValidateService, private translate: TranslateService) { }

  ngOnInit() {

    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', [this.validator.email()])
    });

  }

  submit(forgotPasswordForm: FormGroup, formDirective: FormGroupDirective) {
    const alertForgotPass = this.translate.instant('alertMessages.forgotPass');
    this.forgotPwSub = this.UserAction.forgotPassword(forgotPasswordForm.value).subscribe(res => {
      formDirective.resetForm();
      this.forgotPasswordForm.reset();
      if (res['message']) {
        this.alertService.create('success', alertForgotPass);
      }
    });
  }

  getEmailErrMsg() {
    return this.validator.getEmailErrMsg(this.forgotPasswordForm.controls.email);
  }

  ngOnDestroy() {
    if (this.forgotPwSub) {
      this.forgotPwSub.unsubscribe();
    }
  }

}
