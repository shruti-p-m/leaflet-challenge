# leaflet-challenge
## Leaflet Part 1 Folder
The folder Leaflet Part 1 holds a logic.js, style.css, and index.html file that all produce a map that shows earthquakes from the past weeks.

The logic.js script has two functions, one function creates the Map with two layers and the legend for the map, and the second function creates the markers for the earthquake data.

The second function takes the earthquake data and does the following items:
- assigns a marker a color based on the depth of the earthquake
- changes the radius of the marker based on the magnitude of the earthquake
- shows the place, magnitude, and depth of the earthquake in a popup when selecting an earthquake

## Citations
- the logic.js script used code from the website: https://stackoverflow.com/questions/25364072/how-to-use-circle-markers-with-leaflet-tilelayer-geojson to make the markers for the earthquake data into circles
- the logic.js and style.css scripts used code from the website: https://codepen.io/haakseth/pen/KQbjdO to create the legend
