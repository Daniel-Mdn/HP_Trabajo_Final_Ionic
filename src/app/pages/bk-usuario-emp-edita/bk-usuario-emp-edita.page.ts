import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/constants/interfaces';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { getAuth, updatePassword } from 'firebase/auth';
import { AlertController, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-bk-usuario-emp-edita',
  templateUrl: './bk-usuario-emp-edita.page.html',
  styleUrls: ['./bk-usuario-emp-edita.page.scss'],
})
export class BkUsuarioEmpEditaPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form: FormGroup;
  formPass: FormGroup;
  usuario: IUsuario;
  usuId: '';
  role:'';
  myDate: Date;
  
  constructor(
    private firestore: AngularFirestore,
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService,
    private storage: StorageService,
    private router:Router,
    private alertController: AlertController
  ) { 
    this.form = this.formBuilder.group({
      apellido: [''],
      nombre:[''],
      fechaNac: [''],
      nroTelefono: [''],
    })
    this.formPass = this.formBuilder.group({
      newPass: ['']
    })
  }

  ngOnInit() {
    //console.log(this.storage.get('rol'));
    //console.log(this.storage.get('usuario'));
    this.storage.get('usuario').then((val)=>{ 
      this.usuId = val;
      //console.log('usuario: '+this.usuId);
      this.usuarioService.getUser(this.usuId).subscribe((usu)=>{
        //console.log(usu);
        this.usuario = usu;
        this.form.controls.apellido.setValue(this.usuario.apellido);
        this.form.controls.nombre.setValue(this.usuario.nombre);
        //this.myDate = this.usuario.fechaNac;
        this.form.controls.fechaNac.setValue(this.usuario.fechaNac);
        this.form.controls.nroTelefono.setValue(this.usuario.nroTelefono);
      })
    });
  }

  async presentAlert() {
    await this.storage.get('rol').then((ref) => {
      this.role = ref;
    });
    const alert = await this.alertController.create({
      header: '¿Confirma que desea actualizar sus datos?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
            console.log('alerta cancelada')
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            //this.handlerMessage = 'Alert confirmed';
            console.log('alerta confirmada');
            console.log(this.role);
            var usuCliUpdated = {
              apellido: this.form.controls.apellido.value,
              nombre: this.form.controls.nombre.value,
              fechaNac: this.form.controls.fechaNac.value,
              nroTelefono: this.form.controls.nroTelefono.value,
              rol: this.role
            };
            this.usuarioService.updateUser(this.usuId, usuCliUpdated);
            console.log('Usuario actualizado')
            //console.log(this.usuario)
            this.router.navigate(['/bk-menu-usuarios-emp']);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  editaPass(){
    const auth = getAuth();
    const user = auth.currentUser;
    const newPassword = this.formPass.controls.newPass.value;
    updatePassword(user, newPassword).then(() => {
      console.log('Contraseña actualizada')
      this.modal.dismiss(null, 'cancel');
    }).catch((error) => {
      console.log('Error'+error)
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  redirectInicio(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  redirectMenuUsu(){
    this.router.navigate(['/bk-menu-usuarios-emp']);
  }
}
