import { CommonModule, Location, UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Play } from '../models/play';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from '../services/play.service';
import { PlayType } from '../models/playType';
import { PlayTypeService } from '../services/play-type.service';

@Component({
    selector: 'app-plays-detail.component',
    imports: [
        CommonModule,
        UpperCasePipe,
        FormsModule
    ],
    templateUrl: 'plays-detail.component.html',
    styles: ``,
})
export class PlaysDetailComponent {
    play!: Play;
    playTypes: PlayType[] = [];

    constructor(
        private route: ActivatedRoute,
        private playService: PlayService,
        private playTypeService: PlayTypeService,
        private location: Location,
        private cdr: ChangeDetectorRef
    ) {}

    get(): void {
        const code = this.route.snapshot.paramMap.get('code')!;
        this.playService.get(code).subscribe(dataPackage => {
            this.play = <Play> dataPackage.data;
            this.cdr.detectChanges();
        });
    }

    getPlayTypes(): void {
        this.playTypeService.all().subscribe(dataPackage => {
            this.playTypes = <PlayType[]> dataPackage.data;
            this.cdr.detectChanges();
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.playService.save(this.play).subscribe(dataPackage => {
            this.play = <Play> dataPackage.data;
            this.goBack();
        });
    }

    ngOnInit() {
        this.get();
    }
 
}
