import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayService } from '../services/play.service';
import { Play } from '../models/play';
import { ModalService } from '../shared-components/modal.component/modal.service';

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
        private cdr: ChangeDetectorRef,
        private modalService: ModalService
    ) {}

    getPlays(): void {
        this.playService.all().subscribe(dataPackage => {
            this.plays = <Play[]> dataPackage.data;
            this.cdr.detectChanges();
        });
    }

    remove(id: number): void {
        let innerThis = this; // esto se hace para no perder la referncia en la funcion

        this.modalService.confirm("Eliminar obra",
            "Esta seguro de que desea eliminar la obra?",
            "Si elemina la obra no podra volver a ser utilizada"
        )
        .then(
            function() {
                innerThis.playService.remove(id).subscribe(dataPackage => {innerThis.getPlays();});
            }
        );
    }

    ngOnInit() {
        this.getPlays();
    }
}
