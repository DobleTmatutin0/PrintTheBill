import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { DataPackage } from "./data-package";
import { Bordero } from "./bordero";

@Injectable({
  providedIn: "root",
})
export class BorderoService {
  private borderosUrl = "rest/borderos"; // URL to web api

  constructor(private http: HttpClient) {}

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.borderosUrl}/${id}`);
  }

  save(bordero: Bordero): Observable<DataPackage> {
    return this.http[bordero.id ? "put" : "post"]<DataPackage>(
      this.borderosUrl,
      bordero
    );
  }

  byPage(page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.borderosUrl}?page=${page}&cant=${cant}`
    );
  }

  remove(id: number): Observable<DataPackage> {
    return this.http["delete"]<DataPackage>(`${this.borderosUrl}/${id}`);
  }
}
