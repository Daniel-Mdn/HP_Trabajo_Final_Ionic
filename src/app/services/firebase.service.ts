import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() { }
  public getUser(){
    //const db = getFirestore(app);
    //const colUsuarios = getDocs(collection(db, "usuarios"));
  }
}

