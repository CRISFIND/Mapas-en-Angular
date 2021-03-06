import { Component, OnInit } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
// import { environment } from 'src/environments/environment';

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #mapa{
      height:100%;
      width:100%;
    }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -77.0039434164088 , -12.006390293825229],
      zoom:17
    });


  }

}
