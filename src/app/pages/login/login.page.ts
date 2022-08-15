import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

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
    private formBuilder:FormBuilder,
    // private loginService: LoginService,
    private router:Router
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
    
    let emailLogeadoGlobal = '';
    let nombreUsuarioGlobal = '';
    const auth = getAuth();
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;
    console.log('email', email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.router.navigate(['/inicio'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
