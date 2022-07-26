import { Component, OnInit } from '@angular/core';
import { Auth, signOut, authState} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { AppUser } from './../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser!: AppUser | null;

  constructor(public auth : AuthService) {
    auth.appUser.subscribe(user =>   this.appUser = user);
  }
  
  logout(){
   this.auth.logout();
  }
}


/**
 * 
 * Never forget to unsubscribe when using firebase.
 * In case of HttpClient, angular take of it.
 */