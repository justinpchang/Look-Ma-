/**
 * Variables
 */

var operatingLevel = 0; // Grid level (original is 0, once embedded is 1)
var curX = [];
var curY = [];
var grids = [];

/**
 * Operation
 */

// Initialize style and draw main grid (oL0)
styleInit();
focus(11);
focus(12);
unfocus();

// Voice recognition
if (annyang) {
    // Let's define a command.
    var commands = {
        'hey you *data': function(data) { alert(data); },
        'focus zone *zone': function(zone) { focus(zone); },//focus(convertToZone(zone)); },
        'left click zone *zone': function(zone) { leftClick(zone); }//leftClick(convertToZone(zone)); },
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
}

/**
 * Functions
 */

// Focus on a zone and draw an embedded grid
function focus(zone) {
    var x = curX[curX.length-1];
    var y = curY[curY.length-1];
    var width = 100/Math.pow(3,operatingLevel);
    var height = width;
    // row
    switch(Math.floor(zone/10)) {
        case 1:
            y += 0;
            break;
        case 2:
            y += height;
            break;
        case 3:
            y += 2 * height;
            break;
    }
    // col
    switch(zone%10) {
        case 1:
            x += 0;
            break;
        case 2:
            x += width;
            break;
        case 3:
            x += 2 * width;
            break;
    }
    // Draw grid using calculated parameters
    drawGrid(x, y, width, height);
}

// Unfocus 1 level
function unfocus() {
    curX.pop();
    curY.pop();
    operatingLevel--;
    grids.pop();
    displayGrid();
}

// Click in the middle of a given zone
/* Zones:
 * 11  12  13
 * 21  22  23
 * 31  32  33
 */
function leftClick(zone) {
    var x = curX[curX.length-1];
    var y = curY[curY.length-1];
    var width = 100/Math.pow(3,operatingLevel-1);
    var height = width;
    // row
    switch(Math.floor(zone/10)) {
        case 1:
            y += height/6;
            break;
        case 2:
            y += height/2;
            break;
        case 3:
            y += height*5/6;
            break;
    }
    // col
    switch(zone%10) {
        case 1:
            x += width/6;
            break;
        case 2:
            x += width/2;
            break;
        case 3:
            x += width*5/6;
            break;
    }
    // Convert percentage to pixels
    x = $(window).width() * x/100;
    y = $(window).height() * y/100;
    // Click given x and y coordinates found above
    simClick(x, y);
}

// Simulate clicks. Code taken from (http://stackoverflow.com/a/16509592)
function simClick(x,y){
    // Click at x and y (pixel value)
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
        width:1px; \
        background-color:#F00; \
        position:fixed; \
        z-index:1000; \
    } \
    .horizontal_line { \
        height:1px; \
        background-color:#F00; \
        position:fixed; \
        z-index:1000; \
    } \
    </style> \
    ');
    // Draw initial grid
    drawGrid(0,0,100,100);
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
        left:' + x + '%; \n\
        right:' + (100 - (x + width)) + '%; \n\
    } \n\
    #h' + operatingLevel + '2 { \n\
        top:' + (y + singleHeight * 2) + '%; \n\
        left:' + x + '%; \n\
        right:' + (100 - (x + width)) + '%; \n\
    } \n\
    </style> \n\
    ');
    grids.push(code);
    // Update global variables
    curX.push(x);
    curY.push(y);
    operatingLevel++;
    displayGrid();
}

function displayGrid() {
    for(var i = 0; i < grids.length; i++) {
        $('body').append(grids[i]);
    }
}
