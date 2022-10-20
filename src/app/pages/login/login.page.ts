import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Storage } from "@ionic/storage-angular";
import { StorageService } from 'src/app/services/storage/storage.service';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  errorControls: any;
  loading:boolean= false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private formBuilder:FormBuilder,
    // private loginService: LoginService,
    private router:Router,
    private storage: StorageService,
    private domicilioService: DomicilioService
  ) {
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
    this.errorControls = this.form.controls;
    
   }
    ngOnInit() {

  }


  login(){
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;
    console.log('email', email);
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.storage.set('usuario', email)
        this.domicilioService
        .getDomiciliosId({
          where: [{ name: 'idUsuario', validation: '==', value: email}],
        })
        .subscribe((res) => {
          console.log(res);
          if (res.length){
            res.forEach((dom)=>{
              if(dom.estaActivo){
                this.domicilioService.setCurrentDomicilio$(dom);
              }
            })
          }else{
            this.router.navigate(['/domicilios'])
          }
        });
        this.router.navigate(['/inicio'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  redirectUsuCliRegistro(){
    this.router.navigate(['/usuario-cli-registro'])
  }
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
