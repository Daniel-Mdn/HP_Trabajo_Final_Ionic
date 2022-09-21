import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-usuario-cli-registro',
  templateUrl: './usuario-cli-registro.page.html',
  styleUrls: ['./usuario-cli-registro.page.scss'],
})
export class UsuarioCliRegistroPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form:FormGroup;
  formAuth:FormGroup;
  errorControls:any;
  loading:boolean= false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private formBuilder:FormBuilder,
    // private loginService: LoginService,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombres:['', Validators.required] ,
      fechaNac: ['', Validators.required],
      domiCalle: ['', Validators.required],
      domiNro: ['', Validators.required],
      domiPiso: ['',],
      domiDpto: ['',],
      domiObs: ['',],
      domiProv: ['', Validators.required],
      domiLoc: ['', Validators.required]
    })
    this.formAuth = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
    })
    this.errorControls = this.form.controls;
   }

  ngOnInit() {
  }

  redirectLogin(){
    this.modal.dismiss(null, 'cancel');
    this.router.navigate(['/login']);
  }

  registrarEmail(){
    let email = this.formAuth.controls.email.value;
    let password = this.formAuth.controls.password.value;
    console.log("email: ", email, ", password: ", password);
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Usuario creado")
      this.modal.dismiss(null, 'cancel');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //fnErrorDialog(errorCode, email, password)
      console.log('Código error: ' + errorCode + ' / Mensaje: ' + errorMessage);
    });
  }

  /*
  fnErrorDialog(){
    if (errorCode == 'auth/email-already-in-use') {
      var txt = 'El/la usuario/a '+email+' ya existe';
      app.dialog.alert(txt, 'Un momento...');
    }
    
    if (errorCode == 'auth/weak-password') {
      var txt = 'La clave es muy débil. Intente utilizando más de 8 letras o números, incluyendo mayúsculas/minúsculas';
      app.dialog.alert(txt, 'Un momento...');
    }
  
    if (errorCode == 'auth/operation-not-allowed') {
      var txt = 'Debe ingresar un e-mail y una contraseña';
      app.dialog.alert(txt, 'Un momento...');
    }
   
    if (errorCode == 'auth/invalid-email') {
      var txt = 'La dirección de correo no es válida';
      app.dialog.alert(txt, 'Un momento...');
    }
  
    if (errorCode == 'auth/user-disabled') {
      var txt = 'El usuario '+email+' ha sido desabilitado';
      app.dialog.alert(txt, 'Un momento...');
    }
    
    if (errorCode == 'auth/user-not-found') {
      var txt = 'El usuario con el email '+email+' no existe';
      app.dialog.alert(txt, 'Un momento...');
    }
  
    if (errorCode == 'auth/wrong-password') {
      var txt = 'La contraseña es incorrecta';
      app.dialog.alert(txt, 'Un momento...');
    }
  }
  */ 

}

