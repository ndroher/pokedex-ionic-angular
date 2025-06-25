import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonSpinner,
  IonProgressBar,
  IonToast,
} from '@ionic/angular/standalone';
import { formatarNome, titleCase } from 'src/app/utils/formatarNome.utils';
import { hifenParaEspaco } from 'src/app/utils/hifenParaEspaco.utils';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { IPokemon } from 'src/app/services/pokeapi/pokeapi.mode';
import { CORES_TIPO } from 'src/app/utils/cores.utils';
import { MAX_ID } from 'src/app/utils/constants.utils';
import { AriaFocusFixer } from 'src/app/utils/AriaFocusFixer.utils';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  heart,
  heartOutline,
  chevronBack,
  chevronForward,
  statsChart,
  bonfire,
  eyeOff,
  resize,
  barbell,
} from 'ionicons/icons';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonGrid,
    IonCol,
    IonRow,
    IonText,
    IonSpinner,
    IonProgressBar,
    IonToast,
    CommonModule,
    RouterLink,
  ],
})
export class DetalhesPage extends AriaFocusFixer implements OnInit, OnDestroy {
  isDarkMode$: Observable<boolean>;

  pokemon?: IPokemon;
  isFavorito = false;
  toastMessage = '';
  isToastOpen = false;
  showImg = false;
  readonly MAX_ID = MAX_ID;

  private favoritosSub?: Subscription;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeAPIService,
    private favoritosService: FavoritosService,
    private location: Location,
    private themeService: ThemeService
  ) {
    super();
    this.isDarkMode$ = this.themeService.paletteToggle$;
    addIcons({
      heart,
      heartOutline,
      arrowBackOutline,
      chevronBack,
      chevronForward,
      statsChart,
      bonfire,
      eyeOff,
      resize,
      barbell,
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;
      this.showImg = false;
      this.pokeapiService.getPokemon(id).subscribe(async (res) => {
        this.pokemon = res;
        this.pokemon.name = formatarNome(this.pokemon.name);
        this.pokemon.abilities.forEach(
          (p) => (p.ability.name = hifenParaEspaco(p.ability.name))
        );
        this.pokemon.stats.forEach(
          (p) => (p.stat.name = hifenParaEspaco(p.stat.name))
        );
        if (this.favoritosSub) this.favoritosSub.unsubscribe();
        this.favoritosSub = this.favoritosService.favoritosIds$.subscribe(
          (ids) => {
            if (this.pokemon) {
              this.isFavorito = ids.includes(this.pokemon.id);
            }
          }
        );
        this.showImg = true;
      });
    });
  }

  ngOnDestroy() {
    this.favoritosSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  async toggleFavorito() {
    if (!this.pokemon) return;

    this.isFavorito = await this.favoritosService.toggleFavorito(this.pokemon);

    this.toastMessage = this.isFavorito
      ? `${titleCase(
          formatarNome(this.pokemon.name)
        )} adicionado aos favoritos!`
      : `${titleCase(
          formatarNome(this.pokemon.name)
        )} removido dos favoritos 😢`;

    this.setOpenToast(true);
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  voltar(): void {
    this.location.back();
  }

  getBadgeStyle(tipo: string): { [key: string]: string } {
    const colorSet = CORES_TIPO[tipo] || CORES_TIPO['default'];

    return {
      '--badge-primary': colorSet.primary,
      '--badge-secondary-light': colorSet['secondary-light'],
      '--badge-secondary-dark': colorSet['secondary-dark'],
    };
  }

  getProgressBarStyle(tipo: string): { [key: string]: string } {
    const colorSet = CORES_TIPO[tipo] || CORES_TIPO['default'];

    return {
      '--progress-bar-primary': colorSet.primary,
      '--progress-bar-secondary-light': colorSet['secondary-light'],
      '--progress-bar-secondary-dark': colorSet['secondary-dark'],
    };
  }

  getRingStyle(): { [key: string]: string } {
    let colorSet1 = CORES_TIPO['default'];
    let colorSet2 = CORES_TIPO['default'];

    if (this.pokemon) {
      const tipos = this.pokemon.types.map((t) => t.type.name);

      colorSet1 = CORES_TIPO[tipos[0]] || CORES_TIPO['default'];

      colorSet2 = tipos[1]
        ? CORES_TIPO[tipos[1]] || CORES_TIPO['default']
        : colorSet1;
    }

    return {
      '--ring-color-1': colorSet1.primary,
      '--ring-color-2': colorSet2.primary,
    };
  }

  onImgLoad(event: any) {
    event.target.classList.add('is-loaded');
  }
}
