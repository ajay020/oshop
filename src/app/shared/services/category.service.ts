import { Injectable } from '@angular/core';
import { orderByChild, orderByKey } from '@angular/fire/database';
import {getDocs, doc, orderBy , collection,query, DocumentSnapshot, Firestore, onSnapshot, Query} from '@angular/fire/firestore';
// import { getDocs, doc, orderBy } from '@firebase/firestore';
import {from , map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: Firestore) { 
  }

  getAll(){
     let categories :any[] = [];
     const collRef =  collection(this.firestore, "categories");
     const q  = query(collRef, orderBy('name', 'asc'))

    onSnapshot(q, (querySnapshot) =>{
        querySnapshot.forEach(snapshot =>{
            categories.push({key: snapshot.id,  ...snapshot.data()});
            // console.log(snapshot.id)
        }) 
    })

    // getDocs(collRef).then(querySnapshot =>{
    //     querySnapshot.forEach(snapshot =>{
    //         categories.push(snapshot.data());
    //     })
    // })

    return of(categories);
  }
}