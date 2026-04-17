import { ChangeDetectorRef, Component } from '@angular/core';
import { Bordero } from '../../models/bordero';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { BorderoService } from '../../services/bordero.service';
import { CustomerService } from '../../services/customer.service';
import { PlayService } from '../../services/play.service';
import { CommonModule, Location } from '@angular/common';
import { ModalService } from '../shared-components/modal.component/modal.service';
import { Customer } from '../../models/customer';
import { Performance } from '../../models/performance';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap, tap } from 'rxjs';
import { Play } from '../../models/play';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bordero-detail.component',
    imports: [
        CommonModule,
        FormsModule,
        NgbTypeaheadModule,
        NgbDatepickerModule
    ],
    templateUrl: 'bordero-detail.component.html',
    styles: ``,
})
export class BorderoDetailComponent {

    bordero!: Bordero;
    borderoDate!: NgbDateStruct;
    searching: boolean = false;
    searchFailed: boolean = false;

    constructor(
        private borderoService: BorderoService,
        private customerService: CustomerService,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private playService: PlayService,
        private location: Location,
        private calendar: NgbCalendar,
        private modalService: ModalService
    ) {

    }

    get() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id === 'new') {
            this.bordero = <Bordero> {
                customer: <Customer> {},
                performances: <Performance[]> []
            }
            this.borderoDate = this.calendar.getToday();
        } 
        else {
            this.borderoService.get(parseInt(id!)).subscribe(dataPackage => {
                this.bordero = <Bordero> dataPackage.data;

                //Regenero la fecha
                const borderoDateAux = new Date(this.bordero.date);
                this.borderoDate = {
                    year: borderoDateAux.getFullYear(),
                    month: borderoDateAux.getMonth() + 1,
                    day: borderoDateAux.getDate()
                };

                this.cdr.detectChanges();
            });

        }
    }

    goBack() {
        this.location.back();
    }

    save() {
        this.bordero.date = new Date(
            this.borderoDate.year,
            this.borderoDate.month - 1, // porq date cuenta los meses de 0 a 11 y el ngb de 1 a 12 tonces se le resta 1
            this.borderoDate.day
        );

        this.borderoService.save(this.bordero).subscribe(dataPackage => {
            this.router.navigateByUrl("/", {
                skipLocationChange: true
            }).then(() => this.router.navigate(["/borderos/" + (<Bordero> dataPackage.data).id]));
        });
    }

    addPerformance() {
        this.bordero.performances.push(
            {
                id: 0,
                play: <Play> {},
                audience: 0
            }
        );
    }

    removePerformance(performance: Performance) {
        this.modalService.confirm(
            "Eliminar Performance",
            "Esta seguro de borrar esta performance?",
            "El cambio no se confirmara hasta que no guarde el bordero."
        )
        .then(() => {
            let performances = this.bordero.performances;
            performances.splice(performances.indexOf(performance, 1));
        });
    }

    searchCustomer = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
        debounceTime(600),
        distinctUntilChanged(),
        tap(() => (this.searching = true)),
        switchMap((term) => 
            this.customerService
                .search(term)
                .pipe(
                    map((response) => {
                        let plays = <Customer[]> response.data;
                        return plays;
                    })
                )
                .pipe(
                    tap(() => (this.searchFailed = false)),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    })
                )
            ),
        tap(() => (this.searching = false))
    )
    
    searchPlay = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
        debounceTime(600),
        distinctUntilChanged(),
        tap(() => (this.searching = true)),
        switchMap((term) => 
            this.playService
                .search(term)
                .pipe(
                    map((response) => {
                        let plays = <Play[]> response.data;
                        return plays;
                    })
                )
                .pipe(
                    tap(() => (this.searchFailed = false)),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    })
                )
            ),
        tap(() => (this.searching = false))
    )
    
    resultFormat(value: any) {
        return value.name;
    }

    inputFormat(value: any) {
        return value ? value.name : null;
    }

    ngOnInit() {
        this.get();
    }
}