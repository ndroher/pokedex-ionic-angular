import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { IPokemon } from '../pokeapi/pokeapi.mode';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private _storage: Storage | null = null;
  private favoritosIdsSubject = new BehaviorSubject<number[]>([]);
  public favoritosIds$ = this.favoritosIdsSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const favoritos = await this.getFavoritos();
    const ids = favoritos.map((p) => p.id);
    this.favoritosIdsSubject.next(ids);
  }

  async getFavoritos(): Promise<IPokemon[]> {
    const favoritos = (await this._storage?.get('favoritos')) || [];
    return favoritos.sort((a: IPokemon, b: IPokemon) => a.id - b.id);
  }

  async toggleFavorito(pokemon: IPokemon): Promise<boolean> {
    const favoritos = await this.getFavoritos();
    const isFavorito = favoritos.some((p) => p.id === pokemon.id);

    let novosFavoritos: IPokemon[];

    if (isFavorito) {
      novosFavoritos = favoritos.filter((p) => p.id !== pokemon.id);
    } else {
      novosFavoritos = [...favoritos, pokemon];
    }

    await this._storage?.set('favoritos', novosFavoritos);

    const novosIds = novosFavoritos.map((p) => p.id);
    this.favoritosIdsSubject.next(novosIds);

    return !isFavorito;
  }

  async setFavorito(pokemon: IPokemon): Promise<void> {
    const favoritos = await this.getFavoritos();
    if (!favoritos.some((p) => p.id === pokemon.id)) {
      favoritos.push(pokemon);
      await this._storage?.set('favoritos', favoritos);
    }
  }

  async removeFavorito(id: number): Promise<void> {
    let favoritos = await this.getFavoritos();
    favoritos = favoritos.filter((p) => p.id !== id);
    await this._storage?.set('favoritos', favoritos);
  }

  async isFavorito(id: number): Promise<boolean> {
    const favoritos = await this.getFavoritos();
    return favoritos.some((p) => p.id === id);
  }
}
