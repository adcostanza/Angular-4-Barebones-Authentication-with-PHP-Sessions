import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule, Router, CanActivate, CanActivateChild} from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AppIndex } from './app.index';
import { AuthGuard } from './auth.guard';
import {AuthService} from "./auth.service";
import {AdminLogin} from "./admin.login";
import { AppComponent } from './app.component';
import { RestrictedComponent} from './restricted.component';

const routes: Routes = [
  {path: '', redirectTo: 'unrestricted', pathMatch: 'full'},
  {path: 'unrestricted', component: AppComponent},
  {path: 'login', component:AdminLogin},
  {path: 'restricted', component:RestrictedComponent,
  canActivate: [AuthGuard],
  canActivateChild:[AuthGuard],
  children: [
  {path:'alsoRestricted', component:RestrictedComponent}
  ]},
  {path: '**', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
	AdminLogin,
	RestrictedComponent,
	AppIndex
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	FormsModule,
	RouterModule.forRoot(routes,{useHash:true})
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppIndex]
})
export class AppModule { }
