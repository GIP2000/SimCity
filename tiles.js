let game = null;
let width = null; 
let height = null; 
let setOpencontainer = null; 
let replaceTile = null; 
let createContainer = null; 

const init =(pgame,pwidth,pheight,psetOpenContainer,preplaceTile,pcreateContainer)=>{
    game = pgame; 
    width = pwidth; 
    height = pheight; 
    setOpencontainer = psetOpenContainer;
    replaceTile = preplaceTile; 
    createContainer = pcreateContainer; 
}

class Tile{
    constructor(x,y,game,type="tile",claimed=false){
        this.claimed = claimed; 
        this.type = type;
        this.x = x; 
        this.y = y; 
        this.row = ()=>this.x/width; 
        this.column = ()=>this.y/height; 
        this.image = game.add.sprite(this.x,this.y,this.type).setInteractive(); 
        this.options = [new Option("Chop Down",this),new Option("Claim",this),new Option("Build",this)];
    
        this.image.on("pointerdown",pointer=>{
            if(pointer.button == 2){
                setOpencontainer(this.row(),this.column()); 
                this.container = createContainer(this,game,width,height);
            }
        });
    }

}

class Forest extends Tile{
    constructor(x,y,game){
        super(x,y,game,"Forest",false); 
        this.options = [new ChopTree(this)]; 
    }
}

class Stump extends Tile{
    constructor(x,y,game){
        super(x,y,game,"Stump",false);
        this.options = [new ClaimTile(this)]; 
    }
}

class ClaimedStump extends Stump{
    constructor(x,y){
        super(x,y,game,"Stump",true); 
        this.options = [new Option("Build",this)]; 
    }
}


// this is where the different options begin 


class Option{
    constructor(name,tile,handler=null){
        this.name = name;
        this.tile = tile;  
        this.handler = handler == null ? ()=>console.log(this.name):handler;
    }
}


class ChopTree extends Option{
    constructor(tile){
        super("ChopTree",tile);
        this.handler = () => replaceTile(tile,Stump);
    }
}

class ClaimTile extends Option{
    constructor(tile){
        super("Claim",tile);
        this.handler = () => replaceTile(tile,ClaimedStump);
    }
}

class BuildTile extends Option{
    constructor(tile){
        super("Build",tile);
    }
}

module.exports = {
    Forest,init
}

