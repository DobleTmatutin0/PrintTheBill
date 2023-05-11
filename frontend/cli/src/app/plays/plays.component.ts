import { Component, OnInit } from "@angular/core";
import { PLAYS } from "./mock-plays";
import { Play } from "./play";
import { ResultsPage } from "../results-page";
import { PlayService } from "./play.service";

@Component({
  selector: "app-plays",
  template: `
    <h2>
      Plays&nbsp;
      <a routerLink="/plays/new" class="btn btn-success float-right"
        >Nueva obra</a
      >
    </h2>
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
            <td>{{ i + resultsPage.size*resultsPage.number + 1 }}</td>
            <td>{{ play.code }}</td>
            <td>{{ play.name }}</td>
            <td>{{ play.type }}</td>
            <td>
              <a routerLink="/plays/{{ play.id }}">
                <i class="fa fa-pencil"></i>
              </a>
              &nbsp;
              <i class="fa fa-remove" style="cursor: pointer" (click)="delete(play)"></i>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <nav aria-label="Page navigation example">
                <ul class="pagination pagination-centered">
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-2)">&laquo;</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-1)">&lsaquo;</a>
                  </li>
                  <li *ngFor="let t of pages;">
                    <a class="page-link" (click)="showPage(t)" [ngClass]="{'active': t === currentPage}"> {{t+1}} </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-3)">&rsaquo;</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-4)">&raquo;</a>
                  </li>
                </ul>
              </nav>        
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,
  styles: [],
})
export class PlaysComponent {
  plays: Play[] = <Play[]>[];
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage: number = 0;


  constructor(private playService: PlayService) {}

  ngOnInit() {
    this.getPlays();
  }

  getPlays(): void {
    this.playService.byPage(this.currentPage, 5).subscribe((dataPackage) => {
      this.resultsPage = <ResultsPage>dataPackage.data;
      this.plays = <Play[]>this.resultsPage.content;
      this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
    });

  }

  delete(aPlay: Play): void {
    if(confirm("¿Está seguro de que desea eliminar la obra?")){
      this.playService
      .delete(aPlay)
      .subscribe();
    }

    
  }

  showPage(pageId: number): void {
    let page = pageId;
    if (pageId == -2) { // First
      page = 0;
    }
    if (pageId == -1) { // Previous
      page = this.currentPage > 0 ? this.currentPage -1 : this.currentPage;
    }
    if (pageId == -3) { // Next
      page = !this.resultsPage.last ? this.currentPage + 1 : this.currentPage;
    }
    if (pageId == -4) { // Last
      page = this.resultsPage.totalPages-1;
    }
    if (pageId > 1 && this.pages.length >= pageId) { // Number
      page = this.pages[pageId - 1] + 1;
    }
    this.currentPage = page;
    this.getPlays();
  };

}
