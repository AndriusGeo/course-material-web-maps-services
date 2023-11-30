var map = new maplibregl.Map({
  container: "map",
  style: "map_styles/topo.openmap.style.json",
  center: [23.827, 55.129],
  zoom: 7,
  hash: true,
});

// Add zoom and rotation controls to the map.
map.addControl(new maplibregl.NavigationControl());

function changeMapStyle(styleType) {
  map.setStyle("map_styles/" + styleType + ".openmap.style.json");
}

map.on("load", () => {
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
    paint: {},
  });
});
