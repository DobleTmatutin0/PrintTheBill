import { Component, OnInit } from '@angular/core';
import { PLAYS } from "./mock-plays";
import { Play } from './play';
import { PlayService } from './play.service';

@Component({
  selector: "app-plays",
  template: `
    <h2>Plays&nbsp;
      <a routerLink="/plays/new" class="btn btn-success float-right">Nueva obra</a></h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let play of plays; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ play.code }}</td>
            <td>{{ play.name }}</td>
            <td>{{ play.type }}</td>
            <td>
              <a routerLink="/plays/{{ play.id }}">
                <i class="fa fa-pencil"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class PlaysComponent {
  plays: Play[] = <Play[]>[];

  constructor(
    private playService: PlayService,
    ) { }

  ngOnInit() {
    this.getPlays();
  }

  getPlays(): void {
    this.playService.all()
      .subscribe(dataPackage => this.plays = <Play[]>dataPackage.data);
  }


}
