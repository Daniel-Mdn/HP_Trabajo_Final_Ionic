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
    path: 'seleccion-domicilio',
    loadChildren: () => import('./pages/seleccion-domicilio/seleccion-domicilio.module').then( m => m.SeleccionDomicilioPageModule)
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
    path: 'confirmar-pedido',
    loadChildren: () => import('./pages/confirmar-pedido/confirmar-pedido.module').then( m => m.ConfirmarPedidoPageModule)
  },
  {
    path: 'detalle-pedido',
    loadChildren: () => import('./pages/detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'usuario-cli-registro',
    loadChildren: () => import('./pages/usuario-cli-registro/usuario-cli-registro.module').then( m => m.UsuarioCliRegistroPageModule)
  },
  {
    path: 'pedidos-historico',
    loadChildren: () => import('./pages/pedidos-historico/pedidos-historico.module').then( m => m.PedidosHistoricoPageModule)
  },
  {
    path: 'usuario-cli-edita',
    loadChildren: () => import('./pages/usuario-cli-edita/usuario-cli-edita.module').then( m => m.UsuarioCliEditaPageModule)
  },
  {
    path: 'bk-menu-empleado',
    loadChildren: () => import('./pages/bk-menu-empleado/bk-menu-empleado.module').then( m => m.BkMenuEmpleadoPageModule)
  },
  {
    path: 'bk-menu-productos',
    loadChildren: () => import('./pages/bk-menu-productos/bk-menu-productos.module').then( m => m.BkMenuProductosPageModule)
  },
  {
    path: 'bk-menu-usuarios-emp',
    loadChildren: () => import('./pages/bk-menu-usuarios-emp/bk-menu-usuarios-emp.module').then( m => m.BkMenuUsuariosEmpPageModule)
  },
  {
    path: 'bk-listado-pedidos-turno',
    loadChildren: () => import('./pages/bk-listado-pedidos-turno/bk-listado-pedidos-turno.module').then( m => m.BkListadoPedidosTurnoPageModule)
  },
  {
    path: 'bk-usuario-emp-registro',
    loadChildren: () => import('./pages/bk-usuario-emp-registro/bk-usuario-emp-registro.module').then( m => m.BkUsuarioEmpRegistroPageModule)
  },
  {
    path: 'bk-usuario-emp-edita',
    loadChildren: () => import('./pages/bk-usuario-emp-edita/bk-usuario-emp-edita.module').then( m => m.BkUsuarioEmpEditaPageModule)
  },
  {
    path: 'bk-producto-registra',
    loadChildren: () => import('./pages/bk-producto-registra/bk-producto-registra.module').then( m => m.BkProductoRegistraPageModule)
  },
  {
    path: 'bk-producto-lista',
    loadChildren: () => import('./pages/bk-producto-lista/bk-producto-lista.module').then( m => m.BkProductoListaPageModule)
  },
  {
    path: 'bk-producto-edita',
    loadChildren: () => import('./pages/bk-producto-edita/bk-producto-edita.module').then( m => m.BkProductoEditaPageModule)
  },

  {
    path: 'bk-pedido-detalle',
    loadChildren: () => import('./pages/bk-pedido-detalle/bk-pedido-detalle.module').then( m => m.BkPedidoDetallePageModule)
  },
  {
    path: 'bk-pedido-estado',
    loadChildren: () => import('./pages/bk-pedido-estado/bk-pedido-estado.module').then( m => m.BkPedidoEstadoPageModule)
  },
  {
    path: 'bk-reporte-ventas',
    loadChildren: () => import('./pages/bk-reporte-ventas/bk-reporte-ventas.module').then( m => m.BkReporteVentasPageModule)
  },
  {
    path: 'bk-adicional-carga',
    loadChildren: () => import('./pages/bk-adicional-carga/bk-adicional-carga.module').then( m => m.BkAdicionalCargaPageModule)
  },
  {
    path: 'bk-adicional-lista',
    loadChildren: () => import('./pages/bk-adicional-lista/bk-adicional-lista.module').then( m => m.BkAdicionalListaPageModule)
  },
  {
    path: 'bk-adicional-edita',
    loadChildren: () => import('./pages/bk-adicional-edita/bk-adicional-edita.module').then( m => m.BkAdicionalEditaPageModule)
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
