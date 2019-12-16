// this will be mostly 
const Tiles = require("./tiles.js"); 
let row = 16; 
let column = 9;
let board = null; 
let open_conatiner = null;
let saved_container = 0; 
let game = null; 
let toolbar = null; 

let cycle = 0; 
let prev_time = 0; 
const rect_width = 120; 
const rect_heigth = 120; 

const getBoard = ()=> board; 

const getRectWidth = () => rect_width;

const getRectHeight = () => rect_heigth;

const setOpencontainer = (r,c,x,y)=>{
    if(open_conatiner != null)
        removeOpenContainer(); 
    open_conatiner = {r:r,c:c,x:x,y:y}; 
}

const getCords=()=>{ return {x:open_conatiner.x,y:open_conatiner.y}};

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
    
    
    let amountCoal = toolbar.initalCoal();
    let amountFactory = toolbar.initalFactory();
    let amountApt = toolbar.initalApt(); 
    let amountVegiFarm = toolbar.initalVegiFarm(); 
    let amountMeatFarm = toolbar.initalMeatFarm(); 

    for(let i = 0; i<column; i++){
        board.push([]); 
        for(let j = 0; j<row; j++){
            if(amountCoal-- > 0)
                board[i].push(new Tiles.CoalPlant(j*rect_width,i*rect_heigth,game));
            else if(amountFactory-- > 0)
                board[i].push(new Tiles.Factory(j*rect_width,i*rect_heigth,game));
            else if(amountApt-- > 0)
                board[i].push(new Tiles.Apt(j*rect_width,i*rect_heigth,game)); 
            else if(amountVegiFarm-- > 0)
                board[i].push(new Tiles.VegiFarm(j*rect_width,i*rect_heigth,game)); 
            else if(amountMeatFarm-- > 0)
                board[i].push(new Tiles.MeatFarm(j*rect_width,i*rect_heigth,game)); 
            else
                board[i].push(new Tiles.Forest(j*rect_width,i*rect_heigth,game));
        }
    }
    return board; 
} 

const init = (lgame,pcreateContainer,ptoolbar) => {
    game = lgame; 
    toolbar = ptoolbar; 
    Tiles.init(game,rect_width,rect_heigth,setOpencontainer,replaceTile,pcreateContainer,removeOpenContainer,toolbar.incrementMoney,toolbar.incrementEnergy,toolbar.incrementFood,toolbar.incrementMeatFood,toolbar.incrementApt,toolbar.incrementFactory,getCords); 
    board = populateBoard(); 
    
    
}

const replaceTile=(tile,TileType,CO2Increment=0)=>{
    let new_tile = new TileType(tile.x,tile.y,game);  
    removeOpenContainer(); 
    board[tile.column()][tile.row()].image.destroy(); 
    board[tile.column()][tile.row()] = new_tile; 
    toolbar.incrementMoney(new_tile.inital_cost);
    toolbar.incrementCO2(CO2Increment); 
};

const updateCO2 = ()=>{
    if(toolbar != null){
        board.forEach(x=>x.forEach(i=>toolbar.incrementCO2( typeof i.passive_net_CO2 === "function"? i.passive_net_CO2():i.passive_net_CO2)));
        toolbar.updateCO2Bar();
    }   
}

const updateWellness =()=>toolbar.updateWelnessBar(); 

const checkGameOver =()=>{
    // returns True if you win returns False if you lose and returns null if the game isn't over yet
    if(toolbar.getCO2() >= 1){
        alert("You Lose your CO2 was way too high"); 
        return false; 
    }
    if(toolbar.getTime() >= 50){
        if(toolbar.getWellness() >=.65){
            alert("You win");
            return true; 
        }
        else{
            alert("You Lose");
            return false; 
        }
    }
    return null; 
}


const taxes=()=>{

    toolbar.incrementMoney((Math.floor(toolbar.getTime()) - Math.floor(prev_time))*10000*toolbar.getPop());

}

const updateTime=()=>{
    cycle++; 
    prev_time = toolbar.getTime(); 
    Tiles.updateTime(cycle);
    toolbar.updateTime(cycle); 
}




module.exports = {
    init,
    getRectHeight,
    getRectWidth,
    getBoard,
    removeOpenContainer,
    updateCO2,
    updateWellness,
    checkGameOver,
    taxes,
    updateTime,
    setOpencontainer,
    getTotal:()=>row*column
}