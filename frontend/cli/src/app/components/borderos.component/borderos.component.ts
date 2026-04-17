import { Component } from '@angular/core';
import { BorderoService } from '../../services/bordero.service';

@Component({
  selector: 'app-bordero.component',
  imports: [],
  template: ` <p>bordero.component works!</p> `,
  styles: ``,
})
export class BorderosComponent {

    
    constructor(
        private borderoService: BorderoService
    ) {

    }

    

}