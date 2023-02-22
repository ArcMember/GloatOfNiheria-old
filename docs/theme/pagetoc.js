// Un-active everything when you click it
Array.prototype.forEach.call(document.getElementsByClassName("pagetoc"), function(toc) {
    Array.prototype.forEach.call(toc.children, function(el) {
        el.addEventHandler("click", function() {
            Array.prototype.forEach.call(document.getElementsByClassName("pagetoc"), function(toc) {
                Array.prototype.forEach.call(toc[0].children, function(el) {
                    el.classList.remove("active");
                });
                toc.classList.add("active");
            })
        });
    });
});

var updateFunction = function() {

    var id;
    var elements = document.getElementsByClassName("header");
    Array.prototype.forEach.call(elements, function(el) {
        if (window.pageYOffset >= el.offsetTop) {
            id = el;
        }
    });

    Array.prototype.forEach.call(document.getElementsByClassName("pagetoc"), function(toc) {
        Array.prototype.forEach.call(toc.children, function(el) {
            el.classList.remove("active");
        });
    });
    if (!id) return;
    Array.prototype.forEach.call(document.getElementsByClassName("pagetoc"), function(toc) {
        Array.prototype.forEach.call(toc.children, function(el) {
            if (id.href.localeCompare(el.href) == 0) {
                el.classList.add("active");
            }
        });
    });
};

// Populate sidebar on load
window.addEventListener('load', function() {
    Array.prototype.forEach.call(document.getElementsByClassName("pagetoc"), function(pagetoc) {
        var elements = document.getElementsByClassName("header");
        Array.prototype.forEach.call(elements, function (el) {
            var link = document.createElement("a");
            link.appendChild(document.createTextNode(el.text));
            link.href = el.href;
            link.classList.add("pagetoc-" + el.parentElement.tagName);
            pagetoc.appendChild(link);
        });
        updateFunction.call();
    });
});



// Handle active elements on scroll
window.addEventListener("scroll", updateFunction);
