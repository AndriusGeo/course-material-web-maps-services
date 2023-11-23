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
