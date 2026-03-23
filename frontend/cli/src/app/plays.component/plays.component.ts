import { Component } from '@angular/core';
import { MOCK_PLAYS } from './mock-plays';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-plays.component',
    imports: [
        CommonModule,
        RouterModule
    ],
    template: `
        <h2>Plays</h2>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Codigo</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr *ngFor= "let play of plays; index as i">
                        <td>{{ i + 1}}</td>
                        <td>{{ play.name }}</td>
                        <td>{{ play.type }}</td>
                        <td>{{ play.code }}</td>
                        <td>
                            <a routerLink="/plays/{{play.id}}">
                                <i class="fa-solid fa-pencil"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    styles: ``,
})
export class PlaysComponent {
    plays = MOCK_PLAYS;


}
