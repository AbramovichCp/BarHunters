import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { UserActionService } from '../../services/user-action.service';
import { Subscription } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';
import { AlertType } from '../../interfaces/alert/alert-type';
import { ValidateService } from '../../services/validator.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  providers: [UserActionService]
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  regForm: FormGroup;
  userRegSub: Subscription;

  constructor(private UserAction: UserActionService,
              private alertService: AlertsService,
              public validator: ValidateService) {}

  ngOnInit() {
    this.regForm = new FormGroup({
        'username': new FormControl('', [this.validator.name()]),
        'email': new FormControl('', [this.validator.email()]),
        'phone': new FormControl('', [this.validator.phone()]),
        'password': new FormControl('', [this.validator.password()]),
        'confirmPassword': new FormControl('', [this.validator.password()])
    });
  }

  submit(formData: FormGroup, formDirective: FormGroupDirective) {

    this.userRegSub = this.UserAction.sendRegistrationData(formData.value).subscribe(res => {
      formDirective.resetForm();
      this.regForm.reset();
      this.alertService.create('success', res['message'], 'title');
    }, err => {
      this.alertService.create('error', err['message'], 'title');
    });

  }


  getEmailErrMsg()  {
    return this.validator.getEmailErrMsg(this.regForm.controls.email);
   }
   getPhoneErrMsg() {
     return this.validator.getPhoneErrMsg(this.regForm.controls.phone);
   }
   getPasswordErrMsg() {
     return this.validator.getPasswordErrMsg(this.regForm.controls.password);
   }
   getNameErrMsg() {
     return this.validator.getNameErrMsg(this.regForm.controls.username);
   }


  ngOnDestroy() {
    if (this.userRegSub) {
      this.userRegSub.unsubscribe();
    }
  }

}
