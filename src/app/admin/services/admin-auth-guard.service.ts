import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, } from 'rxjs/operators';

import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
     private userService:UserService,
     private router : Router
     ) { }

  canActivate() {

     return this.auth.user$.pipe(
        switchMap(user =>  {
            if(user){
                return this.userService.get(user?.uid)
            }else{
                return of(null);
            }
        } ),
        map(user => user?.isAdmin),
        map(user =>{
            if(user) return (true);
            else return (false);
        })
        )
  }
}
