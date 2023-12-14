var map = new maplibregl.Map({
  container: "map",
  style: "map_styles/topo.openmap.style.json",
  center: [23.827, 55.129],
  zoom: 7,
  hash: true,
});

map.addControl(new maplibregl.NavigationControl());

function changeMapStyle(styleType) {
  removeLayer();
  map.setStyle("map_styles/" + styleType + ".openmap.style.json");

  /*
    Šioje vietoje turėtų būti naudojamas MapLibre GL įvykis style.load
    Kol kas realizuojama su timeout, nes įvykis nesuveikia, aprašytas bug'as repozitorijoje
  */
  setTimeout(() => {
    loadLayers();
  }, "1000");
}

map.on("load", () => {
  loadLayers();
});

function toggleLayer(layerName) {
  const layerNameHtml = "layer-btn-" + layerName;

  if (map.getLayoutProperty(layerName, "visibility") == "none") {
    map.setLayoutProperty(layerName, "visibility", "visible");
    document.getElementById(layerNameHtml).style.filter = "none";
  } else {
    map.setLayoutProperty(layerName, "visibility", "none");
    document.getElementById(layerNameHtml).style.filter = "grayscale()";
  }
}

let sidebarStatus = "visible";
function toggleSidebar() {
  if (sidebarStatus == "none") {
    document.getElementById("mapapp-sidebar").style.display = "block";
    sidebarStatus = "visible";
  } else {
    document.getElementById("mapapp-sidebar").style.display = "none";
    sidebarStatus = "none";
  }
}

function loadLayers() {
  console.log("Loading layers");
  map.addSource("stvk-source", {
    type: "raster",
    tiles: [
      "https://www.geoportal.lt/mapproxy/vstt_stk?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=nac_parkai,np_draustiniai,reg_parkai",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "stvk-parkai",
    type: "raster",
    source: "stvk-source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addSource("uetk-source", {
    type: "raster",
    tiles: [
      "https://gis.biip.lt/qgisserver/uetk_public?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=hidroelektrines",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "uetk-hidroelektrines",
    type: "raster",
    source: "uetk-source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addSource("demo-source", {
    type: "raster",
    tiles: [
      "http://127.0.0.1:8010/ogc/demo_service?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=gyv_stat_2021",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "demo-layer",
    type: "raster",
    source: "demo-source",
    layout: {
      visibility: "none",
    },
  });
}

function removeLayer() {
  /*
  
    Apsvarstykite, kas būtų, jeigu mūsų žemėlapyje būtų 30 sluoksnių. 
    Pagalvokite apie šios vietos išskaidymą į funkciją(-as).
    
    Kaip tą spręstumėte? 

  */

  console.log("Removing layers");
  map.removeLayer("stvk-parkai");
  map.removeLayer("uetk-hidroelektrines");
  map.removeLayer("demo-layer");
  document.getElementById("layer-btn-stvk-parkai").style.filter = "grayscale()";
  document.getElementById("layer-btn-demo-layer").style.filter = "grayscale()";

  map.removeSource("stvk-source");
  map.removeSource("uetk-source");
  map.removeSource("demo-source");
}
