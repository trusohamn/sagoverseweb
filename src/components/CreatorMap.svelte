<script lang="ts">
  import L from "leaflet";
  import type { Place, Location } from "../types";

  export let places: Place[] = [];
  let map;
  let initialView = { lat: 52.968459819373585, lng: 18.321627974510196 };
  let initialZoom = 4;
  let showSagaList = true;
  let showFirstInstruction = false;
  let showSecondInstruction = false;
  let length = "";
  let saga = "tomtestigen";

  function hideSagaList() {
    showSagaList = false;
  }

  function hideFirstInstruction() {
    showFirstInstruction = false;
  }

  function hideSecondInstruction() {
    showSecondInstruction = false;
  }

  function updatePlaces({ lat, lng }: Location) {
    const tomteStigenPlaces = [
      {
        value: "intro1",
        name: "1. Intro",
        location: { lat: lat, lng: lng },
        hint: "Start of the saga",
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
        hint: "If possible, place Troll near a big stone",
      },
      {
        value: "hyllemor4",
        name: "4. Hyllemor",
        location: {
          lat: lat + 0.003398,
          lng: lng - 0.004985,
        },
        hint: "If possible, place Hyllemor by a tree",
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
        hint: "If possible, place Elves on a meadow",
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
        hint: "If possible, place Vittror in a place with plenty of sticks",
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
        hint: "This point should be as close as possible to beginning od the trail",
      },
    ];
    const bjornstigenPlaces = [
      {
        value: "bjorn_intro",
        name: "1. Intro",
        location: { lat: lat, lng: lng },
        hint: "Start of the saga",
      },
      {
        value: "bjorn_lars",
        name: "2. Bear Lars",
        location: {
          lat: lat - 0.002,
          lng,
        },
      },
      {
        value: "bjorn_stig_start",
        name: "3. Start of Magic Trail",
        location: {
          lat: lat - 0.004,
          lng,
        },
      },
      {
        value: "bjorn_back",
        name: "4. River",
        location: {
          lat: lat - 0.006,
          lng,
        },
      },
      {
        value: "bjorn_fjarilar",
        name: "5. Butterflies",
        location: {
          lat: lat - 0.008,
          lng,
        },
      },
      {
        value: "bjorn_ravin",
        name: "6. Cliff",
        location: {
          lat: lat - 0.01,
          lng,
        },
      },
      {
        value: "bjorn_andra_sidan",
        name: "7. Cliff - other side",
        location: {
          lat: lat - 0.012,
          lng,
        },
      },
      {
        value: "bjorn_simma",
        name: "8. Lake",
        location: {
          lat: lat - 0.014,
          lng,
        },
      },
      {
        value: "bjorn_korsbar",
        name: "9. Cherries",
        location: {
          lat: lat - 0.016,
          lng,
        },
      },
      {
        value: "bjorn_hyddan",
        name: "10. Hut",
        location: {
          lat: lat - 0.018,
          lng,
        },
      },
    ];

    places = saga === "tomtestigen" ? tomteStigenPlaces : bjornstigenPlaces;
  }

  function createMap(container) {
    let m = L.map(container, { preferCanvas: true }).setView(
      initialView,
      initialZoom
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(m);

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

    marker.bindPopup(`<p>${place.hint ?? "no additional information"}</p>`);

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
        const latLng: Location = event.target.getLatLng();
        places.splice(event.target.options.after + 1, 0, {
          location: latLng,
          id: Date.now().toString(),
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

  function getDistanceInKm(origin: Location, destination: Location) {
    const lon1 = toRadian(origin.lng),
      lat1 = toRadian(origin.lat),
      lon2 = toRadian(destination.lng),
      lat2 = toRadian(destination.lat);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS;
  }
  function toRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  $: if (places) {
    const totalDistance = places.reduce((acc, place, index, array) => {
      const nextLocation = array[index + 1]?.location;
      if (nextLocation) {
        const distance = getDistanceInKm(place.location, nextLocation);
        if (distance) acc = acc + distance;
      }
      return acc;
    }, 0);
    length = totalDistance.toFixed(2);
  }
</script>

<svelte:window on:resize={resizeMap} />

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
<div class="map" use:initMapAction>
  {#if showSagaList}
    <div class="mapCover">
      <div class="brightArea">
        <div class="cross" />
        <p>For which saga would you like to create a trail?</p>
        <button
          on:click={() => {
            hideSagaList();
            showFirstInstruction = true;
            saga = "tomtestigen";
          }}>Tomtestigen</button
        >
        <button
          on:click={() => {
            hideSagaList();
            showFirstInstruction = true;
            saga = "bjornstigen";
          }}>Björnstigen</button
        >
      </div>
    </div>
  {/if}
  {#if showFirstInstruction}
    <div class="mapCover" on:click={hideFirstInstruction}>
      <div class="brightArea">
        <div class="cross" />
        <p>
          Find a perfect spot for start of SagoWalk and <b>double click</b> on it
        </p>
      </div>
    </div>
  {/if}
  {#if showSecondInstruction}
    <div class="mapCover" on:click={hideSecondInstruction}>
      <div class="brightArea">
        <div class="cross" />
        <p>
          Perfect! Now <b>move the parts of the Saga</b> along your desired walk
          and <b>adjust the trail</b> between them to follow paths/roads
        </p>
      </div>
    </div>
  {/if}

  {#if places.length}
    <div class="brightArea rightTop">length: {length}km</div>
  {/if}
</div>

<style>
  .map {
    height: 100%;
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
  .rightTop {
    width: 120px;
    margin: 10px;
    right: 0px;
    z-index: 2000;
    position: absolute;
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
</style>
