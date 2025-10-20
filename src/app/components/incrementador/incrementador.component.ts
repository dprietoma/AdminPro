import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() btnClass: string = 'btn-primary';

  @Output() progressChange: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number): any {
    if (this.progress >= 100 && valor > 0) {
      this.progressChange.emit(100);
      return (this.progress = 100);
    }

    if (this.progress <= 0 && valor < 0) {
      this.progressChange.emit(0);  
      return (this.progress = 0);
    }

    this.progress = this.progress + valor;
    this.progressChange.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.progressChange.emit(this.progress);
  }
}
