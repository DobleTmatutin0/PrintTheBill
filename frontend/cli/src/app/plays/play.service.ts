import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data-package";

import { PLAYS } from "./mock-plays";
import { Play } from "./play";

@Injectable({
  providedIn: "root",
})
export class PlayService {
  private playsUrl = 'rest/plays';  // URL to web api

  constructor(
    private http: HttpClient
  ) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.playsUrl); // REST
  }


  get(id: number): Observable<Play> {
    return of({ ...PLAYS.find((play) => play.id === id)! });
  }

  save(play: Play): Observable<Play> {
    if(play.id){
      // buscamos play que corresponde
      let formerPlay = PLAYS.find((formerPlay) => formerPlay.id === play.id)!;
      // modificamos sus valores
      Object.assign(formerPlay, play);
      // devolvemos observable
      return of(formerPlay);
    } else {
      play.id = PLAYS.length + 1;
      PLAYS.push(play);
      return of(play);
    }
  }
}
