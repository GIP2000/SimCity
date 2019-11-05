// this will be mostly 

let row = 30; 
let column = row;
let board = null; 
const rect_width = 120; 
const rect_heigth = 120; 

exports.getBoard = ()=> {return board}; 

exports.getRectWidth = () => {return rect_width}

exports.getRectHeight = () => {return rect_height}

const populateBoard = (game) =>{
    let board = []; 
    for(let i = 0; i<column; i++){
        board.push([]); 
        for(let j = 0; j<row; j++){
            board[i].push(new Tile(j*rect_width,i*rect_heigth,game)); 
        }
    }
    return board; 

}

exports.init = (game) => {
    populateBoard(game); 

}

class Tile{
    constructor(x,y,game,claimed=false){
        this.claimed = claimed; 
        this.type = "Unknown";
        this.x = x; 
        this.y = y; 
        this.image = game.add.sprite(this.x,this.y,"tile"); 
        

    }


    inBounds(mouseX,mouseY){
        //returns true if mouseX and mouseY are in the bounds of the fucntion  
        return 0; 

    }    

}










