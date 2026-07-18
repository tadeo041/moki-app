import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, bicycleOutline, alertCircleOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-admin-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  templateUrl: './admin-tabs.page.html',
  styleUrls: ['./admin-tabs.page.scss']
})
export class AdminTabsPage {
  constructor() {
    addIcons({ homeOutline, bicycleOutline, alertCircleOutline, personOutline });
  }
}
