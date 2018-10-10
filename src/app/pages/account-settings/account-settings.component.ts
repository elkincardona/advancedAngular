import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public _settingsService: SettingsService ) { }

  ngOnInit() {
    this.setSavedCheckElement();
  }

  changeTheme( theme: string, elementCheck: any ) {
    this._settingsService.setTheme(theme);
    this.setCheckElement(elementCheck);
  }

  private setSavedCheckElement() {
    let selector: any = this._document.getElementsByClassName('selector');
    const Actualtheme: string = this._settingsService.settings.theme;
    for (let elm of selector) {
      if (Actualtheme === elm.getAttribute('data-theme')) {
        elm.classList.add('working');
        break;
      }
    }
  }

  setCheckElement( elementCheck: any ) {
    let selector: any = this._document.getElementsByClassName('selector');
    for (let elm of selector) {
        elm.classList.remove('working');
    }
    elementCheck.classList.add('working');
  }

}
