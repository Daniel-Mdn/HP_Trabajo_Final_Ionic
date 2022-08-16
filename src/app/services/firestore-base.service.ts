import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreBaseService {
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {}

  public getAll(path: string) {
    return this.firestore.collection(path).valueChanges({ idField: 'ID' });
  }
  public getOne(path: string, id: string) {
    return this.firestore.doc(path + '/' + id).valueChanges();
  }
  public deleteOne(path: string, id: string) {
    return this.firestore.doc(path + '/' + id).delete();
  }
  public updateOne(path: string, id: string, data: any) {
    this.firestore.doc(path + '/' + id).update(data);
    return this.firestore.doc(path + '/' + id).valueChanges();
  }
  public createOne(path: string, data: any) {
    const id = this.firestore.createId();
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.doc(id).set(data);
  }
  public createOneByID(path: string, id: string, data: any) {
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.doc(id).set(data);
  }
  public stateCollection(path: string) {
    this.itemsCollection = this.firestore.collection(path);
    return this.itemsCollection.stateChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  /*
var db = firebase.firestore();
var emailLogeadoGlobal = '';
var nombreUsuarioGlobal = '';
var colUsuarios = db.collection("usuarios");

email = $$('#usuarioLogin').val();
    password = $$('#passLogin').val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(){
        usuarioLogueado = true;
        emailLogeadoGlobal = email;
        colUsuarios.doc(email).get()
          .then((doc) => {
            nombreUsuarioGlobal = doc.data().nombre;
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          })
        app.views.main.router.navigate("/domicilios/");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        fnErrorDialog(errorCode, email, password)
        console.log('Código error: ' + errorCode + ' / Mensaje: ' + errorMessage);
      }); 
  }
*/
}
