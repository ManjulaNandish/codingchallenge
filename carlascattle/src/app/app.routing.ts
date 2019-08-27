import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CattleMapviewComponent } from './cattle-mapview/cattle-mapview.component';
import { CattleListing } from './cattle-listing/cattle-listing';

const appRoutes: Routes = [
    { path: '', redirectTo: '/cattles-mapview', pathMatch: 'full' },
    { path: 'cattles-mapview', component: CattleMapviewComponent},
    { path: 'cattle-list', component: CattleMapviewComponent },
    { path: '**', redirectTo: '' },
];

export const appRoutingProviders: any[] = [];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled',
});