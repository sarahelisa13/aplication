import mapboxgl from 'mapbox-gl'
import {
  DATA_URL
} from './config/data'

import {
  ACCESS_TOKEN
} from './config/mapbox'

import './style.css'

mapboxgl.accessToken = ACCESS_TOKEN

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-56.171418829102365, -16.518907870104794], // starting position
  zoom: 5, // starting zoom
  maxZoom: 12,
  locale: 'pt-br'
})

map.on('load', async () => {
  // Add a data source containing GeoJSON data.
  map.addSource('area', {
    type: 'geojson',
    buffer: 0,
    data: 'https://raw.githubusercontent.com/sidneyroberto/dados-desmatamento/main/coordinates_deforestation.geojson',
  })

  // Add a new layer to visualize the polygon.
  map.addLayer({
    id: 'area',
    type: 'fill',
    source: 'area', // reference the data source
    paint: {
      'fill-color': '#0080ff', // blue color fill
      'fill-opacity': 0.5,
    },
  })
  // Add a black outline around the polygon.
  map.addLayer({
    id: 'outline',
    type: 'line',
    source: 'area',
    paint: {
      'line-color': '#000',
      'line-width': 3,
    },
  })
})