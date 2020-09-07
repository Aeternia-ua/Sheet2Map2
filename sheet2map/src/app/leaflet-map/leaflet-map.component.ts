import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import { LeafletMarkerService } from '../_services/leaflet-marker.service';
import { Globals } from '../globals';
import {MarkerInfo} from '../info-sidebar/info-item';
import {InfoSidebarDirective} from '../_directives/info-sidebar.directive';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {SearchService} from "../_services/search.service";
import {MarkerInfoComponent} from "../marker-info/marker-info.component";
import {SharedService} from "../_services/shared.service";
import {Observable, of} from 'rxjs';
import {share} from "rxjs/operators";
import {MarkerService} from "../_services/marker.service";
import {Marker} from '../marker';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, AfterViewInit {
  private map;
  readonly markers: Observable<any[]> = this.markerService.getMarkers();
  private selectedResult: any;

  constructor(
              private leafletMarkerService: LeafletMarkerService,
              private sharedService: SharedService,
              private infoSidebarToggleService: InfoSidebarToggleService,
              private searchService: SearchService,
              private markerService: MarkerService) {
  }

  ngOnInit(): void {

    }

  ngAfterViewInit(): void {
    this.initMap();
    console.log(of(this.markerService.fetchMarkers()));
    this.markers.subscribe(markers => {
      this.leafletMarkerService.createMarkers(this.map, markers);
      // Marker search
      // Subscribe to search selection to zoom the map to the selected marker
      this.searchService.sharedSelectedResult.subscribe(selectedResult => {
        this.selectedResult = selectedResult;
        this.findMarker(this.selectedResult, this.map);
      });
    /// Marker search
    });
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: Globals.mapCenter,
      zoom: Globals.mapZoom
    });
    // This is the Carto Positron basemap
    const basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: Globals.mapMaxZoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    basemap.addTo(this.map);
    this.map.addEventListener('click', () => {
      this.infoSidebarToggleService.close();
    });
  }

  findMarker(marker, map): void {
    try {
      const selectedMarker: Marker = marker.value;
      const layers: any[] = [];
      const markers: any[] = [];
      map.eachLayer(layer => layers.push(layer));

      for (const layer of layers) {
        if (layer.getChildCount) {
          markers.push(layer.getAllChildMarkers());
        } else if (layer instanceof L.Marker) {
          markers.push(layer);
        }
      }

      const flattenedMarkers = [].concat(... markers);
      const foundMarker = flattenedMarkers.find(lmarker => lmarker.markerID === selectedMarker.MarkerID);
      console.log('layers ', layers);
      console.log('returned match is ', foundMarker);
      // Select markercluster which is layers[1]  to zoom to clustered marker
      layers[1].zoomToShowLayer(foundMarker);
      foundMarker.fire('click');
      //  this.leafletMarkerService.markerClusterGroup.zoomToShowLayer(markerFound); // Zoom to found marker

      // const markerFound: L.marker = markers.filter(lMarker => lMarker.markerID === selectedMarker.MarkerID);
      // console.log('match is ', markerFound);
      // const latLng = [feature.Geometry.coordinates[1], feature.Geometry.coordinates[0]];
      // const props = feature.value.properties;
      // feature.markerInfo = new MarkerInfo(MarkerInfoComponent, { ...props });
      // this.newMarkerInfo(feature.markerInfo);
      // return this.map.setView(latLng, 17); // Zoom to selected search result
    } catch (error) {
      console.log('coords undefined');
    }
  }
  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

//   _fireEventOnMarkerOrVisibleParentCluster(marker, eventName) {
//   if (eventName === 'mouseover') {
//     const visibleLayer = markers.getVisibleParent(marker);
//
//     if (visibleLayer instanceof L.MarkerCluster) {
//       // We want to show a marker that is currently hidden in a cluster.
//       // Make sure it will get highlighted once revealed.
//       markers.once('spiderfied', () => {
//         marker.fire(eventName);
//       });
//       // Now spiderfy its containing cluster to reveal it.
//       // This will automatically unspiderfy other clusters.
//       visibleLayer.spiderfy();
//     } else {
//       // The marker is already visible, unspiderfy other clusters if
//       // they do not contain the marker.
//       // _unspiderfyPreviousClusterIfNotParentOf(marker);
//       marker.fire(eventName);
//     }
//   } else {
//     // For mouseout, marker is necessarily unclustered already.
//     marker.fire(eventName);
//   }
// }
//
//   _unspiderfyPreviousClusterIfNotParentOf(marker) {
//     // Check if there is a currently spiderfied cluster.
//   // If so and it does not contain the marker, unspiderfy it.
//   const spiderfiedCluster = markers._spiderfied;
//
//   if (
//     spiderfiedCluster
//     && !_clusterContainsMarker(spiderfiedCluster, marker)
//   ) {
//     spiderfiedCluster.unspiderfy();
//   }
// }
//
//   _clusterContainsMarker(cluster, marker) {
//     let currentLayer = marker;
//
//     while (currentLayer && currentLayer !== cluster) {
//     currentLayer = currentLayer.__parent;
//   }
//
//   // Say if we found a cluster or nothing.
//     return !!currentLayer;
//   }
}



