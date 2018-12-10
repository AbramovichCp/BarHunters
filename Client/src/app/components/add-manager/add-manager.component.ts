import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from '../../services/place.service';
import { ManagerService } from '..//../services/manager.service';
import { Manager } from '../../models/managers';
import { from } from 'rxjs';
import { ValidateService } from '../../services/validator.service';
import { AlertsService } from '../../services/alerts.service';
import { AlertType } from '../../interfaces/alert/alert-type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss', './../../../common/formStyle.scss']
})
export class AddManagerComponent implements OnInit {
  private phoneIndex = '+380';
  public places;
  public addManagerForm: FormGroup;
  private newManager: Manager;
  public mailError;
  public selectedPlaces: any;

  private submitForm() {
    this.newManager = {
      id:  null,
      username: this.addManagerForm.value.managerName,
      email: this.addManagerForm.value.managerEmail,
      phone: this.phoneIndex + this.addManagerForm.value.managerNumber,
      password: this.addManagerForm.value.managerPassword,
      places: this.addManagerForm.value.choosePlace
    };

    console.log( `show new manager: ${this.newManager}`);
    this.managerServise.addManager(this.newManager).subscribe();
    this.openAlert();
    this.addManagerForm.reset();
  }

  constructor(
    private placeService: PlaceService,
    private formBuilder: FormBuilder,
    private managerServise: ManagerService,
    public validator: ValidateService,
    public alertService: AlertsService,
    private translate: TranslateService
    ) {
    this.addManagerForm = this.formBuilder.group({
      'managerName': [null, this.validator.name()],
      'choosePlace': [null, Validators.required],
      'managerNumber': [null, this.validator.phone()],
      'managerEmail': [null, this.validator.email()],
      'managerPassword': [null, this.validator.password()],
      'confirmPassword': [null, this.validator.password()],
    });
  }
  ngOnInit() {
    this.placeService.getPlaces().subscribe((data) => {
    this.places = data;
    });
  }
  getEmailErrMsg()  {
   return this.validator.getEmailErrMsg(this.addManagerForm.controls.managerEmail);
  }
  getPhoneErrMsg() {
    return this.validator.getPhoneErrMsg(this.addManagerForm.controls.managerNumber);
  }
  getPasswordErrMsg() {
    return this.validator.getPasswordErrMsg(this.addManagerForm.controls.managerPassword);
  }
  getNameErrMsg() {
    return this.validator.getNameErrMsg(this.addManagerForm.controls.managerName);
  }
  openAlert(type: AlertType = 'success') {
    const alertAddManager = this.translate.instant('alertMessages.addManager');
    this.alertService.create(type, alertAddManager);
  }
  showErr(funName: any, formName: FormGroup, controlerName: string) {
    return funName !== '' && formName.get(controlerName).touched;
  }
}
