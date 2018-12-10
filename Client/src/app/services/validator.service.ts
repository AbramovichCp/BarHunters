import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
const phonePattern = /^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const managerNamePattern = /^[A-z]*?[\s]?[A-z]*$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const locationPattern = /^[ \w]{3,}([A-Za-z]\.)?([ \w]*\#\d+)?(\r\n| )[ \w]{3,},\x20[A-Za-z]{2}\x20\d{5}(-\d{4})?$/;

@Injectable({
  providedIn: 'root'
})
export class ValidateService implements Validators {
  constructor() { }
  public email() {
    return Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(45),
      Validators.email
    ]);
  }
  public phone() {
    return Validators.compose([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
      Validators.pattern(phonePattern)
    ]);
  }
  public name() {
    return Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
      Validators.pattern(managerNamePattern)
    ]);
  }
  public password() {
    return Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40),
      Validators.pattern(passwordPattern)
    ]);
  }
  public location() {
    return Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(45),
      Validators.pattern(locationPattern)
    ]);
  }

  public getEmailErrMsg(formAndControl) {
    return formAndControl.hasError('required') ? 'Enter email' :
      formAndControl.hasError('email') ? 'Invalid email' :
        formAndControl.hasError('minlength') ? 'Minimum email length 5 charset' :
          formAndControl.hasError('maxlength') ? 'Maximum email length 45 charset' : '';
  }
  public getPhoneErrMsg(formAndControl) {
    return formAndControl.hasError('required') ? 'Enten phone number' :
      formAndControl.hasError('pattern') ? 'Invalid phone number' :
        formAndControl.hasError('minlength') ? 'Minimum email length 9 digits' : '';
  }
  public getPasswordErrMsg(formAndControl) {
    return formAndControl.hasError('required') ? 'Enter password' :
      formAndControl.hasError('minlength') ? 'Minimum password length 8 charset' :
        formAndControl.hasError('pattern') ? 'Password must have one digits and uppercase charset' : '';
  }
  public getNameErrMsg(formAndControl) {
    return formAndControl.hasError('required') ? 'Enter name' :
      formAndControl.hasError('pattern') ? 'Invalid name' : '';
  }
  public getLocationErrMsg(formAndControl) {
    return formAndControl.hasError('required') ? 'Enter adress' :
      formAndControl.hasError('minlength') ? 'Minimum location length 3 charset' :
        formAndControl.hasError('pattern') ? 'Uncorect adress' : '';
  }
}
