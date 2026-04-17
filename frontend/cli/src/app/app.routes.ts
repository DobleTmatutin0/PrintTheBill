import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { PlaysComponent } from './components/plays.component/plays.component';
import { PlaysDetailComponent } from './components/plays.component/plays-detail.component';
import { BorderoDetailComponent } from './components/bordero-detail.component/bordero-detail.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'plays', component: PlaysComponent },
    { path: 'plays/:code', component: PlaysDetailComponent },
    { path: 'borderos/:id', component: BorderoDetailComponent }
];
