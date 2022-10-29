function applyMapEffect() {
    let mapContainer = document.getElementsByClassName("map-container")[0];
    let mapObject = document.getElementsByClassName("map-object")[0];
    /*
    let mapFilter = document.getElementsByClassName("map-filter")[0];
    mapFilter.style.minWidth = mapObject.offsetWidth + "px";
    mapFilter.style.minHeight = mapObject.offsetHeight + "px";
    */    
    getEllipse(mapObject, "overlay").setAttribute("style", "pointer-events:none;");
    
    
    mapObject.getElementById("north-isles").classList.add("map-element");
}

function setPolygonStyle(item, params) {
    item.setAttribute("style", `fill: ${params.style};`);
}

function setPolygons(parent, name, doForeach, params) {
    let p = parent.getElementById(name).getElementsByTagName('polygon'); 
    for (let item of p) {
        doForeach(item, params);
    }
}

function getEllipse(parent, name) {
    return parent.getElementById(name).getElementsByTagName('ellipse')[0];
}