import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { UserActionService } from '../../services/user-action.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from '../../services/alerts.service';
import { ValidateService } from '../../services/validator.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss'],
  providers: [UserActionService]
})
export class UserSignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  token: string;
  confirmEmailSub: Subscription;
  signInSub: Subscription;



  constructor(private UserAction: UserActionService,
    private ActiveRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertsService,
    public validator: ValidateService,
    private translate: TranslateService) { }



  ngOnInit() {
    const alertVerifiedEmail = this.translate.instant('alertMessages.verified');
    this.signInForm = new FormGroup({
      'email': new FormControl('', [this.validator.email()]),
      'password': new FormControl('', [this.validator.password()])
    });
    this.token = this.ActiveRoute.snapshot.queryParams['token'];
    if (this.token) {
      this.confirmEmailSub = this.UserAction.confirmEmail(this.token).subscribe(res => {
        this.alertService.create('success', 'Your account has been successfully verified!');
      });
    }

  }

  submit(signInForm: FormGroup, formDirective: FormGroupDirective) {
    const alertWelcomeMessage = this.translate.instant('alertMessages.signIn');
    const alertSignInError = this.translate.instant('alertMessages.errorMessage');
    this.signInSub = this.auth.signIn(signInForm.value).subscribe(res => {
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.navigated = false;
      // this.router.navigate(['/BarsHunters/home-page']);
      location.reload();
      // this.auth.showProfile(true);
      setTimeout(() => { this.auth.refreshHeader(false); }, 500);
      this.alertService.create('success', alertWelcomeMessage);
    }, (err) => {
      this.alertService.create('error', alertSignInError);
    });

  }


  getEmailErrMsg() {
    return this.validator.getEmailErrMsg(this.signInForm.controls.email);
  }
  getPhoneErrMsg() {
    return this.validator.getPhoneErrMsg(this.signInForm.controls.phone);
  }
  getPasswordErrMsg() {
    return this.validator.getPasswordErrMsg(this.signInForm.controls.password);
  }
  getNameErrMsg() {
    return this.validator.getNameErrMsg(this.signInForm.controls.username);
  }



  ngOnDestroy() {
    if (this.confirmEmailSub) { this.confirmEmailSub.unsubscribe(); }
    if (this.signInSub) { this.signInSub.unsubscribe(); }
  }

}
