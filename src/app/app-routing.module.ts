import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'producto-adicionales',
    loadChildren: () => import('./pages/producto-adicionales/producto-adicionales.module').then( m => m.ProductoAdicionalesPageModule)
  },
  {
    path: 'domicilios',
    loadChildren: () => import('./pages/domicilios/domicilios.module').then( m => m.DomiciliosPageModule)
  },
  {
    path: 'domicilios-editar',
    loadChildren: () => import('./pages/domicilios-editar/domicilios-editar.module').then( m => m.DomiciliosEditarPageModule)
  },
  {
    path: 'domicilios-registro',
    loadChildren: () => import('./pages/domicilios-registro/domicilios-registro.module').then( m => m.DomiciliosRegistroPageModule)
  },
  {
    path: 'sidebar',
    loadChildren: () => import('./pages/sidebar/sidebar.module').then( m => m.SidebarPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'forma-de-pago',
    loadChildren: () => import('./pages/forma-de-pago/forma-de-pago.module').then( m => m.FormaDePagoPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
