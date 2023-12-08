// adding url
let url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// function to create map
function createMap(earthquakes){
    // setting base map
    let streetmap =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }); 
    // settting up map config with base layer plus earthquake layer for the markes
    let myMap = L.map(id="map", {
        center: [37.09, -95.71],
        zoom: 2,
        layers: [streetmap, earthquakes]
    });
    // adding legend placement
    let legend = L.control({ position: "bottomright" });

    //creating legend
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        // range of values for the depth and corresponding colors
        let depths = ['-10 - 10 ', '10 - 30', '30 - 50', '50 - 70', '70 - 90 ', '90+'];
        let colors = ['d9f0a3','ffffb2','fed976','feb24c','fd8d3c','f03b20']
        let labels = [];
    
        // https://codepen.io/haakseth/pen/KQbjdO
        // adds the html of adding the color with the value of the range of depths 
        depths.forEach(function(depths, index) {
            labels.push("<i style=\"background: #" + colors[index] + "\"></i><span>" + depths +"</span><br>");
        });
        // joining the labels together to create the legend's html
        div.innerHTML += labels.join("");
        return div;
    };

    // adding legend to map
    legend.addTo(myMap);
}

// function to add markers and features of earthquakes to map
function createFeatures(earthquakeData){
    // for each feature, adding a pop up showing the place, mag, and depth of the earthquake
    function onEachFeature(feature, layer){
        layer.bindPopup(`<p>Location: ${feature.properties.place}<p><hr><p>Magnitude: ${feature.properties.mag}</p>
        <hr><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    }
    // assigning colors based on the value of the depth
    function choseColor(depth){
        if (depth > 90) {
            return '#f03b20'
        }
        else if (depth > 70) {
            return '#fd8d3c'
        }
        else if (depth > 50) {
            return '#feb24c'
        }
        else if (depth > 30) {
            return '#fed976'
        }
        else if (depth > 10) {
            return '#ffffb2'
        }
        else {
            return '#d9f0a3'
        }
    }
    // create markers to be circles and based on the data
    // https://stackoverflow.com/questions/25364072/how-to-use-circle-markers-with-leaflet-tilelayer-geojson
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
            // radius is scaled with the magnitude
            radius: feature.properties.mag * 3,
            // fill color is changed based on depth via the above function
            fillColor: choseColor(feature.geometry.coordinates[2]),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
            });
        },
        onEachFeature: onEachFeature
    });
    // create earthquake layer
    createMap(earthquakes);
    

}
// running functions to create the map
d3.json(url).then(function (data) {
    createFeatures(data.features);
}); 