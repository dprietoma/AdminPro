import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafi-dona',
  templateUrl: './grafi-dona.component.html',
  styles: [],
})
export class GrafiDonaComponent  {
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  /** Título arriba del gráfico */
  @Input() titulo = '';

  /** Etiquetas y datos (en el mismo orden) */
  @Input() etiquetas: string[] = [];
  @Input() datos: number[] = [];

  /** Tipo de gráfico: 'doughnut' | 'pie' | 'bar' | 'line' | ... */
  @Input() tipo: ChartType = 'doughnut';

  /** Colores (uno por slice/barra). Si no los mandas, usa defaults. */
  @Input() backgroundColor: string[] = ['#ef4444','#3b82f6','#f59e0b','#22c55e'];
  @Input() hoverBackgroundColor: string[] = ['#dc2626','#2563eb','#d97706','#16a34a'];
  @Input() borderColor = '#ffffff';
  @Input() borderWidth = 2;

  // ❗️OJO: usamos los tipos NO genéricos para permitir tipo dinámico sin error de TS
  data: ChartConfiguration['data'] = { labels: [], datasets: [] };
  options: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#111827' } },
      tooltip: {
        titleColor: '#111827',
        bodyColor: '#111827',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['etiquetas'] || changes['datos'] ||
        changes['backgroundColor'] || changes['hoverBackgroundColor'] ||
        changes['borderColor'] || changes['borderWidth'] || changes['tipo']) {
      this.buildData();
      queueMicrotask(() => this.chart?.update());
    }
  }

  private buildData(): void {
    // Dataset “genérico” que funciona para doughnut/pie/bar/line (Chart.js entiende las props)
    this.data = {
      labels: this.etiquetas ?? [],
      datasets: [{
        data: this.datos ?? [],
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: this.hoverBackgroundColor,
        borderColor: this.borderColor,
        borderWidth: this.borderWidth
      }]
    };

    // Ajustes por tipo (opcional)
    if (this.tipo === 'bar' || this.tipo === 'line') {
      // ejemplo: barras/lineas suelen verse mejor con borderColor más oscuro
      this.data.datasets[0]['borderColor'] = this.borderColor || '#111827';
    }
  }
}
