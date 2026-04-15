import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPackage } from '../dataPackage';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

    private customersUrl = "/rest/customers"
    constructor(private httpClient: HttpClient) {

    }

    search(term: string): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.customersUrl}/search/${term}`);
    }
}
