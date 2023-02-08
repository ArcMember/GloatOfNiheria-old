function makeMap(type, showLocations=false) {
    let mapPic = "map-geographical.png"
    switch(type) {
        case "geographical":
            mapPic = "map-geographical.png";
            break;
        case "political": 
            mapPic = "map-political.png";
            break;
        case "extended": 
            mapPic = "map-extended.png";
            break;
    }

    let regions = L.layerGroup()
    let marks = L.layerGroup()

    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 3,
        layers: [regions, marks],
    });
    var bounds = [[0,0], [1000,1000]];
    var image = L.imageOverlay(mapPic, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setView([500,500], 0)

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
            navigator.clipboard.writeText(`[${e.latlng.lat}, ${e.latlng.lng}]`);
        }
    }
    
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
                polygon.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div>`);
                polygon.on('click', function(e) { 
                    polygon.openPopup();
                })
                regions.addLayer(polygon)
            }
        }
        for (const loc of locations) {
            if ('blob' in loc) {
                let circle = L.circle(loc['blob'], {
                    color: loc['color'],
                    fillColor: loc['color'],
                    fillOpacity: 0.5,
                    radius: 15
                }).addTo(map);
                circle.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div>`);
                circle.on('click', function(e) { 
                    circle.openPopup();
                })
                marks.addLayer(circle)
            }
        }
        for (const loc of locations) {
            if ('coords' in loc) {
                let circle = L.circle(loc['coords'], {
                    color: loc['color'],
                    fillColor: loc['color'],
                    fillOpacity: 0.5,
                    radius: 5
                }).addTo(map);
                circle.bindPopup(`<div map-popup><b>${loc['name']}</b><br><i><a target=”_blank” href="${loc['url']}">Нажмите сюда, чтобы перейти.</a></i></div`);
                circle.on('click', function(e) { 
                    circle.openPopup();
                })
                marks.addLayer(circle)
            }
        }
    }
}

