/**
 * Variables
 */
var operatingLevel = 0; // Grid level (original is 0, once embedded is 1)

// Initialize style
styleInit();

/**
 * Functions
 */

// Click in the middle of a given zone
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

// Simulate clicks. Code taken from (http://stackoverflow.com/a/16509592)
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

// Initialize style to universally support
function styleInit() {
    $('body').append('\
    <style> \
    .vertical_line { \
        width:3px; \
        background-color:#F00; \
        position:fixed; \
        z-index:1000; \
    } \
    .horizontal_line { \
        height:3px; \
        background-color:#F00; \
        position:fixed; \
        z-index:1000; \
    } \
    </style> \
    ');
}

// Draw grid given top-left coordinates, width, and height (all in %)
//  NOTE: Always increment operatingLevel before calling this method
function drawGrid(x, y, width, height) {
    // Dimension variables
    var singleWidth = width/3;
    var singleHeight = height/3;
    // Full code to add
    var code = '';
    // HTML
    code = code.concat('\
    <div class="vertical_line" id="v' + operatingLevel + '1">&nbsp;</div> \n\
    <div class="vertical_line" id="v' + operatingLevel + '2">&nbsp;</div> \n\
    <div class="horizontal_line" id="h' + operatingLevel + '1">&nbsp;</div> \n\
    <div class="horizontal_line" id="h' + operatingLevel + '2">&nbsp;</div> \n\
    ');
    // CSS
    code = code.concat('\n\
    <style> \n\
    #v' + operatingLevel + '1 { \n\
        left:' + (x + singleWidth) + '%; \n\
        top:' + y + '%; \n\
        bottom:' + (100 - (y + height)) + '%; \n\
    } \n\
    #v' + operatingLevel + '2 { \n\
        left:' + (x + singleWidth * 2) + '%; \n\
        top:' + y + '%; \n\
        bottom:' + (100 - (y + height)) + '%; \n\
    } \n\
    #h' + operatingLevel + '1 { \n\
        top:' + (y + singleHeight) + '%; \n\
        left:' + x + '; \n\
        right:' + (100 - (x + width)) + '%; \n\
    } \n\
    #h' + operatingLevel + '2 { \n\
        top:' + (y + singleHeight * 2) + '%; \n\
        left:' + x + '; \n\
        right:' + (100 - (x + width)) + '%; \n\
    } \n\
    </style> \n\
    ');
    console.log(code);
    $('body').append(code);
}
