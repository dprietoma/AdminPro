import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervalSub!: Subscription;


  constructor() {
    // this.retornaObservable().pipe(retry()).subscribe({
    //   next: (valor) => console.log('Subs:', valor),
    //   error: (err) => console.warn(err),
    //   complete: () => console.info('Obs terminado'),
    // });

    this.intervalSub = this.retornaintervalo().subscribe(
      (valor) => console.log('Intervalo', valor)
    );
  }


  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }


  retornaintervalo(): Observable<number> {
    return  interval(300).pipe(
      // take(10),
      map( valor => valor + 1),
      filter( valor => (valor % 2 === 0) ? true : false ), 
    );
  }

  retornaObservable(): Observable<number> {
    let contador = -1;

    return new Observable<number>((subscriber) => {
      const intervalo = setInterval(() => {
        contador++;
        subscriber.next(contador);

        if (contador === 4) {
          clearInterval(intervalo);
          subscriber.complete();
        }

        if (contador === 2) {
          // clearInterval(intervalo);
          subscriber.error('Error: El contador llegó a 6');
        }
      }, 1000);
    });
  }
}
