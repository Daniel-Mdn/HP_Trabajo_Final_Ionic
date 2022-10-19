import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private menu: MenuController,
    private router: Router,
    private domicilioService: DomicilioService,
    private storage: StorageService
  ) {}
  @Input() prevPage: string = 'inicio';
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentDomicilio$: Observable<IDomicilio> = of();
  currentDomicilio: IDomicilio;
  userDomicilios: Observable<IDomicilio[]> = from([]);

  async ngOnInit() {
    this.currentDomicilio$ = this.domicilioService.getCurrentDomicilio$;
    this.currentDomicilio$.subscribe((dom) => {
      if (Object.entries(dom).length !== 0) {
        this.currentDomicilio = dom;
      }
    });
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  redirectPedidos() {
    this.router.navigate(['/pedidos-historico']);
  }
  redirectUsuario() {}
  redirectDomicilios() {
    this.router.navigate(['/domicilios']);
  }

  logout() {}

  goPrevPage() {
    this.back.emit(true);
    this.router.navigate(['/' + this.prevPage]);
  }

  formatDomicilio(): string {
    let depto: string;
    if (this.currentDomicilio.dpto && this.currentDomicilio.piso) {
      depto = this.currentDomicilio.piso + ' ' + this.currentDomicilio.dpto;
    }
    return (
      this.currentDomicilio.calle +
      ' ' +
      this.currentDomicilio.nroCasa +
      ', ' +
      (depto ? depto + ', ' : '') +
      this.currentDomicilio.idLocalidad
    );
  }
}
