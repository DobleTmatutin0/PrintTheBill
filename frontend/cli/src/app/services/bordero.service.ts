import { Injectable } from '@angular/core';
import { Bordero } from '../models/bordero';
import { Observable } from 'rxjs';
import { DataPackage } from '../dataPackage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BorderoService {
    
    private borderosUrl = "/rest/borderos";

    constructor(private httpClient: HttpClient) {

    }

    all(): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(this.borderosUrl);
    }
    
    get(id: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.borderosUrl}/id/${id}`);
    }

    byPage(page: number, size: number): Observable<DataPackage> {
        return this.httpClient.get<DataPackage>(`${this.borderosUrl}/page?page=${page - 1}&size=${size}`);
    }

    save(aBordero: Bordero): Observable<DataPackage> {
        return aBordero.id
            ? this.httpClient.put<DataPackage>(`${this.borderosUrl}/${aBordero.id}`, aBordero)
            : this.httpClient.post<DataPackage>(this.borderosUrl, aBordero);
    }

    remove(id: number): Observable<DataPackage> {
        return this.httpClient.delete<DataPackage>(`${this.borderosUrl}/${id}`);
    }
    
}
