import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";

import { Play } from "./play";

@Injectable({
  providedIn: "root",
})
export class PlayService {
  private playsUrl = "rest/plays"; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.playsUrl); // REST
  }

  get(id: number): Observable<DataPackage> {    
    return this.http.get<DataPackage>(`${this.playsUrl}/id/${id}`);
  }

  save(play: Play): Observable<DataPackage> {
    return this.http[play.id ? 'put' : 'post']<DataPackage>(this.playsUrl, play); // REST
  }

  delete(aPlay: Play): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.playsUrl}/${aPlay.code}`);
  }

  byPage(page: number, size: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.playsUrl}/page?page=${page}&size=${size}`); // REST
  }

}
