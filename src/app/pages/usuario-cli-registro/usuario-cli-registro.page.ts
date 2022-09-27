import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    private router:Router,
    private firestore: AngularFirestore,
  ) {
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombre:['', Validators.required] ,
      fechaNac: ['', Validators.required],
      nroTel: ['', Validators.required],
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

  email: string;
  password: string;
  ngOnInit() {
  }

  redirectLogin(){
    this.modal.dismiss(null, 'cancel');
    this.router.navigate(['/login']);
  }

  registrarEmail(){
    this.email = this.formAuth.controls.email.value;
    this.password = this.formAuth.controls.password.value;
    console.log("email: ", this.email, ", password: ", this.password);
    this.angularFireAuth.createUserWithEmailAndPassword(this.email, this.password)
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

  registroUsuCli(){
    var dataUsu = {
      apellido: this.form.controls.apellido.value,
      nombre: this.form.controls.nombre.value,
      fechaNac: this.form.controls.fechaNac.value,
      nroTelefono: this.form.controls.nroTel.value,
      rol: "usuario-cliente"
    }
    var dataDomi = {
      idUsuario: this.email,
      calle: this.form.controls.domiCalle.value,
      nroCasa: this.form.controls.domiNro.value,
      piso: this.form.controls.domiPiso.value,
      dpto: this.form.controls.domiDpto.value,
      domiObs: this.form.controls.domiObs.value,
      idLocalidad: this.form.controls.domiLoc.value,
    }
    this.firestore.collection('usuarios').doc(this.email).set(dataUsu);
    this.firestore.collection('domicilios').doc().set(dataDomi);
    console.log("Cliente registrado con éxito")
    this.router.navigate(['/login']);
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

