import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(public authService: AuthService,
              private alerify: AlertifyService, private route: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe((next) => {
      this.alerify.success('logged in successfully');
    }, error => {
      this.alerify.error(error);
    }, () => {
      this.route.navigate(['/members']);
    });
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    // return true;
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodeToken = null;
    this.authService.currentUser = null;
    this.alerify.message('log out');
    this.route.navigate(['/home']);
  }
}
