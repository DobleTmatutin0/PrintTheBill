import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayService } from '../services/play.service';
import { Play } from '../models/play';

@Component({
    selector: 'app-plays.component',
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: 'plays.component.html',
    styles: ``,
})
export class PlaysComponent {
    plays: Play[] = [];
    
    constructor(
        private playService: PlayService,
        private cdr: ChangeDetectorRef
    ) {}

    getPlays(): void {
        this.playService.all().subscribe(dataPackage => {
            this.plays = <Play[]> dataPackage.data;
            this.cdr.detectChanges();
        });
    }

    ngOnInit() {
        this.getPlays();
    }
}
