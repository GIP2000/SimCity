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

