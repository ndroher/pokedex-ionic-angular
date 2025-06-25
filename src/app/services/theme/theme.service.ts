import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private paletteToggle = new BehaviorSubject<boolean>(false);
  public paletteToggle$ = this.paletteToggle.asObservable();

  constructor() {
    this.init();
  }

  init() {
    const storedPreference = localStorage.getItem('theme');
    if (storedPreference) {
      this.setPalette(storedPreference === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.setPalette(prefersDark.matches);
      prefersDark.addEventListener('change', (mediaQuery) => {
        this.setPalette(mediaQuery.matches);
      });
    }
  }

  setPalette(isDark: boolean) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.paletteToggle.next(isDark);
    this.toggleDarkPalette(isDark);
  }

  togglePalette() {
    this.setPalette(!this.paletteToggle.value);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}
