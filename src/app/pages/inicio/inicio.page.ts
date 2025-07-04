import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import {
  ListaComponent,
  IPokemonLista,
} from 'src/app/components/lista/lista.component';
import { getId } from 'src/app/utils/getId.utils';
import { formatarNome } from 'src/app/utils/formatarNome.utils';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { BuscaService } from 'src/app/services/busca/busca.service';
import { TabEventsService } from 'src/app/services/tab-events/tab-events.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { addIcons } from 'ionicons';
import { pricetag, moon, sunny } from 'ionicons/icons';
import { PokemonTypes } from 'src/app/services/pokeapi/pokeapi.mode';
import { CORES_TIPO } from 'src/app/utils/cores.utils';
import { AriaFocusFixer } from 'src/app/utils/AriaFocusFixer.utils';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    ListaComponent,
    IonSpinner,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonText,
    IonGrid,
    IonCol,
    IonRow,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
  ],
})
export class InicioPage extends AriaFocusFixer implements OnInit {
  isDarkMode$: Observable<boolean>;

  @ViewChild(IonContent) content!: IonContent;
  private tabsSubscription!: Subscription;

  paletteToggle = false;
  pokemons: IPokemonLista[] = [];
  offset = 0;
  limit = 20;
  isLoading = false;
  tipos = PokemonTypes;

  constructor(
    private pokeapiService: PokeAPIService,
    public buscaService: BuscaService,
    private tabEventsService: TabEventsService,
    private themeService: ThemeService
  ) {
    super();
    addIcons({ pricetag, moon, sunny });
    this.isDarkMode$ = this.themeService.paletteToggle$;
  }

  ngOnInit(): void {
    this.tabsSubscription = this.tabEventsService.tabClicked$.subscribe(
      (tabName) => {
        if (tabName === 'inicio')
          this.tabEventsService.scrollToTop(this.content);
      }
    );

    this.loadPokemons();
  }

  ngOnDestroy() {
    if (this.tabsSubscription) this.tabsSubscription.unsubscribe();
  }

  onSearch(event: any) {
    this.buscaService.onSearch(event.detail.value);
  }

  onFilter(event: any) {
    this.buscaService.onFilter(event.detail.value);
  }

  loadPokemons(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.pokeapiService
      .getPokemons(this.offset.toString(), this.limit.toString())
      .subscribe((res) => {
        this.isLoading = false;

        let newPokemons: IPokemonLista[] = res.results.map((pokemon) => ({
          id: getId(pokemon.url),
          name: formatarNome(pokemon.name),
        }));

        newPokemons = newPokemons.filter((pokemon) => pokemon.id <= 9999);

        this.pokemons = [...this.pokemons, ...newPokemons];

        this.offset += this.limit;

        if (event) {
          event.target.complete();

          if (res.next === null) event.target.disabled = true;
        }
      });
  }

  getFocusStyle(tipo: string): { [key: string]: string } {
    if (tipo === 'default' || tipo === null) {
      return {
        '--highlight-color': 'none',
      };
    }

    const colorSet = CORES_TIPO[tipo] || CORES_TIPO['default'];

    return {
      '--highlight-color': colorSet.primary,
    };
  }

  toggleTheme() {
    this.themeService.togglePalette();
  }
}
