import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PokeAPIService } from 'src/app/services/pokeapi/pokeapi.service';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { ToastController } from '@ionic/angular';
import { IPokemon } from 'src/app/services/pokeapi/pokeapi.mode';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heart, heartOutline } from 'ionicons/icons';

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
    CommonModule,
  ],
  providers: [ToastController],
})
export class DetalhesPage implements OnInit {
  pokemon?: IPokemon;
  isFavorito = false;
  private currentToast: HTMLIonToastElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeAPIService,
    private favoritosService: FavoritosService,
    private location: Location,
    private toastCtrl: ToastController
  ) {
    addIcons({ heart, heartOutline, arrowBackOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokeapiService.getPokemon(id).subscribe(async (res) => {
        this.pokemon = res;
        this.isFavorito = await this.favoritosService.isFavorito(
          this.pokemon.id
        );
      });
    }
  }

  async toggleFavorito() {
    if (!this.pokemon) return;

    let toastMessage = '';

    if (this.isFavorito) {
      await this.favoritosService.removeFavorito(this.pokemon.id);
      toastMessage = `${this.pokemon.name} removido dos favoritos 😢`;
    } else {
      await this.favoritosService.setFavorito(this.pokemon);
      toastMessage = `${this.pokemon.name} adicionado aos favoritos!`;
    }

    this.isFavorito = !this.isFavorito;

    if (this.currentToast) {
      await this.currentToast.dismiss();
      this.currentToast = null;
    }

    this.currentToast = await this.toastCtrl.create({
      message: toastMessage,
      duration: 2000,
      position: 'top',
      positionAnchor: 'header-id',
    });
    await this.currentToast.present();
  }

  voltar(): void {
    this.location.back();
  }
}
