import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IPokemon } from '../pokeapi/pokeapi.mode';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getFavoritos(): Promise<IPokemon[]> {
    const favoritos = (await this._storage?.get('favoritos')) || [];
    return favoritos.sort((a: IPokemon, b: IPokemon) => a.id - b.id);
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
