import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  tittle: string;

  constructor(private _router: Router, private _title: Title, private _meta: Meta) {

    this.getDataRoute().subscribe( event => {
      this.tittle = event.tittle;
      this._title.setTitle(this.tittle);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.tittle
      };
      _meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this._router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data )
    );
  }

}
