import { Component, OnInit, ViewChild, Injectable, Output, EventEmitter, Input } from '@angular/core';
import {CattleDataSettingsService} from "../service/cattle-data.settings.service";
import * as _ from "lodash";


@Component({
  selector: 'cattle-listing',
  templateUrl: './cattle-listing.html',
  styleUrls: ['./cattle-listing.scss'],
  providers: [CattleDataSettingsService]
 
})
export class CattleListing implements OnInit {
    public positions = [];
    imgpath: string = './assets/images/';
    statusMessage: string = "";
    map: any;
    navtoggle: string ="home";

    errorStatus = false;
    errorMessage = "";

    paths = [[
        { lat: -27.75980769, lng: 152.4 },
        { lat: -27.78980769, lng: 152.33 },
        { lat: -27.82980769, lng: 152.31 },
        { lat: -27.84980769, lng: 152.32 },
        { lat: -27.84780769, lng: 152.43 }
    ]
    ];
    pos = { lat: 1, lng: 2 };

  constructor(private appSettingsService: CattleDataSettingsService) {
  
  }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.appSettingsService.getJSON().subscribe(data => {
                this.positions = this.normalizeData(data);
            },
            err => {
                console.log("http error", err);
                this.errorStatus = true;
                this.errorMessage = err.message;

            }

        );
    }

    normalizeData(mapData: any) {



        let positions = [];
        let lat: number, lng: number, icon: string, status: number = 0;
        let newObj;

        _.forEach(mapData, mapdata => {

            lat = mapdata.lat;
            lng = mapdata.lng;
            status = mapdata.status;
            if (mapdata.status == 0)
                icon = this.imgpath + 'cattle-safe.png';
            else if (mapdata.status == 1)
                icon = this.imgpath + 'cattles-new-image.jpeg';
            else if (mapdata.status == 2)
                icon = this.imgpath + 'cattles-warning.png';
            else if (mapdata.status == 3)
                icon = this.imgpath + 'cattles-danger.jpeg';
            newObj = {
                lat: lat,
                lng: lng,
                icon: icon,
                status: status,
                desc: mapdata.description,
                id: mapdata.id
            }
            positions.push(newObj);

        });

        return positions;

    }

  setHome(navitem: string){
     // alert (navitem);

   
  }
 


}
