import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  errorControls: any;
  loading: boolean = false;
  mensajeError:string;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    // private loginService: LoginService,
    private router: Router,
    private storage: StorageService,
    private domicilioService: DomicilioService,
    private usuarioService: UsuarioService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.errorControls = this.form.controls;
  }
  ngOnInit() {}

  login() {
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.mensajeError = "";
        this.storage.set('usuario', email);
        this.usuarioService.getUser(email).subscribe((u) => {
          console.log(u)
          let usuario = u;
          this.storage.set('rol', usuario.rol);
          console.log(usuario.rol);
          switch (usuario.rol) {
            case 'usuario-cliente':
              this.domicilioService
                .getDomiciliosId({
                  where: [{ name: 'idUsuario', validation: '==', value: email }],
                })
                .subscribe((res) => {
                  console.log(res);
                  this.router.navigate(['/seleccion-domicilio']);
                });
              break
            case 'usuario-empleado':
              console.log('case usu-emp');
              this.router.navigate(['/bk-menu-empleado']);
              break
            case 'usuario-cadete':
              console.log('case usu-cad');
              this.router.navigate(['/bk-menu-empleado']);
              break
          }
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.fnErrorDialog(errorCode, email, password);
      });
  }

  redirectUsuCliRegistro() {
    this.router.navigate(['/usuario-cli-registro']);
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
