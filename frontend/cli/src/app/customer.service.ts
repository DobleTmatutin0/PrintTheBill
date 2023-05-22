import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataPackage } from "./data-package";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private customersUrl = "rest/customers"; // URL to web api

  constructor(private http: HttpClient) {}

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.customersUrl}?search=${text}`);
  }
}
