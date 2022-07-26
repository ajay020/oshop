import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { setDoc , doc, getDoc} from '@firebase/firestore';
import * as firebase from 'firebase'
import {from , map, Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }
  save(user: User){
    setDoc(
        doc(this.firestore,"users", user.uid),
        {name: user.displayName, email: user.email},
        {merge:true});
  }

  get(uid:string ){
    let user : AppUser;
    return from (getDoc(doc(this.firestore,"users", uid))).pipe(
        map(docSnapshot => {
            let userdata = docSnapshot.data()
            console.log(userdata);

            user = {name: userdata?.['name'], email: userdata?.['email'], isAdmin: userdata?.['isAdmin'] };
            return user;
        })
    )
  }
}
