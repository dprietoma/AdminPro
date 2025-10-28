import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
declare function customInitFuntions(): void;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public settingsService = inject(SettingsService);

  constructor() { }

  ngOnInit(): void {
    customInitFuntions();
  }
}
