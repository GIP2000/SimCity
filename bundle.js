(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//this will deal with the drawing
var logic = require("./logic.js"); 


console.log(logic.getBoard()); 


exports.start_graphics = (canvasDOM,document,window) => {

    let canvas = document.getElementById(canvasDOM);
    canvas.width = window.innerWidth - window.innerWidth*.02;
    canvas.height = window.innerHeight; 
    let ctx = canvas.getContext("2d");
    logic.init(canvas.width,canvas.height);

    drawBoard(logic.getBoard(),ctx); 

}

drawBoard = (board,ctx) => {
    let rect_width = logic.getRectWidth();
    let rect_height = logic.getRectHeight();
    
    //let offsetY = 0; 
    for(let row of board){
        //let offsetX = 0;
        for(let tile of row){
            ctx.rect(tile.x,tile.y,rect_width,rect_height);
            //offsetX+=rect_width; 
        }
        //offsetY += rect_height; 
    }
    ctx.stroke(); 

}


},{"./logic.js":2}],2:[function(require,module,exports){
// this will be mostly 

let row = 11; 
let column = 11;
let board = null; 
let rect_width = null; 
let rect_height = null; 

exports.getBoard = ()=> {return board}; 

exports.getRectWidth = () => {return rect_width}

exports.getRectHeight = () => {return rect_height}

const populateBoard = (rect_width,rect_height) =>{
    let board = []; 
    for(let i = 0; i<column; i++){
        board.push([]); 
        for(let j = 0; j<row; j++){
            board[i].push(new Tile(j*rect_width,i*rect_height)); 
        }
    }
    return board; 

}

exports.init = (width,height) => {
    let rect_width_t = Math.floor(width/row); 
    let rect_height_t = Math.floor(height/column);
    rect_height = rect_height_t; 
    rect_width = rect_width_t;
    board = populateBoard(rect_width,rect_height); 

}

class Tile{
    constructor(x,y,claimed=false){
        this.claimed = claimed; 
        this.img = new Image();
        this.type = "Unknown";
        this.x = x; 
        this.y = y; 
        

    }


    inBounds = (mouseX,mouseY) => {
        //returns true if mouseX and mouseY are in the bounds of the fucntion  

    }    

}










},{}],3:[function(require,module,exports){
// this will start the application 

let graphics = require("./graphics.js");
graphics.start_graphics("canvas",document,window); 

},{"./graphics.js":1}]},{},[3]);
