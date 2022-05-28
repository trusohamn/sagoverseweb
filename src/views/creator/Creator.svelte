<script>
  import L from "leaflet";
  let map;

  const markerLocations = [
    [29.8283, -96.5795],
    [37.8283, -90.5795],
    [43.8283, -102.5795],
  ];

  const initialView = [39.8283, -98.5795];
  function createMap(container) {
    let m = L.map(container, { preferCanvas: true }).setView(initialView, 5);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: `&copyimport { loop_guard } from "svelte/internal";
import { loop_guard } from "svelte/internal";
;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: "abcd",
        maxZoom: 14,
      }
    ).addTo(m);

    return m;
  }

  function markerIcon(text) {
    let html = `<div class="map-marker"><div class="marker-text">${text}</div></div>`;
    return L.divIcon({
      html,
      className: "map-marker",
    });
  }

  function createMarker(loc) {
    let icon = markerIcon(0);
    let marker = L.marker(loc, { icon, draggable: true });

    return marker;
  }

  function createLines() {
    return L.polyline(markerLocations, { color: "#E4E", opacity: 0.5 });
  }

  let markerLayers, lineLayers;
  function mapAction(container) {
    map = createMap(container);

    markerLayers = L.layerGroup();
    for (let location of markerLocations) {
      let m = createMarker(location);
      markerLayers.addLayer(m);
    }

    lineLayers = createLines();
    lineLayers.addTo(map);
    markerLayers.addTo(map);

    return {
      destroy: () => {
        map.remove();
        map = null;
      },
    };
  }

  function resizeMap() {
    if (map) {
      map.invalidateSize();
    }
  }

  $: if (lineLayers && map) {
    console.log("will add line");

    lineLayers.addTo(map);
  }
</script>

<svelte:window on:resize={resizeMap} />

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
<div class="map" style="height:100%;width:100%" use:mapAction />

<style>
  .map :global(.marker-text) {
    width: 100%;
    text-align: center;
    font-weight: 600;
    background-color: #444;
    color: #eee;
    border-radius: 0.5rem;
  }

  .map :global(.map-marker) {
    width: 30px;
    transform: translateX(-50%) translateY(-25%);
  }
</style>
