import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPokemon } from '../pokeapi/pokeapi.mode';
import { formatarNome } from 'src/app/utils/formatarNome.utils';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private favoritosIdsSubject = new BehaviorSubject<number[]>([]);
  public favoritosIds$ = this.favoritosIdsSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.init();
  }

  async init() {
    const favoritos = await this.getFavoritos();
    const ids = favoritos.map((p) => p.id);
    this.favoritosIdsSubject.next(ids);
  }

  async getFavoritos(): Promise<IPokemon[]> {
    const favoritos = (await this.storageService.get('favoritos')) || [];
    return favoritos.sort((a: IPokemon, b: IPokemon) => a.id - b.id);
  }

  async toggleFavorito(pokemon: IPokemon): Promise<boolean> {
    const favoritos = await this.getFavoritos();
    const isFavorito = favoritos.some((p) => p.id === pokemon.id);

    let novosFavoritos: IPokemon[];

    if (isFavorito) {
      novosFavoritos = favoritos.filter((p) => p.id !== pokemon.id);
    } else {
      pokemon.name = formatarNome(pokemon.name);
      novosFavoritos = [...favoritos, pokemon];
    }

    await this.storageService.set('favoritos', novosFavoritos);

    const novosIds = novosFavoritos.map((p) => p.id);
    this.favoritosIdsSubject.next(novosIds);

    return !isFavorito;
  }

  async isFavorito(id: number): Promise<boolean> {
    const favoritos = await this.getFavoritos();
    return favoritos.some((p) => p.id === id);
  }
}
