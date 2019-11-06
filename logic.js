// this will be mostly 

let row = 30; 
let column = row;
let board = null; 
let open_conatiner = null;
let saved_container = 0; 

const rect_width = 120; 
const rect_heigth = 120; 

const getBoard = ()=> {return board}; 

const getRectWidth = () => {return rect_width}

const getRectHeight = () => {return rect_height}

const setOpencontainer = (r,c)=>{
    if(open_conatiner != null)
        removeOpenContainer(); 
    open_conatiner = {r:r,c:c}; 
}

const removeOpenContainer = ()=>{
    if(open_conatiner != null){
        let container = board[open_conatiner.c][open_conatiner.r].container
        if(container != null){
            if(saved_container == 1){
                container.destroy(); 
                open_conatiner = null; 
                saved_container = 0; 
            } else {
                saved_container = 1; 
            }
        }
    }
}

const populateBoard = (game,createContainer) =>{
    let board = []; 
    for(let i = 0; i<column; i++){
        board.push([]); 
        for(let j = 0; j<row; j++){
            board[i].push(new Tile(j*rect_width,i*rect_heigth,game,createContainer)); 
        }
    }
    return board; 

} 

const init = (game,createContainer) => {
    board = populateBoard(game,createContainer); 
}

const destoryContainers = ()=>{
    for(row of board){
        for(tile of row){
            if(tile.container != null){
                tile.container.destroy(); 
                tile.container = null; 
            }
        }
    }
}

class Tile{
    constructor(x,y,game,createContainer,claimed=false){
        this.claimed = claimed; 
        this.type = "tile";
        this.x = x; 
        this.y = y; 
        this.column = ()=>this.x/rect_width; 
        this.row = ()=>this.y/rect_heigth; 
        this.image = game.add.sprite(this.x,this.y,this.type).setInteractive(); 
        this.options = [new Option("Chop Down",this),new Option("Claim",this),new Option("Build",this)];
    
        this.image.on("pointerdown",pointer=>{
            if(pointer.button == 2){
                setOpencontainer(this.column(),this.row()); 
                this.container = createContainer(this,game,rect_width,rect_heigth);
            }
        });
    }

}


class Option{
    constructor(name,tile,handler=null){
        this.name = name;
        this.tile = tile;  
        this.handler = handler == null ? ()=>console.log(name):handler;
    }
}



module.exports = {
    init:init,
    getRectHeight:getRectHeight,
    getRectWidth:getRectWidth,
    getBoard:getBoard,
    removeOpenContainer:removeOpenContainer


}




