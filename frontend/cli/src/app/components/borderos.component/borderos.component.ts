import { ChangeDetectorRef, Component } from '@angular/core';
import { BorderoService } from '../../services/bordero.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../shared-components/pagination.component/pagination.component';
import { ModalService } from '../shared-components/modal.component/modal.service';
import { ResultsPage } from '../../models/results-page';

@Component({
  selector: 'app-bordero.component',
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent
  ],
  templateUrl: 'borderos.component.html',
  styles: ``,
})
export class BorderosComponent {

    resultsPage: ResultsPage = <ResultsPage> {};
    currentPage: number = 1;
    currentPageSize: number = 5;
    
    constructor(
        private borderoService: BorderoService,
        private cdr: ChangeDetectorRef,
        private modalService: ModalService
    ) {

    }

    getBorderos(): void {
        this.borderoService
        .byPage(this.currentPage, this.currentPageSize)
        .subscribe(dataPackage => {
            this.resultsPage = <ResultsPage> dataPackage.data;
            this.cdr.detectChanges();
        });
    }

    remove(id: number): void {
        let that = this;
        this.modalService.confirm(
            "Eliminar Bordero",
            "Esta seguro de que desea eliminar el bordero?",
            "si elimina el bordero despues no podra utilizarlo"
        )
        .then(
            function() {
                that.borderoService.remove(id).subscribe(dataPackage => {
                    that.getBorderos();
                });
            }
        );
    }

    onPageChangeRequested(page: number): void {
        this.currentPage = page;
        this.getBorderos();
    }

    ngOnInit() {
        this.getBorderos();
    }
}