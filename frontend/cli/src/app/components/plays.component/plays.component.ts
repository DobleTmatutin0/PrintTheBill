import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayService } from '../../services/play.service';
import { ModalService } from '../shared-components/modal.component/modal.service';
import { ResultsPage } from '../../models/results-page';
import { PaginationComponent } from '../shared-components/pagination.component/pagination.component';

@Component({
    selector: 'app-plays.component',
    imports: [
        CommonModule,
        RouterModule,
        PaginationComponent
    ],
    templateUrl: 'plays.component.html',
    styles: ``,
})
export class PlaysComponent {
    resultsPage: ResultsPage = <ResultsPage> {};
    pages!: number[];
    currentPage: number = 1;
    currentPageSize: number = 1;
    
    constructor(
        private playService: PlayService,
        private cdr: ChangeDetectorRef,
        private modalService: ModalService
    ) {}

    getPlays(): void {
        this.playService.byPage(this.currentPage, this.currentPageSize).subscribe(dataPackage => {
            this.resultsPage = <ResultsPage> dataPackage.data;
            this.cdr.detectChanges();
        });
    }

    onPageChangeRequested(page: number): void {
        this.currentPage = page;
        this.getPlays();
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
