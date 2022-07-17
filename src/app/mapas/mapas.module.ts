import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MiniMapasComponent } from './components/mini-mapas/mini-mapas.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';


@NgModule({
  declarations: [
    MiniMapasComponent,
    FullScreenComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropiedadesComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
