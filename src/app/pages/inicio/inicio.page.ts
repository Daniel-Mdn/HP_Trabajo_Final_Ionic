import { Component, OnInit } from '@angular/core';
import { Categorias, Tamaños } from 'src/app/constants/constants';
import { ICategoria, IProducto, IUsuario } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from 'src/app/services/firestore-base.service';
import { first } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor( private usuarioService: UsuarioService, private router:Router) {}
  categorias: ICategoria[] = [{id: 1, descCat:Categorias.Hambuerguesas },{id:2, descCat:Categorias.Pizzas}];
  catFiltrada?:number;
  productos: IProducto[] = [
    {
      id: 1,
      nombre: '3 Max',
      baja: false,
      disponibilidad: true,
      idCat: 1,
      tamanio: Tamaños.Doble,
      descProd:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      nombre: 'Normalita',
      baja: false,
      disponibilidad: true,
      idCat: 1,
      tamanio: Tamaños.Simple,
      descProd:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      nombre: 'Pizza',
      baja: false,
      disponibilidad: true,
      idCat: 2,
      tamanio: Tamaños.Grande,
      descProd:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];
  list:IProducto[]=[];
  ngOnInit() {
    

    this.list=this.productos
    let user:IUsuario={nombre:"prueba", apellido:"prueba"}
    
    this.usuarioService.getUsers().subscribe((value)=>{
      console.log(value[0].nombre)
    });
    
    console.log(this.list)
  }

  handleFilter(event:any){
    this.catFiltrada=event.detail.value
    if(this.catFiltrada!=-1){
      this.list=this.productos.filter((prod)=>{
        return prod.idCat===Number(this.catFiltrada!)
      });
    }else{
      return this.list=this.productos
    }
  }

  selectProduct(id:number){
    this.router.navigate(['/producto/{id}', id])
    console.log("prueba")
  }
}
