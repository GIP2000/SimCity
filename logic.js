// this will be mostly 
const Tiles = require("./tiles.js"); 
let row = 30; 
let column = row;
let board = null; 
let open_conatiner = null;
let saved_container = 0; 
let game = null; 
let createContainer = null; 

const rect_width = 120; 
const rect_heigth = 120; 



const getBoard = ()=> {return board}; 

const getRectWidth = () => {return rect_width}

const getRectHeight = () => {return rect_heigth}

const setOpencontainer = (r,c)=>{
    if(open_conatiner != null)
        removeOpenContainer(); 
    open_conatiner = {r:r,c:c}; 
}

const removeOpenContainer = ()=>{
    if(open_conatiner != null){
        let container = board[open_conatiner.c][open_conatiner.r].container
        if(container != null){
            if(saved_container == 1){  // otherwise on opening container would be destoryed 
                container.destroy(); 
                open_conatiner = null; 
                saved_container = 0; 
            } else {
                saved_container = 1; 
            }
        }
    }
}

const populateBoard = () =>{
    let board = []; 
    for(let i = 0; i<column; i++){
        board.push([]); 
        for(let j = 0; j<row; j++){
            board[i].push(new Tiles.Forest(j*rect_width,i*rect_heigth,game)); 
        }
    }
    return board; 

} 

const init = (lgame,pcreateContainer) => {
    game = lgame; 
    Tiles.init(game,rect_width,rect_heigth,setOpencontainer,replaceTile,pcreateContainer); 
    createContainer = pcreateContainer
    board = populateBoard(); 
    
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

const replaceTile=(tile,TileType)=>{
    //console.log(createContainer); 
    let new_tile = new TileType(tile.x,tile.y,game); 
    console.log(new_tile); 
    removeOpenContainer(); 

    board[tile.column()][tile.row()] = new_tile; 

    //console.log(board,tile.column(),tile.row()); 


};



module.exports = {
    init,
    getRectHeight,
    getRectWidth,
    getBoard,
    removeOpenContainer,
}




