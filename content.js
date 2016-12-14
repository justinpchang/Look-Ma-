// Adds HTML for grid
$('body').append('\
<style> \
.vertical_line { \
    width:3px; \
    background-color:#F00; \
    position:fixed; \
    top:0; \
    bottom:0; \
    z-index:1000; \
} \
#v1 { \
    left:33%; \
} \
#v2 { \
    left:67%; \
} \
.horizontal_line { \
    width:100%; \
    height:3px; \
    background-color:#F00; \
    position:fixed; \
    left:0; \
    right:0; \
    z-index:1000; \
} \
#h1 { \
    top:33%; \
} \
#h2 { \
    top:67%; \
} \
</style> \
<div class="vertical_line" id="v1">&nbsp;</div> \
<div class="vertical_line" id="v2">&nbsp;</div> \
<div class="horizontal_line" id="h1">&nbsp;</div> \
<div class="horizontal_line" id="h2">&nbsp;</div> \
');

leftClick(prompt("Zone: ", "11"));

// Function click in the middle of a given zone
/* Zones:
 * 11  12  13
 * 21  22  23
 * 31  32  33
 */
function leftClick(zone) {
    var x,y;
    var width = $(window).width();
    var height = $(window).height();
    // x-coordinate of zone
    switch(Math.floor(zone/10)) {
        case 1:
            x = width/6;
            break;
        case 2:
            x = width/2;
            break;
        case 3:
            x = width*5/6;
            break;
    }
    // y-coordinate of zone
    switch(zone%10) {
        case 1:
            y = height/6;
            break;
        case 2:
            y = height/2;
            break;
        case 3:
            y = height*5/6;
            break;
    }
    // Debug messages
    console.log("width: " + width);
    console.log("height: " + height);
    console.log("zone: " + zone);
    console.log("x: " + x);
    console.log("y: " + y);
    // Click given x and y coordinates found above
    simClick(x, y);
}

// Function to simulate clicks. Code taken from (http://stackoverflow.com/a/16509592)
function simClick(x,y){
    var ev = document.createEvent("MouseEvent");
    var el = document.elementFromPoint(x,y);
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        x, y, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
}
