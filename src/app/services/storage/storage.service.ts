import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private initPromise: Promise<void>;

  constructor(private storage: Storage) {
    this.initPromise = this.init();
  }

  async init(): Promise<void> {
    if (this._storage) return;
    this._storage = await this.storage.create();
  }

  public async set(key: string, value: any): Promise<void> {
    await this.initPromise;
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.initPromise;
    return this._storage?.get(key);
  }
}
