
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

// ************************Library**********************************/
import { AlertModule } from 'ngx-bootstrap';
// ************************Library**********************************/
import { SlickModule } from 'ngx-slick';
// **********************************************************/

// ****************Components*******************/
import { AppComponent } from './app.component';
import { PremiumEventsComponent } from './components/premium-events/premium-events.component';
import { LastEventsComponent } from './components/last-events/last-events.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AddPlacesComponent } from './components/add-places/add-places.component';
import { AddManagerComponent } from './components/add-manager/add-manager.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { BarsListComponent } from './components/bars-list/bars-list.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventListEditComponent } from './components/event-list-edit/event-list-edit.component';
import { SidebarAdminPanelComponent } from './components/sidebar-admin-panel/sidebar-admin-panel.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { DeleteEventComponent } from './components/delete-event/delete-event.component';
import { BtnDetailsComponent } from './components/btn-details/btn-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserSignInComponent } from './components/user-sign-in/user-sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AgmCoreModule } from '@agm/core';

// **********************************************************/

// ***********************SERVICES*******************************/
import { SharedService } from './services/shared.service';
// **********************************************************/



// ***********************SERVICES*******************************/
import { EventsFromYearPipe } from './pipes/events-from-year.pipe';
import { ShareDataService } from './services/share-data.service';
import { DeleteEventService } from './services/delete-event.service';
import { EventsDatesPipe } from './pipes/events-dates.pipe';

// **************************************************************/



// ***********************INTERCEPTORS*******************************/
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';

// **************************************************************/



// ***********************GUARDS*******************************/
import { ResetPasswordGuard } from './guards/reset-password.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminPanelGuard } from './guards/admin-panel.guard';


// **************************************************************/

// **************************************************************/
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CustomAlertsModule } from './modules/alert/custom-alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FragmentPolyfillModule } from './modules/fragment-polyfill/fragment-polyfill.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { DeletePlaceComponent } from './components/delete-place/delete-place.component';
@NgModule({
  declarations: [
    AppComponent,
    PremiumEventsComponent,
    LastEventsComponent,
    HomePageComponent,
    EventDetailsComponent,
    AllEventsComponent,
    EventsFromYearPipe,
    EventsDatesPipe,
    BarsListComponent,
    PlaceDetailsComponent,
    AddPlacesComponent,
    AddManagerComponent,
    AdminPanelComponent,
    HeaderComponent,
    FooterComponent,
    AddEventComponent,
    UserRegistrationComponent,
    UserSignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    BtnDetailsComponent,
    DeleteEventComponent,
    EditEventComponent,
    UserRegistrationComponent,
    UserSignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SidebarAdminPanelComponent,
    UserProfileComponent,
    EventListEditComponent,
    SearchComponent,
    DeletePlaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SlickModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BsDropdownModule.forRoot(),
    CustomAlertsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    FragmentPolyfillModule.forRoot({
      smooth: true
    }),
    TimepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    NgSelectModule,
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    PerfectScrollbarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxQbTBXM8Jr7bZZPPnVeK9Oe-hzO30Nbc',
      libraries: ['places']
    }),
  ],
  providers: [
    DeleteEventService,
    ShareDataService,
    SharedService,
    ResetPasswordGuard,
    AuthGuard,
    AdminPanelGuard,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: JwtTokenInterceptor
    },
    DeleteEventService,
    ShareDataService,
    ShareDataService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EventDetailsComponent,
    PlaceDetailsComponent,
  ],
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
