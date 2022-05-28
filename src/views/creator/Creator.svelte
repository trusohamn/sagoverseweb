<script>
  import L from "leaflet";
  let map;
  let places = [
    { location: [29.8283, -96.5795], name: "first" },
    { location: [37.8283, -90.5795], name: "second" },
    { location: [43.8283, -102.5795], name: "third" },
  ];
  let count = 0;

  const initialView = [39.8283, -98.5795];
  function createMap(container) {
    let m = L.map(container, { preferCanvas: true }).setView(initialView, 5);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: `&copy<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
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

  function middleIcon() {
    let html = `<div class="map-middle-marker"></div>`;
    return L.divIcon({
      html,
      className: "map-middle-marker",
    });
  }

  function createMarker(place) {
    const icon = markerIcon(place.name);
    const marker = L.marker(place.location, {
      icon,
      draggable: true,
      name: place.name,
    });

    marker.bindPopup("<p>Can you see me?</p>");

    marker.on("drag", function (event) {
      const location = event.target.getLatLng();
      const { name } = event.target.options;

      places = places.map((place) => {
        if (name && place.name === name) {
          return { ...place, location };
        }
        return place;
      });

      cleanUp();
    });
    return marker;
  }

  function createVertexMarker(place) {
    const icon = middleIcon();
    const marker = L.marker(place.location, {
      icon,
      draggable: true,
      id: place.id,
    });

    marker.on("drag", function (event) {
      const location = event.target.getLatLng();
      const { id } = event.target.options;

      places = places.map((place) => {
        if (id && place.id === id) {
          return { ...place, location };
        }
        return place;
      });

      cleanUp();
    });
    return marker;
  }

  function calcMiddleLatLng(map, latlng1, latlng2) {
    // calculate the middle coordinates between two markers
    const p1 = map.project(latlng1);
    const p2 = map.project(latlng2);
    return map.unproject(p1._add(p2)._divideBy(2));
  }

  let markerLayers, lineLayers, midMarkersLayers, vertexLayers;
  function createLines() {
    lineLayers = L.polyline(
      places.map((place) => place.location),
      {
        color: "#E4E",
        opacity: 0.5,
      }
    );
  }

  function createMarkers() {
    markerLayers = L.layerGroup();
    for (let place of places) {
      if (place.name) {
        let m = createMarker(place);
        markerLayers.addLayer(m);
      }
    }
  }

  function createVertex() {
    vertexLayers = L.layerGroup();
    for (let place of places) {
      if (place.id) {
        let m = createVertexMarker(place);
        vertexLayers.addLayer(m);
      }
    }
  }

  function createMidMarkers() {
    midMarkersLayers = L.layerGroup();
    for (let i = 0; i < places.length - 1; i++) {
      const middle = calcMiddleLatLng(
        map,
        places[i].location,
        places[i + 1].location
      );

      const midmarker = L.marker(middle, {
        icon: middleIcon(),
        draggable: true,
        after: i,
      });

      midmarker.on("dragend", function (event) {
        const latLng = event.target.getLatLng();
        places.splice(event.target.options.after + 1, 0, {
          location: [latLng.lat, latLng.lng],
          id: Date.now(),
        });

        places = places;

        cleanUp();
      });

      midMarkersLayers.addLayer(midmarker);
    }
  }

  function cleanUp() {
    midMarkersLayers.remove();
    lineLayers.remove();
    midMarkersLayers.remove();
    vertexLayers.remove();

    createMidMarkers();
    createLines();
    createMarkers();
    createVertex();

    midMarkersLayers.addTo(map);
    lineLayers.addTo(map);
    midMarkersLayers.addTo(map);
    vertexLayers.addTo(map);
  }
  function mapAction(container) {
    map = createMap(container);

    createLines();
    createMarkers();
    createMidMarkers();
    createVertex();

    lineLayers.addTo(map);
    markerLayers.addTo(map);
    midMarkersLayers.addTo(map);
    vertexLayers.addTo(map);
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
    width: 60px;
    transform: translateX(-50%) translateY(-25%);
  }

  .map :global(.map-middle-marker) {
    width: 60px;
    transform: translateX(-50%) translateY(-25%);
    background-color: rgb(244, 6, 212);
    color: #eee;
    border-radius: 0.5rem;
  }
</style>
