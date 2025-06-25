import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { TabEventsService } from '../services/tab-events/tab-events.service';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    private router: Router,
    private tabEventsService: TabEventsService
  ) {
    addIcons({ home, heart });
  }

  onTabClick(page: string) {
    if (this.router.url === `/${page}`) {
      this.tabEventsService.notifyTabClicked(page);
    } else {
      this.router.navigateByUrl(`/${page}`);
    }
  }
}
