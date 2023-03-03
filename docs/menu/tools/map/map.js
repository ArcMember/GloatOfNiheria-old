function makeMap(type, showLocations=false) {
    let mapUrl = "map-geographical"
    switch(type) {
        case "geographical":
            mapUrl = "map-geographical"
            break;
        case "political": 
            mapUrl = "map-political"
            break;
        case "extended": 
            mapUrl = "map-extended"
            break;
    }

    let regions = L.layerGroup()
    let marks = L.layerGroup()
    var bounds = [[0, 0], [-256, 256]];

    var map = L.map('map', {
        minZoom: 1,
        maxZoom: 4,
        zoom: 1,
        center: [-128, 128],
        trackResize: true,
        maxBounds: bounds,
        layers: [regions, marks],
        crs: L.CRS.Simple,
    });
    L.tileLayer(mapUrl+'/{z}/{x}/{y}.jpg', {
        tileSize: 128,
        noWrap: true,
    }).addTo(map);

    if (L.Browser.ielt9) {
        alert('Обновите браузер.');
    }

    map.on('click', onMapClick);

    if (showLocations) {
        var overlayMaps = {
            "Регионы": regions,
        };
        var layerControl = L.control.layers(null, overlayMaps).addTo(map);
        layerControl.addOverlay(marks, "Локации")
        
        makeLocations(map)
    }
    function onMapClick(e) {
        if (window.localStorage.getItem("admin") === "true") {
            document.getElementById("debug").innerHTML += `[${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}], `
            navigator.clipboard.writeText(document.getElementById("debug").innerHTML);
        }
    }

    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 68 && e.shiftKey && e.altKey) {
            document.getElementById("debug").innerHTML = ``
        }
    // do something
    });

    function makeLocations(map) {
        // Locations are loaded from the "locations.js" file
        for (const loc of locations) {
            if ('polygon' in loc) {
                let polygon = L.polygon(loc['polygon'], {
                    color: loc['color'],
                    fillColor: loc['color'],
                    fillOpacity: 0.2,
                    opacity: 0.7,
                }).addTo(map);
                /* polygon.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div>`); */
                regions.addLayer(polygon)
            }
        }
        for (const loc of locations) {
            if ('blob' in loc) {
                let circle = L.circle(loc['blob'], {
                    color: loc['color'],
                    fillColor: loc['color'],
                    fillOpacity: 0.5,
                    radius: 3
                }).addTo(map);
                /* circle.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div>`); */
                marks.addLayer(circle)
            }
        }
        for (const loc of locations) {
            if ('coords' in loc) {
                let circle = L.circle(loc['coords'], {
                    color: loc['color'],
                    fillColor: loc['color'],
                    fillOpacity: 0.5,
                    radius: 1
                }).addTo(map);
                /* circle.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div`); */
                marks.addLayer(circle)
            }
        }
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(number) {
        var x = this.x + number;
        var y = this.y + number;
        return new Vector(x, y);
    }
    minus(number) {
        var x = this.x - number;
        var y = this.y - number;
        return new Vector(x, y);
    }
    multiply(number) {
        var x = this.x * number;
        var y = this.y * number;
        return new Vector(x, y);
    }
    divide(number) {
        var x = this.x / number;
        var y = this.y / number;
        return new Vector(x, y);
    }
    toString() {
        return 'Vector { x: ' + this.x + ', y: ' + this.y + ' }';
    }
    
}