import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
} from '@ionic/angular/standalone';
import {
  ListaComponent,
  IPokemonLista,
} from 'src/app/components/lista/lista.component';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { TabEventsService } from 'src/app/services/tab-events/tab-events.service';
import { AriaFocusFixer } from 'src/app/utils/AriaFocusFixer.utils';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    ListaComponent,
    CommonModule,
  ],
})
export class FavoritosPage extends AriaFocusFixer {
  @ViewChild(IonContent) content!: IonContent;
  private tabsSubscription!: Subscription;

  pokemons: IPokemonLista[] = [];

  constructor(
    private favoritosService: FavoritosService,
    private tabEventsService: TabEventsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tabsSubscription = this.tabEventsService.tabClicked$.subscribe(
      (tabName) => {
        if (tabName === 'favoritos')
          this.tabEventsService.scrollToTop(this.content);
      }
    );
  }

  ngOnDestroy() {
    if (this.tabsSubscription) this.tabsSubscription.unsubscribe();
  }

  async ionViewWillEnter() {
    this.pokemons = await this.favoritosService.getFavoritos();
  }
}
