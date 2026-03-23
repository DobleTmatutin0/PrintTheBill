import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="d-flex flex-column flex-md-row align-item-center p-3">
        <h5 class="my-0 mr-md-auto font-weight-normal">Print the Bill</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <a class="p-2 text-dark" href="#">Plays</a>
        </nav>
    </div>
    <div class="container">
        <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('cli');
}
