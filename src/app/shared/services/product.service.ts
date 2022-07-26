import { Injectable } from '@angular/core';
import { addDoc, Firestore, collection, DocumentData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { getDocs, getDoc, QuerySnapshot, setDoc } from '@firebase/firestore';
import { map, tap, of,from , take } from 'rxjs';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore : Firestore) { }

  create(product:any){
    return addDoc(collection(this.firestore, 'products'), product);
  }

  getAll(){
    // let products :Product[] = [] ;
    // getDocs(collection(this.firestore, 'products'))
    //     .then( (querySnapshot:QuerySnapshot )=>{
    //         querySnapshot.forEach( (snapshot) => {
    //             let d = snapshot.data();
    //             products.push({
    //                      $key: snapshot.id,
    //                      title:d?.['title'],
    //                      price:d?.['price'],
    //                      category: d?.['category'],
    //                      imageUrl: d?.['imageUrl'] 
    //                 });
    //         });
    //     });
    // console.log(products);
    // return of (products);


    return from (getDocs(collection(this.firestore, 'products')))
            .pipe(
                map(qss => {
                    let p :Product[] = [];
                    qss.forEach(shot =>{
                        let d = shot.data();
                        p.push({
                            $key: shot.id,
                            title:d?.['title'],
                            price:d?.['price'],
                            category: d?.['category'],
                            imageUrl: d?.['imageUrl'] 
                        })
                    })
                    return p;
                })
            )

  }

  get(productId:string){
    return from(getDoc(doc(this.firestore, 'products', productId)))
        .pipe(map(val => val.data()));
  }

  update(productId :string, product:any){
    return setDoc(doc(this.firestore,'products', productId), product);
  }
  delete(productId: string){
    return deleteDoc(doc(this.firestore, 'products', productId));
  }
}


// interface DocumentSnapshot {
//     exists: boolean;
//     ref: DocumentReference;
//     id: string;
//     metadata: SnapshotMetadata;
//     data(): DocumentData;
//     get(fieldPath: string): any;
//   }