import {Component, OnInit, ViewChild, Injectable, ElementRef} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CattleData } from './model/cattle.data';
import * as _ from 'lodash';
import {NguiMap, NguiMapComponent} from '@ngui/map';
import { CattleDataSettingsService } from './service/cattle-data.settings.service';
import {Router} from "@angular/router";

declare const google: any;
declare const InfoBox: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    navtoggle: string ='home';
    constructor(private router: Router){

    }
    OnNavBarClicked(event) {
        if(event.state === 'home'){
          this.navtoggle = 'home';
          this.router.navigate(['/cattles-mapview']);
        } else if(event.state  === 'listing') {
          this.navtoggle = 'listing';
          this.router.navigate(['/cattle-list']);

        }
    }
}
