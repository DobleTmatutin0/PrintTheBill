import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPackage } from '../dataPackage';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

    private customersUrl = "/rest/customers"
    constructor(private httpClient: HttpClient) {

    }
    
    all(): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(this.customersUrl);
    }

    get(id: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.customersUrl}/id/${id}`);
    }

    save(customer: Customer): Observable<DataPackage> {
        return customer.id
            ? this.httpClient.put<DataPackage>(this.customersUrl, customer)
            : this.httpClient.post<DataPackage>(this.customersUrl, customer);
    }

    remove(id: number): Observable<DataPackage> {
        return this.httpClient.delete<DataPackage>(`${this.customersUrl}/delete/${id}`);
    }

    byPage(page: number, size: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.customersUrl}/page?page=${page - 1}&size=${size}`);
    }

    search(term: string): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.customersUrl}/search/${term}`);
    }
}
