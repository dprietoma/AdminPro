import { Component } from '@angular/core';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-graphics-1',
  templateUrl: './graphics-1.component.html',
  styles: [
  ]
})
export class Graphics1Component {
    // 1) Doughnut
  tituloDona = 'Ventas por categoría (Dona)';
  tipoDona: ChartType = 'doughnut';
  etiquetasDona = ['Electrónicos', 'Ropa', 'Hogar', 'Otros'];
  datosDona = [420, 260, 180, 90];
  coloresDona = ['#3b82f6', '#22c55e', '#f59e0b', '#a78bfa'];
  coloresHoverDona = ['#2563eb', '#16a34a', '#d97706', '#7c3aed'];

  // 2) Pie
  tituloPie = 'Participación por región (Pie)';
  tipoPie: ChartType = 'pie';
  etiquetasPie = ['Norte', 'Sur', 'Este', 'Oeste'];
  datosPie = [35, 25, 20, 20];
  coloresPie = ['#ef4444', '#06b6d4', '#84cc16', '#f97316'];
  coloresHoverPie = ['#dc2626', '#0891b2', '#65a30d', '#ea580c'];

  // 3) Barras (una sola serie)
  tituloBar = 'Visitas mensuales (Barras)';
  tipoBar: ChartType = 'bar';
  etiquetasBar = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  datosBar = [120, 150, 90, 200, 170, 140];
  coloresBar = ['#60a5fa','#60a5fa','#60a5fa','#60a5fa','#60a5fa','#60a5fa'];
  coloresHoverBar = ['#3b82f6','#3b82f6','#3b82f6','#3b82f6','#3b82f6','#3b82f6'];

  // 4) Línea (una sola serie)
  tituloLine = 'Ingresos (Línea)';
  tipoLine: ChartType = 'line';
  etiquetasLine = ['Q1','Q2','Q3','Q4'];
  datosLine = [30, 45, 40, 60];
  // Para line, backgroundColor semitransparente queda bien:
  coloresLine = ['rgba(34,197,94,0.25)','rgba(34,197,94,0.25)','rgba(34,197,94,0.25)','rgba(34,197,94,0.25)'];
  coloresHoverLine = ['rgba(34,197,94,0.35)','rgba(34,197,94,0.35)','rgba(34,197,94,0.35)','rgba(34,197,94,0.35)'];

}
