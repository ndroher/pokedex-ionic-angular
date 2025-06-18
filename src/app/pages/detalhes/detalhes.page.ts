import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
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
import { IPokemon } from 'src/app/services/pokeapi/pokeapi.mode';

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
    IonBackButton,
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
})
export class DetalhesPage implements OnInit {
  pokemon?: IPokemon;

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeAPIService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokeapiService.getPokemon(id).subscribe((res) => {
        this.pokemon = res;
      });
    }
  }
}
