import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-bk-usuario-emp-registro',
  templateUrl: './bk-usuario-emp-registro.page.html',
  styleUrls: ['./bk-usuario-emp-registro.page.scss'],
})
export class BkUsuarioEmpRegistroPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form:FormGroup;
  formAuth:FormGroup;
  errorControls: any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private formBuilder: FormBuilder
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
      domiLoc: ['', Validators.required],
      rol: ['', Validators.required]
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
  
  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectMenu(){
    this.modal.dismiss(null, 'cancel');
    this.router.navigate(['/bk-menu-usuarios-emp']);
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

  registroUsuEmp(){
    var dataUsu = {
      apellido: this.form.controls.apellido.value,
      nombre: this.form.controls.nombre.value,
      fechaNac: this.form.controls.fechaNac.value,
      nroTelefono: this.form.controls.nroTel.value,
      rol: this.form.controls.rol.value,
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
    console.log("Empleado registrado con éxito")
    this.router.navigate(['/bk-menu-usuarios-emp']);
  }

}
