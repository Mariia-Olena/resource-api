import { CommonModule } from '@angular/common';
import { Component, effect, inject, resource, signal } from '@angular/core';
import { Color } from './models/color.model';
import { SearchService } from './services/search.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly service = inject(SearchService);
  readonly keyword = signal('');
  // readonly results = resource({
  //   request: () => this.keyword(),
  //   loader: (obj) => this.service.search(obj.request, obj.abortSignal),
  // });
  readonly results = rxResource({
    request: () => this.keyword(),
    loader: (obj) => this.service.rxSearch(obj.request),
  });

  constructor() {
    effect(() => {
      console.log('resource status', this.results.status());
    });
  }

  resetResource() {
    this.results.set([]);
  }
}
