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

exports.init(); 









