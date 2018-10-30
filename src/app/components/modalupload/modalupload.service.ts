import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModaluploadService {

  public type: string;
  public id: string;
  public hide: string = 'hideModal';

  public notification = new EventEmitter<any>();

  constructor() {
  }

  hideModal() {
    this.hide = 'hideModal';
    this.id = null;
    this.type = null;
  }

  showModal(type: string, id: string) {
    this.hide = '';
    this.id = id;
    this.type = type;
  }
}
