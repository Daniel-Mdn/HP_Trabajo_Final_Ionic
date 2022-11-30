import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { now } from '@ionic/core/dist/types/utils/helpers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fechasValidator, whereDateFilter } from 'src/app/constants/constants';
import { IPedido } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-bk-reporte-ventas',
  templateUrl: './bk-reporte-ventas.page.html',
  styleUrls: ['./bk-reporte-ventas.page.scss'],
})
export class BkReporteVentasPage implements OnInit {
  constructor(
    private router: Router,
    private alertController: AlertController,
    private pedidosService: PedidoService,
    private lineaPedidoService: LineaPedidoService,
    private domicilioService: DomicilioService
  ) {}

  form: FormGroup = new FormGroup({
    fechaDesde: new FormControl(
      new Date(new Date().getTime() - 27 * 60 * 60 * 1000).toISOString(),
      [Validators.required]
    ),
    fechaHasta: new FormControl(
      new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString(),
      [Validators.required]
    ),
  });

  listaPedidos$: Observable<IPedido[]>;
  pedidoSelected: IPedido;
  async ngOnInit() {
    let hoy = new Date();
    let ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    this.listaPedidos$ = this.pedidosService.listPedidos$;
    this.pedidosService
      .getPedidosId({
        where: [
          { name: 'fechaPedido', validation: '<=', value: hoy },
          { name: 'fechaPedido', validation: '>=', value: ayer },
        ],
        order: 'fechaPedido',
        orderOrientacion: 'desc',
      })
      .pipe(
        map((res) => {
          res.forEach((pedido) => {
            this.domicilioService
              .getDomicilio(pedido.idDomicilio)
              .subscribe((dom) => {
                pedido.domicilio = dom;
              });
            this.lineaPedidoService
              .getLineasPedidoId({
                where: [
                  { name: 'idPedido', validation: '==', value: pedido.id },
                ],
              })
              .subscribe((lineas) => {
                if (lineas) {
                  pedido.lineasPedido = lineas;
                }
              });
          });
          return res;
        })
      )
      .subscribe((peds) => this.pedidosService.setPedidos$(peds));
    this.fechaDesde.valueChanges.subscribe((value) => {
      if (this.fechaHasta.value < value) {
        this.fechaHasta.setErrors({
          fechaMayor: 'La fecha desde debe ser menor que la fecha hasta',
          ...this.fechaHasta.errors,
        });
      } else {
        if (this.fechaHasta.getError('required')) {
          this.fechaHasta.setErrors(this.fechaHasta.getError('required'));
        } else {
          this.fechaHasta.setErrors(null);
        }
      }
    });
    this.fechaHasta.valueChanges.subscribe((value) => {
      if (this.fechaDesde.value > value) {
        this.fechaHasta.setErrors({
          fechaMayor: 'La fecha desde debe ser menor que la fecha hasta',
          ...this.fechaHasta.errors,
        });
      } else {
        if (this.fechaHasta.getError('required')) {
          this.fechaHasta.setErrors(this.fechaHasta.getError('required'));
        } else {
          this.fechaHasta.setErrors({});
        }
      }
    });
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  goPrevPage() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  get fechaDesde() {
    return this.form.get('fechaDesde');
  }
  get fechaHasta() {
    return this.form.get('fechaHasta');
  }
  getReporte() {
    if (this.form.valid) {
      this.pedidosService
        .getPedidosId({
          where: [
            {
              name: 'fechaPedido',
              validation: '<=',
              value: new Date(this.fechaHasta.value),
            },
            {
              name: 'fechaPedido',
              validation: '>=',
              value: new Date(this.fechaDesde.value),
            },
          ],
          order: 'fechaPedido',
          orderOrientacion: 'desc',
        })
        .pipe(
          map((res) => {
            res.forEach((pedido) => {
              this.domicilioService
                .getDomicilio(pedido.idDomicilio)
                .subscribe((dom) => {
                  pedido.domicilio = dom;
                });
              this.lineaPedidoService
                .getLineasPedidoId({
                  where: [
                    { name: 'idPedido', validation: '==', value: pedido.id },
                  ],
                })
                .subscribe((lineas) => {
                  if (lineas) {
                    pedido.lineasPedido = lineas;
                  }
                });
            });
            return res;
          })
        )
        .subscribe((peds) => this.pedidosService.setPedidos$(peds));
    } else {
      this.presentAlert(this.fechaHasta.errors);
    }
  }
  async presentAlert(error: ValidationErrors) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Revise el periodo ingresado',
      message:
        error.fechaMayor ?? '' + (error.required ? '-' + error.required : ''),
      buttons: ['OK'],
    });
    await alert.present();
  }

  getTotal(): number {
    let suma = 0;
    this.listaPedidos$.subscribe((res) => {
      suma = res.reduce((a, b) => a + b.total, 0);
    });
    return suma;
  }
  getCantidadPedidos(): number {
    let cantidad = 1;
    this.listaPedidos$.subscribe((res) => {
      cantidad = res.length;
    });
    return cantidad;
  }

  isModalOpen = false;

  goToPedido(id: string) {
    this.listaPedidos$.subscribe((res) => {
      this.pedidoSelected = res.find((ped) => ped.id == id);
    });
    this.setOpen(true);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  formatDomicilio() {
    if (this.pedidoSelected.domicilio) {
      return this.domicilioService.formatDomicilio(
        this.pedidoSelected.domicilio
      );
    } else {
      return '';
    }
  }
}
