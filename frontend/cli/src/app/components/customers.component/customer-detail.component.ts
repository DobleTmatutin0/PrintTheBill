import { ChangeDetectorRef, Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-detail.component',
  imports: [],
  template: 'customer-detail.component.html',
  styles: ``,
})
export class CustomerDetailComponent {

    customer!: Customer;
    
    constructor(
        private customerService: CustomerService,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private location: Location
    ) {

    }

    get(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id === 'new') {
            this.customer = <Customer> {
                name: ''
            }
        }
        else {
            this.customerService.get(parseInt(id!)).subscribe(dataPackage => {
                this.customer = <Customer> dataPackage.data;
                this.cdr.detectChanges();
            });
        }
    }

    save(): void {
        this.customerService.save(this.customer).subscribe(dataPackage => {
            this.customer = <Customer> dataPackage.data;
            this.goBack();
        });
    }

    goBack(): void {
        this.location.back();
    }

    ngOnInit() {
        this.get();
    }

}