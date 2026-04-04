import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayService } from './play.service';
import { Play } from '../models/play';

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
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr *ngFor= "let play of plays; index as i">
                        <td>{{ i + 1}}</td>
                        <td>{{ play.code }}</td>
                        <td>{{ play.name }}</td>
                        <td>{{ play.type.type }}</td>
                        <td>
                            <a routerLink="/plays/{{play.code}}">
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
    plays: Play[] = [];
    
    constructor(
        private playService: PlayService
    ) {}

    getPlays(): void {
        this.playService.all().subscribe(dataPackage => this.plays = <Play[]> dataPackage.data);
    }

    ngOnInit() {
        this.getPlays();
    }
}
