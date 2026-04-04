import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { PlaysComponent } from './plays.component/plays.component';
import { PlaysDetailComponent } from './plays.component/plays-detail.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'plays', component: PlaysComponent },
    { path: 'plays/:code', component: PlaysDetailComponent }
];
