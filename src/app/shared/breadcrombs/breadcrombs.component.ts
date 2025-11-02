import { Component, inject, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrombs',
  templateUrl: './breadcrombs.component.html',
  styles: [],
})
export class BreadcrombsComponent implements OnDestroy {
  router = inject(Router);

  titulo: string = '';
  tituloSus$!: Subscription;

  constructor() {
    this.tituloSus$ = this.getArgumentosRuta().subscribe(({ title }) => {
      this.titulo = title;
      document.title = `AdminPro - ${this.titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSus$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((e): e is ActivationEnd => e instanceof ActivationEnd),
      filter((e) => e.snapshot.firstChild === null),
      map((e) => e.snapshot.data)
    );
  }
}
