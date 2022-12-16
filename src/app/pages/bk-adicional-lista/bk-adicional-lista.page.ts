import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { SearchbarCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first,map } from 'rxjs/operators';
import {
  IExtras,
  IHistorialExtras,
  IWhere,
} from 'src/app/constants/interfaces';
import { ExtrasService } from 'src/app/services/extras/extras.service';

@Component({
  selector: 'app-bk-adicional-lista',
  templateUrl: './bk-adicional-lista.page.html',
  styleUrls: ['./bk-adicional-lista.page.scss'],
})
export class BkAdicionalListaPage implements OnInit {
  constructor(
    private router: Router,
    private extraService: ExtrasService,
    private firestore: AngularFirestore
  ) {}

  searchFiltrado?: string;
  extras$: Observable<IExtras[]>;
  extras: IExtras[];
  ngOnInit() {
    this.extras$ = this.extraService.getExtras$;
    this.extraService.getExtrasId().subscribe((resp) => {
      resp.map((a) => {
        const hist = this.firestore.doc(a.histPath);
        hist
          .collection<IHistorialExtras>('historial_extras', (ref) =>
            ref.orderBy('fechaDesde', 'desc')
          )
          .valueChanges()
          .subscribe((x) => {
            a.historial_extra = [x[0]];
            a.precio = x[0]?.precioExtra ?? 0;
          });
      });
      this.extras=resp
      this.extraService.setExtras$(resp);
    });
  }

  goPrevPage() {
    this.router.navigate(['/bk-menu-productos']);
  }

  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }
  selectAdic(id: string) {
    this.router.navigate(['/bk-adicional-edita/', id]);
  }

  handleChange(event: any) {
    let eventSearch = event as SearchbarCustomEvent;
    this.searchFiltrado = eventSearch.target.value.toLowerCase();
    this.extraService
      .getExtrasId({
        order: 'descExtra',
      })
      .pipe(
        map((res) => {
          return res.filter((item) =>
            item.descExtra
              .toLowerCase()
              .includes(eventSearch.target.value.toLowerCase())
          );
        })
      )
      .subscribe((resp) => {
        this.extras = resp;
        this.extras.map((e) => {
          e.histPath;
          e.historial_extra = [];
          const hist = this.firestore.doc(e.histPath);
          hist
            .collection<IHistorialExtras>('historial_extras', (ref) =>
              ref.orderBy('fechaDesde', 'desc')
            )
            .valueChanges()
            .pipe(first())
            .subscribe((x) => {
              e.historial_extra.push(x[0]);
              e.precio = x[0]?.precioExtra ?? 0;
              // this.totalProducto = this.producto.precio;
            });
        });
        this.extraService.setExtras$(this.extras);
      });
  }
}
