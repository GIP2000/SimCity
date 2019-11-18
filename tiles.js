let game = null;
let width = null; 
let height = null; 
let setOpencontainer = null; 
let replaceTile = null; 
let createContainer = null; 
let removeOpenContainer = null;

const init =(pgame,pwidth,pheight,psetOpenContainer,preplaceTile,pcreateContainer,premoveOpenContainer)=>{
    game = pgame; 
    width = pwidth; 
    height = pheight; 
    setOpencontainer = psetOpenContainer;
    replaceTile = preplaceTile; 
    createContainer = pcreateContainer; 
    removeOpenContainer = premoveOpenContainer; 
}


class Tile{
    constructor(x,y,game,type="tile",claimed=true){
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

class ClaimedGrass extends Tile{
    constructor(x,y,game){
        super(x,y,game,"grass"); 
        this.options = [new BuildPowerPlant(this),new BuildCarCharger(this),new BuildFarm(this),new BuildApt(this), new BuildFactory(this)]; 
    }
}

class SolarPanel extends Tile{
    constructor(x,y,game){
        super(x,y,game,"SolarPanel");
        this.options = [new Destory(this)]; 
    }
}
class WindTurbine extends Tile{
    constructor(x,y,game){
        super(x,y,game,"WindTurbne");
        this.options = [new Destory(this)]; 
    }
}

class CoalPlant extends Tile{
    constructor(x,y,game){
        super(x,y,game,"CoalPlant");
        this.options = [new Destory(this)]; 
    }
}

class GasStation extends Tile{
    constructor(x,y,game){
        super(x,y,game,"GasStation");
        this.options = [new Destory(this)]; 
    }
}

class ElectricCarCharger extends Tile{
    constructor(x,y,game){
        super(x,y,game,"ElectricCarCharger");
        this.options = [new Destory(this)]; 
    }
}

class MeatFarm extends Tile{
    constructor(x,y,game){
        super(x,y,game,"MeatFarm");
        this.options = [new Destory(this)]; 
    }
}

class VegiFarm extends Tile{
    constructor(x,y,game){
        super(x,y,game,"Agriculture");
        this.options = [new Destory(this)]; 
    }
}
class Apt extends Tile{
    constructor(x,y,game){
        super(x,y,game,"Apt");
        this.options = [new Destory(this)]; 
    }
}
class Factory extends Tile{
    constructor(x,y,game){
        super(x,y,game,"Factory");
        this.options = [new Destory(this)]; 
    }
}


// this is where the different options begin 


class Option{
    constructor(name,tile,handler=null){
        this.name = name;
        this.tile = tile;  
        this.handler = handler == null ? ()=>console.log(this.name):handler;
        this.createFolder = options =>{
            removeOpenContainer();
            setOpencontainer(this.tile.row(),this.tile.column()); 
            this.tile.container = createContainer(this.tile,game,width,height,options);
            removeOpenContainer(); 
        }
    }
}

class Destory extends Option{
    constructor(tile){
        super(`Knock Down ${tile.type}`,tile); 
        this.handler = ()=>replaceTile(tile,ClaimedGrass); 
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
        this.handler = () => replaceTile(tile,ClaimedGrass);
    }
}

class BuildApt extends Option{
    constructor(tile){
        super("Build Apartment",tile);
        this.handler = () => replaceTile(tile,Apt);
    }
}

class BuildFactory extends Option{
    constructor(tile){
        super("Build Factory",tile);
        this.handler = () => replaceTile(tile,Factory);
    }
}


/*Energy */
class BuildPowerPlant extends Option{
    constructor(tile){
        super("Build Energy",tile);
        this.handler = ()=> this.createFolder([new BuildCoalPlant(tile),new BuildSolarPower(tile),new BuildWindTurbine(tile)]);
    }
}

class BuildCoalPlant extends Option{
    constructor(tile){
        super("Build Coal Plant",tile); 
        this.handler = ()=>replaceTile(tile,CoalPlant);
    }
}

class BuildSolarPower extends Option{
    constructor(tile){
        super("Build Solar Power",tile); 
        this.handler = ()=>replaceTile(tile,SolarPanel); 
    }
}
class BuildWindTurbine extends Option{
    constructor(tile){
        super("Build Wind Turbine Power",tile); 
        this.handler = ()=>replaceTile(tile,WindTurbine);
    }
}
/*End Energy */
/*Start Gas Stations */
class BuildCarCharger extends Option{
    constructor(tile){
        super("Build Car Refuler",tile);
        this.handler = ()=> this.createFolder([new BuildGasStation(tile),new BuildElectricCarCharger(tile)]);
    }
}

class BuildGasStation extends Option{
    constructor(tile){
        super("Build Gas Station",tile); 
        this.handler = ()=>replaceTile(tile,GasStation);
    }
}

class BuildElectricCarCharger extends Option{
    constructor(tile){
        super("Build Gas Station",tile); 
        this.handler = ()=>replaceTile(tile,ElectricCarCharger);
    }
}
/*End Gas Stations*/

/*Start Farm */

class BuildFarm extends Option{
    constructor(tile){
        super("Build Farm",tile);
        this.handler = ()=> this.createFolder([new BuildMeatFarm(tile),new BuildVegiFarm(tile)]);
    }
}

class BuildMeatFarm extends Option{
    constructor(tile){
        super("Build Meat Farm",tile); 
        this.handler = ()=>replaceTile(tile,MeatFarm);
    }
}

class BuildVegiFarm extends Option{
    constructor(tile){
        super("Build Agriculture Farm",tile); 
        this.handler = ()=>replaceTile(tile,VegiFarm);
    }
}
/*End Farm */


module.exports = {
    Forest,init
}

