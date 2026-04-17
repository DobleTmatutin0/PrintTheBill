import { ChangeDetectorRef, Component } from '@angular/core';
import { ResultsPage } from '../../models/results-page';
import { CustomerService } from '../../services/customer.service';
import { ModalService } from '../shared-components/modal.component/modal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../shared-components/pagination.component/pagination.component';

@Component({
    selector: 'app-customer.component',
    imports: [
        CommonModule,
        RouterModule,
        PaginationComponent
    ],
    templateUrl: 'customers.component.html',
    styles: ``,
})
export class CustomersComponent {

    resultsPage: ResultsPage = <ResultsPage> {};
    currentPage: number = 1;
    currentPageSize: number = 1;

    constructor(
        private customerService: CustomerService,
        private modalService: ModalService,
        private cdr: ChangeDetectorRef
    ) {

    }

    getCustomers(): void {
        this.customerService
        .byPage(this.currentPage, this.currentPageSize)
        .subscribe(dataPackage => {
            this.resultsPage = <ResultsPage> dataPackage.data;
            this.cdr.detectChanges();
        });
    }

    remove(id: number): void {
        let that = this;
        this.modalService.confirm(
            "Eliminar Customer",
            "Esta seguro de que desea elimar el customer?",
            "Si lo elimina despues no podra utilizarlo"
        )
        .then(
            function() {
                that.customerService.remove(id).subscribe(dataPackage => {
                    that.getCustomers();
                });
            }
        );   
    }

    onPageChangeRequested(page: number): void {
        this.currentPage = page;
        this.getCustomers();
    }

    ngOnInit() {
        this.getCustomers();
    }
}