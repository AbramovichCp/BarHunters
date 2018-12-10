import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserSignInComponent } from './components/user-sign-in/user-sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordGuard } from './guards/reset-password.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminPanelGuard } from './guards/admin-panel.guard';

// for example
import { UserProfileComponent } from './components/user-profile/user-profile.component';


import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';


const routes: Routes = [
  {
    path: 'BarsHunters',
    children: [
      {
        path: 'home-page',
        component: HomePageComponent
      },
    ]
  },
  {
    path: 'BarsHunters/profile',
    component: UserProfileComponent
  },
  {
    path: 'BarsHunters/all-events',
    component: AllEventsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'BarsHunters/home-page',
  },
  {
    path: 'BarsHunters/admin-panel',
    component: AdminPanelComponent,
  },
  {
    path: 'BarsHunters/forgot-pw',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'BarsHunters/reset-pw',
    component: ResetPasswordComponent,
    canActivate: [ResetPasswordGuard, AuthGuard]
  },
  {
    path: 'BarsHunters/register',
    component: UserRegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'BarsHunters/sign-in',
    component: UserSignInComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        enableTracing: false
      }
    )
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
