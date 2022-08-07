import { Injectable } from '@angular/core';
import { 
    Auth, 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    authState,
    UserCredential,
    User
} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { filter } from 'rxjs';
import { UserService } from './user.service';
import { setDoc , doc, getDoc} from '@firebase/firestore';
import { Observable, of } from 'rxjs';
import { AppUser } from './models/app-user';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user$!:  Observable<User | null> ;

    constructor(
            private auth: Auth,
            private userService: UserService ,
            private route: ActivatedRoute,
            private router: Router) { 
               this.user$ = authState(auth);
    }

    login(){
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);

        signInWithPopup(this.auth, new GoogleAuthProvider()).then(userCredential =>{
            if(userCredential){
                let user = userCredential.user;

                let returnUrl = localStorage.getItem("returnUrl") || '/';
                this.router.navigateByUrl(returnUrl);
                // console.log(returnUrl);
                this.userService.save(user);
            }
        });
    }

    logout(){
        signOut(this.auth);
    }

    get appUser(){
        return this.user$.pipe(
            switchMap(user =>  {
                if(user){
                    return this.userService.get(user?.uid)
                }else{
                    return of(null);
                }
            } )
        )
    }
}
