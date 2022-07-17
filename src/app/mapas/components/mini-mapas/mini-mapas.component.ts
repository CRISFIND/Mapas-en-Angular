import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapas',
  templateUrl: './mini-mapas.component.html',
  styles: [`
    div{
      width:100px;
      height:150px;
      margin:0px;
    }
  `]
})
export class MiniMapasComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa! : ElementRef;
  @Input() lngLat : [number,number] = [0,0];
  constructor() { }

  ngAfterViewInit(): void {
    const mapa= new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style:'mapbox://styles/mapbox/streets-v11',
      center:this.lngLat,
      zoom:15,
      interactive:false
    });

    new mapboxgl.Marker()
        .setLngLat(this.lngLat)
        .addTo(mapa);
  }

}
