// this will start the application 

let graphics = require("./graphics.js");
graphics.startGraphics(window.innerWidth,window.innerHeight); 

document.oncontextmenu = function() {
    return false;
}
