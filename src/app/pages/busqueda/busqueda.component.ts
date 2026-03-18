import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medicos.model';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {

  private activatedRouter = inject(ActivatedRoute);
  private busquedasSevice = inject(BusquedasService);


  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( ({ termino }) => {

    this.busquedaGlobal(termino);
    })
  }


  busquedaGlobal(termino: string) {
    this.busquedasSevice.busquedaGlobal(termino).subscribe( (resp:any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    })
  }

}
