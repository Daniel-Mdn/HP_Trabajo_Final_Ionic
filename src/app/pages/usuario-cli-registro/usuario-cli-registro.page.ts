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
  email: string;
  password: string;
  mensajeError:string;
  mensajeForm:string;

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
      password2:['', Validators.required]
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
    this.email = this.formAuth.controls.email.value;
    this.password = this.formAuth.controls.password.value;
    const password2 = this.formAuth.controls.password2.value;
    console.log("email: ", this.email, ", password: ", this.password, ", password2: ", password2);
    if (this.password == password2) {
      this.angularFireAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Signed in
        console.log("Usuario creado")
        this.modal.dismiss(null, 'cancel');
      })
      .catch((error) => {
        console.log('error')
        const errorCode = error.code;
        const errorMessage = error.message;
        this.fnErrorDialog(errorCode, this.email, this.password);
        console.log('Código error: ' + errorCode + ' / Mensaje: ' + errorMessage);
      });
    } else {
      console.log('else')
      this.mensajeError = "Las contraseñas ingresadas deben ser iguales";
    }
  }

  async registroUsuCli(){
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
    if(this.form.valid){
      this.mensajeForm = '';  
      this.firestore.collection('usuarios').doc(this.email).set(dataUsu);
      this.firestore.collection('domicilios').doc().set(dataDomi);
      console.log("Cliente registrado con éxito")
      this.router.navigate(['/login']);
    }else{
      console.log(dataUsu)
      console.log(dataDomi)
      console.log('Datos en null:');
      this.form.markAllAsTouched();
      // ESTE FOR SIRVE PARA SABER CUÁL ES EL FIELD QUE NO ESTÁ VALIDANDO
      for (let el in this.form.controls) {
        if (this.form.controls[el].errors) {
          console.log(el)
        }
      }
      this.mensajeForm = "Los campos con * son obligatorios";
    }
  }

  fnErrorDialog(errorCode,email,password){
    if (errorCode == 'auth/email-already-in-use') {
      this.mensajeError = "El email "+email+" ya está registrado. Por favor, ingrese una dirección de email distinta.";
    }
  
    if (errorCode == 'auth/weak-password') {
      this.mensajeError = "La contraseña debe tener más de 6 números o letras";
    }

    if (errorCode == 'auth/operation-not-allowed') {
      this.mensajeError = "Debe ingresar una dirección de email y una contraseña";
    }

    if (errorCode == 'auth/invalid-email') {
      this.mensajeError = "La dirección de email ingresada no es válida. El formato debe ser, por ejemplo, juan@email.com";
    }
    
    if (errorCode == 'auth/user-disabled') {
      this.mensajeError = "El usuario "+email+" ha sido desabilitado";
    }
    
    if (errorCode == 'auth/user-not-found') {
      this.mensajeError = 'El usuario con el email '+email+' no existe';
    }
  
    if (errorCode == 'auth/wrong-password') {
      this.mensajeError = 'La contraseña es incorrecta';
    }
  }
}

