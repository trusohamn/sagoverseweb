<script>
  import L from "leaflet";
  let map;
  let initialView = { lat: 52.968459819373585, lng: 18.321627974510196 };
  let initialZoom = 4;
  let showFirstInstruction = true;
  let showSecondInstruction = false;

  function hideFirstInstruction() {
    showFirstInstruction = false;
  }

  function hideSecondInstruction() {
    showSecondInstruction = false;
  }

  let places = [];
  function updatePlaces({ lat, lng }) {
    places = [
      {
        value: "intro1",
        name: "1. Intro",
        location: { lat: lat, lng: lng },
      },
      {
        value: "drake2",
        name: "2. Dragon",
        location: {
          lat: lat + 0.0007495,
          lng: lng - 0.0031189,
        },
      },
      {
        value: "troll3a",
        name: "3. Troll",
        location: {
          lat: lat + 0.001848,
          lng: lng - 0.004985,
        },
      },
      {
        value: "hyllemor4",
        name: "4. Hyllemor",
        location: {
          lat: lat + 0.003398,
          lng: lng - 0.004985,
        },
      },
      {
        value: "prasslar5",
        name: "5. Prasslar",
        location: {
          lat: lat + 0.004807,
          lng: lng - 0.004899,
        },
      },
      {
        value: "jerff6",
        name: "6. Jerff",
        location: {
          lat: lat + 0.005685,
          lng: lng - 0.002131,
        },
      },
      {
        value: "alv7",
        name: "7. Elves",
        location: {
          lat: lat + 0.005815,
          lng: lng + 0.001344,
        },
      },
      {
        value: "kor8",
        name: "8. Cows",
        location: {
          lat: lat + 0.004807,
          lng: lng + 0.004434,
        },
      },
      {
        value: "vittror9",
        name: "9. Vittror",
        location: {
          lat: lat + 0.00314,
          lng: lng + 0.00567,
        },
      },
      {
        value: "haren10",
        name: "10. Hare",
        location: {
          lat: lat + 0.00116,
          lng: lng + 0.00434,
        },
      },
      {
        value: "mamma11",
        name: "11. Dragon Mom",
        location: {
          lat: lat + 0.00021,
          lng: lng + 0.00158,
        },
      },
    ];
  }

  function createMap(container) {
    let m = L.map(container, { preferCanvas: true }).setView(
      initialView,
      initialZoom
    );
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: `&copy<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: "abcd",
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
    const html = `<div class="map-middle-marker"><div class="map-middle-icon"></div></div>`;
    return L.divIcon({
      html,
      className: "map-middle-marker",
    });
  }

  function vertexIcon() {
    const html = `<div class="map-middle-marker"><div class="map-vertex-icon"></div></div>`;
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
    const icon = vertexIcon();
    const marker = L.marker(place.location, {
      icon,
      draggable: true,
      id: place.id,
    });

    marker.on("dragend", function (event) {
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
    marker.on("dblclick", function (event) {
      const { id } = event.target.options;

      places = places.reduce((acc, place) => {
        if (place.id !== id) {
          acc.push(place);
        }
        return acc;
      }, []);
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
    vertexLayers.remove();

    createMidMarkers();
    createLines();
    createMarkers();
    createVertex();

    midMarkersLayers.addTo(map);
    lineLayers.addTo(map);
    vertexLayers.addTo(map);
  }
  function addAllMarkers() {
    createMidMarkers();
    createLines();
    createMarkers();
    createVertex();

    midMarkersLayers.addTo(map);
    lineLayers.addTo(map);
    markerLayers.addTo(map);
    vertexLayers.addTo(map);
  }

  function resizeMap() {
    if (map) {
      map.invalidateSize();
    }
  }

  function initMapAction(container) {
    map = createMap(container);
    map.doubleClickZoom.disable();

    function getStigLocation(event) {
      if (!places.length) {
        updatePlaces(event.latlng);
        addAllMarkers();
        map.setView(event.latlng, 15);
        showSecondInstruction = true;
      }
    }

    map.on("dblclick", getStigLocation);
    return {
      destroy: () => {
        map.remove();
        map = null;
      },
    };
  }
  $: console.log(JSON.stringify(places));
</script>

<svelte:window on:resize={resizeMap} />

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
<container>
  <div class="header"><h2>SagoWalk creator</h2></div>
  <div class="map" use:initMapAction>
    {#if showFirstInstruction}
      <div class="mapCover" on:click={hideFirstInstruction}>
        <div class="brightArea">
          <div class="cross" />
          <p>
            Find a perfect spot for start of SagoWalk and <b>double click</b> on
            it
          </p>
        </div>
      </div>
    {/if}
    {#if showSecondInstruction}
      <div class="mapCover" on:click={hideSecondInstruction}>
        <div class="brightArea">
          <div class="cross" />
          <p>
            Perfect! Now <b>move the parts of the Saga</b> along your desired
            walk and <b>adjust the trail</b> between them to follow paths/roads
          </p>
        </div>
      </div>
    {/if}
  </div>
  <div class="underMap">
    <div class="message">
      We are still developing this creator, but soon you will be able to submit
      your walks to Sagoverse
    </div>
  </div>
</container>

<style>
  container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    background-color: #009d9d;
    overflow: hidden;
    flex-direction: column;
  }

  .header {
    height: 80px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    color: white;
  }

  .map {
    height: 70%;
    width: 100%;
  }

  p {
    font-size: 1.5em;
  }
  .mapCover {
    height: 100%;
    width: 100%;
    background-color: rgba(59, 53, 58, 0.7);
    z-index: 2000;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cross {
    float: right;
    padding-left: 10px;
    padding-bottom: 10px;
  }
  .cross::after {
    font-size: 20px;
    display: inline-block;
    content: "\00d7"; /* This will render the 'X' */
  }
  .brightArea {
    background-color: #eee;
    width: 50%;
    max-width: 200px;
    padding: 20px;
    border-radius: 10px;
  }
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

  .map :global(.map-middle-icon) {
    padding: 12px;
    border-radius: 15px;
    border: 3px solid rgba(244, 6, 212, 0.5);
    transform: translateX(-25%) translateY(-25%);
  }

  .map :global(.map-vertex-icon) {
    padding: 15px;
    background-color: rgb(142, 85, 128);
    border-radius: 15px;
    transform: translateX(-25%) translateY(-25%);
    box-shadow: inset 0px 0px 20px -10px #000000;
  }
  .underMap {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 30px auto;
  }
  .message {
    max-width: 400px;
    margin-top: 20px;
    color: black;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border-radius: 10px;
  }
</style>
