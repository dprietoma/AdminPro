import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { SidebarService } from 'src/app/services/sidebar.service';
declare function customInitFuntions(): void;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public settingsService = inject(SettingsService);
  public sidebarService = inject(SidebarService);

  constructor() { }

  ngOnInit(): void {
    customInitFuntions();
    this.sidebarService.cargarMenu();
  }
}
