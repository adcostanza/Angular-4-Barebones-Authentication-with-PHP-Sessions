import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'admin-login',
  templateUrl: 'login.html',
  styleUrls:['login.css'],
  providers: [AuthService]
})
export class AdminLogin implements OnInit {
  constructor(private authService: AuthService, private router: Router) {};
    //we want to actually subscribe to the boolean of the observable
	onSubmit(form: any): void {
		console.log(form.user);
		this.authService.login(form.user, form.pass).subscribe(auth =>{
			if(auth) {
				this.router.navigate(['/restricted']);
			}
			//navigate to admin if auth yes
		});
	}
	ngOnInit(): void {
		this.authService.checkAuth().subscribe(auth =>{
			if(auth) {
				this.router.navigate(['/restricted']);
			}
			//navigate to admin if auth yes
		});
	}
}