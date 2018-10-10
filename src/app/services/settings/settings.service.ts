import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Isettings = {
    urlTheme: 'assets/css/colors/default.css',
    theme: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.getSettings();
  }

  private saveSettings() {
    // console.log('settings saved');
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  getSettings() {
    if ( localStorage.getItem('settings') ) {
        this.settings = JSON.parse(localStorage.getItem('settings'));
        this.setTheme(this.settings.theme);
        // console.log('getting settings');
    } else {
      this.setTheme(this.settings.theme);
      // console.log('getting default settings');
    }
  }

  setTheme (theme: string) {
    const url: string = `assets/css/colors/${theme}.css`;
    this._document.getElementById('cssTheme').setAttribute('href', url);

    this.settings.urlTheme = url;
    this.settings.theme = theme;
    this.saveSettings();
  }
}


interface Isettings {
  urlTheme: string;
  theme: string;
}
