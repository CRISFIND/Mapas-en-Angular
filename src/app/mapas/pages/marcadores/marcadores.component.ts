import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Color{
  color:string;
  market? : mapboxgl.Marker;
  centro? : [number,number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  
  .mapa-container{
      height:100%;
      width:100%;
    }
    .list-group{
      position:fixed;
      top:20px;
      right:20px;
      z-index:99;
    }
    li{
      cursor:pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa! :ElementRef;
  mapa!: mapboxgl.Map;  // tipado
  zoomLevel : number = 15;  //predeterminado
  center: [number,number] = [-77.0039434164088, -12.006390293825229];

  marcadores : Color[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container:this.divMapa.nativeElement,
      style:'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel  
    });

    // const marketHtml: HTMLElement = document.createElement('div');
      
      // new mapboxgl.Marker()
      // .setLngLat(this.center)
      // .addTo(this.mapa);   
    this.leerlocalStorage();
    }

  marcando(marker : mapboxgl.Marker){
    this.mapa.flyTo({
      center:marker.getLngLat()
    })
  }
  agregar(){

   const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
  // const color = #${crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, '0').slice(-6)}
    
    const nuevo = new mapboxgl.Marker({
      draggable:true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);
      
      this.marcadores.push({
        color,
        market : nuevo
      });

    this.guardarLocalStorage();

    nuevo.on('dragend', () => {
      this.guardarLocalStorage();
    });

  }



  guardarLocalStorage(){

    const lngLaArr : Color[] = [];

    this.marcadores.forEach(m => {  //obtengo toda la informacion
        const color = m.color;
        const {lng,lat} = m.market!.getLngLat();

        lngLaArr.push({
          color: color,
          centro:[lng,lat]
        })
    });

    localStorage.setItem('marcadores',JSON.stringify(lngLaArr));
  }

  leerlocalStorage(){
    if(!localStorage.getItem('marcadores')){
      return;
    }
    const lngLatArr : Color[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m =>{
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable:true,
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa)  
      
      
      this.marcadores.push({
        market:newMarker,
        color:m.color
      });

      newMarker.on('dragend', () => {
        this.guardarLocalStorage();
      });

    });
  }


  borrar(i : number){
    this.marcadores[i].market?.remove();
    this.marcadores.splice(i,1);
    this.guardarLocalStorage();
  }
}
