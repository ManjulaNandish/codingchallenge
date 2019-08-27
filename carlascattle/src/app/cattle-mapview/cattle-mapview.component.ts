import { Component, OnInit, ViewChild, Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { NguiMap, NguiMapComponent} from '@ngui/map';

import { isNullOrUndefined} from "util";

import { CattleDataSettingsService } from '../service/cattle-data.settings.service';
import { cattleClusterIconStyles } from './../cluster/cluster-style';
import { CattleData } from './../model/cattle.data';

declare var google: any;
declare const InfoBox: any;
declare const MarkerClusterer: any;

@Component({
    selector: 'cattle-mapview',
    templateUrl: './cattle-mapview.component.html',
    styleUrls: ['./cattle-mapview.component.scss'],
    providers: [CattleDataSettingsService]
})
export class CattleMapviewComponent implements OnInit {
    @ViewChild("iw", { static: false }) iw;
    @ViewChild(NguiMapComponent, { static: false }) nguiMapComponent: NguiMapComponent;

    positions = [];
    imgpath: string = './assets/images/';
    statusMessage: string = '';
    map: any;
    navtoggle: string ='home';

    errorStatus = false;
    errorMessage = '';

    paths = [[
        { lat: -27.75980769, lng: 152.4 },
        { lat: -27.78980769, lng: 152.33 },
        { lat: -27.82980769, lng: 152.31 },
        { lat: -27.84980769, lng: 152.32 },
        { lat: -27.84780769, lng: 152.43 }
    ]
    ];
    pos = { lat: 1, lng: 2 };
    constructor(private cattleDataSettingsService: CattleDataSettingsService) {

    }

    ngOnInit() {
        this.getCustomMarkers();
    }

    getCustomMarkers() {
        this.cattleDataSettingsService.getJSON().subscribe(data => {
                this.positions = this.getCustomMarkersPosition(data);
            },
            err => {
                console.log("http error", err);
                this.errorStatus = true;
                this.errorMessage = err.message;
            }
        );
    }

    showLegend(map) {
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].clear();
        const legend = document.createElement('div');
        const controlUi = document.createElement('div');
        controlUi.className = 'status-legends';
        controlUi.title = 'Colour codes for the lot statuses.';
        legend.appendChild(controlUi);

        const contentDiv = document.createElement('div');
        let content;
        content = `<div class="legend-panel"><div><img class="custom-icon" src='./assets/images/cattle-safe.png' />
          <span> Cattles well trained with CAEP</span></div>
          <div><img class="custom-icon" src='./assets/images/cattles-new-image.jpeg' />
          <span> Cattles new to CAEP Program</span></div>
          <div><img class="custom-icon" src='./assets/images/cattles-warning.png' />
          <span> Cattles close to virtual fencing</span></div>
          <div><img class="custom-icon" src='./assets/images/cattles-danger.jpeg' />
          <span> Cattles outside virtual fencing</span></div>
          <div><span>The polygon on the map is indicating the virtual fencing.</span></div></div>`;
        contentDiv.innerHTML = content;
        controlUi.appendChild(contentDiv);
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
    }

    showCattlesCustomMarkers(map) {
        const markers = this.positions.map(function(position, i) {
            const icon = {
                url: position.icon, // url
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            };
            return new google.maps.Marker({
                position: new google.maps.LatLng(position.lat, position.lng),
                icon: icon,
            });
        });
        const mapOptions = {
            gridSize: 200,
            maxZoom: 18,
            averageCenter: true,
            styles: cattleClusterIconStyles,
        }
        const markerCluster = new MarkerClusterer(map, markers, mapOptions);
    }

    getCustomMarkersPosition(data: any) {
        let markerPositions = [];
        let lat: number, lng: number, icon: string, status: number = 0;
        let newObj;

        _.forEach(data, data => {

            lat = data.lat;
            lng = data.lng;
            status = data.status;
            if (data.status === 0)
                icon = this.imgpath + 'cattle-safe.png';
            else if (data.status === 1)
                icon = this.imgpath + 'cattles-new-image.jpeg';
            else if (data.status === 2)
                icon = this.imgpath + 'cattles-warning.png';
            else if (data.status === 3)
                icon = this.imgpath + 'cattles-danger.jpeg';
            newObj = {
                lat: lat,
                lng: lng,
                icon: icon,
                status: status,
                desc: data.description,
                id: data.id
            }
            markerPositions.push(newObj);
        });
        return markerPositions;
    }


    onHover(event, data) {
        this.statusMessage = "Cattle id : " + "<b>" + data.id + "</b><br>" + " Comment: " + data.desc + "<br>"+ "Status: " + "<img height='20px' src='" +data.icon+"' class='custom-icon'/>" ;
        this.nguiMapComponent.openInfoWindow('iw',
            data.customMarker
        );

    }

    private getAllValues(object: object) {
        let values = []
        for (let key of Object.keys(object)) {
            if (typeof object[key] !== 'object') values.push(object[key]);
            else values = [...values, ...this.getAllValues(object[key])]
        }
        return values;
    }

    private updateFilter(event) {
        if (this.positions.length < 1)  this.getCustomMarkers();
        let temp;
        temp = [...this.positions];
        temp = temp.map(({ customMarker, ...item }) => item);
        const val = event ? event.target.value.toLowerCase() : "";
        let _th = this;
        this.positions = temp.filter(function(d) {
            return (
                JSON.stringify(_th.getAllValues(d))
                    .toLowerCase()
                    .indexOf(val) !== -1 || !val
            );
        });
    }

    createZoomPanel(map) {
        if (isNullOrUndefined(map)) {
            return;
        }
        map.zoomControl = false;
        const controlDiv = document.createElement('div');
        controlDiv.setAttribute('class', 'gm-zoom-button');
        const controlWrapper = document.createElement('div');
        controlWrapper.setAttribute('class', 'zoom-in-out-button');
        controlDiv.appendChild(controlWrapper);

        const zoomInButton = document.createElement('div');
        zoomInButton.setAttribute('class', 'zoom-in-button');
        zoomInButton.innerHTML = '<img src="./assets/images/zoomIn.png" height="20px" width="20px"/>';
        controlWrapper.appendChild(zoomInButton);

        const zoomOutButton = document.createElement('div');
        zoomOutButton.setAttribute('class', 'zoom-out-button');
        zoomOutButton.innerHTML = '<img src="./assets/images/zoomOut.png" height="20px" width="20px"/>';
        controlWrapper.appendChild(zoomOutButton);

        zoomInButton.addEventListener('click', () => {
            map.setZoom(map.getZoom() + 1);
        });
        zoomOutButton.addEventListener('click', () => {
            map.setZoom(map.getZoom() - 1);
        });
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
        return controlDiv;
    }
}
