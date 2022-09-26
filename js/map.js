// Initialise map
var map = L.map('map').setView([7.0, -1.09], 7);


// Add Osm tile layer to map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);



var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
// .addTo(map)


var googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


//var marker = L.marker([7,-1.09]).addTo(map)


// Region Layer Style
var regionStyle = {
    color: "violet",
    opacity: 1,
    weight: 2

}

// Railway Layer Style
var railwaylayer = {
    color: "black",
    weight: 2,
}


// Health Facility Layer
var healthfacilitystyle = {
    radius:8,
    fillColor:"orange",
    color:"green",
    weight: 1,
}

// Add Geojson Layers
var regionlayer = L.geoJson(region, {
    style:regionStyle,
    onEachFeature:function (feature, layer) {

        area = (turf.area(feature)/1000000).toFixed(3)
        //console.log(area)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

        //console.log(center)

        label= `Name: ${feature.properties.region}<br>`
        label+=`Area: ${area}<br>`
        label+=`Center:Lng: ${center_lng} , Lat: ${center_lat} <br>`

        layer.bindPopup(label)
    }

}).addTo(map)


var healthsiteslayer = L.geoJson(healthfacility,{
    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, healthfacilitystyle);
},

onEachFeature:function (feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
})//.addTo(map)


var railwaylayer = L.geoJson(railway, {
    style:railwaylayer,
    onEachFeature:function (feature, layer) {
        layer.bindPopup(feature.properties.NAME)
    }

})//.addTo(map)


// Adding WMS Layers
// Load wms river
var RiverWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Rivers',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map)

// Load TreeCover wms layer
var TreeCoverWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:treecover',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map)

// Load POis wms Layer
var PoisWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Pois',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map)


var PlacesWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Places',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map)

// Load Airports wms Layer
var AirportsWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Airports',
    format: 'image/png',
    transparent: true,
    attribution: ""
})//.addTo(map)


// Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
    // "Regions": regionlayer,
    // "Health Facilities": healthsiteslayer,
    // "Railways": railwaylayer,
    // "Rivers": RiverWMS,
    // "Tree Cover": TreeCoverWMS,
    // "Places of Interests": PoisWMS,
    // "Places": PlacesWMS,
    // "Airprts": AirportsWMS
};



// Layers
var overlays = {

    "Regions": regionlayer,
    "Health Facilities": healthsiteslayer,
    "Railways": railwaylayer,
    "Rivers": RiverWMS,
    "Tree Cover": TreeCoverWMS,
    "Places of Interests": PoisWMS,
    "Places": PlacesWMS,
    "Airprts": AirportsWMS

    //"Marker": marker,
   // "Roads": roadsLayer
};

// Add layer control to map

//L.control.layers(baseLayers).addTo(map);

L.control.layers(baseLayers, overlays, {collapsed:true}).addTo(map);

//Add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);


// mouse move coordinate
map.on("mousemove", function(e) {
	// console.log(e)
	$("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)} , Lng:${e.latlng.lng.toFixed(3)}`)
})





// Adding Scale to map
L.control.scale().addTo(map);


