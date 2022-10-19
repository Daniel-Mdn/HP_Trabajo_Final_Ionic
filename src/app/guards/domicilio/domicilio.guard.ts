import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IDomicilio } from 'src/app/constants/interfaces';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DomicilioGuard implements CanActivate {
  currentDomicilio: IDomicilio;
  constructor(
    private storage: StorageService,
    private domicilioService: DomicilioService
  ) {
    domicilioService.getCurrentDomicilio$.subscribe(
      (dom) => (this.currentDomicilio = dom)
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return true;
  }
}
