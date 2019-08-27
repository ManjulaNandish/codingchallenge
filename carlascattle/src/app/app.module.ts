import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NguiMapModule} from '@ngui/map';
import { HttpClientModule } from '@angular/common/http';
import { CattleDataSettingsService } from './service/cattle-data.settings.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavBar } from './navbar/nav-bar';
import { NavFooter } from './navfooter/nav-footer';
import { CattleListing } from './cattle-listing/cattle-listing';
import { CattleMapviewComponent } from './cattle-mapview/cattle-mapview.component';
import {RouterModule} from "@angular/router";
import { appRouting, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NavBar,
    NavFooter,
    CattleListing,
    CattleMapviewComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    appRouting,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAzY5AegOVAdxw1zuTpZQKpI-XS6KJSK3A&components=country:AU&libraries=places'})
  ],
  providers: [appRoutingProviders,
      CattleDataSettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
