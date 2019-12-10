const math = require("./math.js");
const stdue = 75600; 


let game = null;
let width = null; 
let height = null; 
let setOpencontainer = null; 
let replaceTile = null; 
let createContainer = null; 
let removeOpenContainer = null;
let incrementEnergy = null; 
let incrementMoney = null; 
let amountofCarCargers = 0; //TODO set this to the real number we start with prob from math.
let amountofGasStations = 0; 
let time = 0; 

const init =(pgame,pwidth,pheight,psetOpenContainer,preplaceTile,pcreateContainer,premoveOpenContainer,pincrementMoney,pincrementEnergy)=>{
    game = pgame; 
    width = pwidth; 
    height = pheight; 
    setOpencontainer = psetOpenContainer;
    replaceTile = preplaceTile; 
    createContainer = pcreateContainer; 
    removeOpenContainer = premoveOpenContainer; 
    incrementMoney = pincrementMoney; 
    incrementEnergy = pincrementEnergy; 
}

const updateTime =t=>{time=math.getTimeInDecYear(t);console.log(time); }

class Tile{
    constructor(x,y,game,type="tile",claimed=true){
        this.claimed = claimed; 
        this.type = type;
        this.x = x; 
        this.y = y; 
        this.row = ()=>this.x/width; 
        this.column = ()=>this.y/height; 
        this.image = game.add.sprite(this.x,this.y,this.type).setInteractive(); 
        this.options = [new Option("Test",this)];
        this.passive_net_CO2 = 0; 
        this.passive_net_happiness = 0; 
    
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
        this.passive_net_CO2 = -1*math.convertPerYearToPerSecond(2540.12); 
    }
}

class Park extends Tile{
    constructor(x,y,game){
        super(x,y,game,"Park",true); 
        this.options = [new Destory(this)]; 
        this.passive_net_CO2 = -1*math.convertPerYearToPerSecond(2540.12); 
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
        this.options = [new BuildPowerPlant(this),new BuildCarCharger(this),new BuildFarm(this),new BuildApt(this), new BuildFactory(this), new BuildPark(this)]; 
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
        this.passive_net_CO2 = math.convertPerYearToPerSecond(178718.4);
    }
}

class GasStation extends Tile{
    constructor(x,y,game){
        super(x,y,game,"GasStation");
        this.options = [new Destory(this)]; 
        this.passive_net_CO2 = ()=>amountofCarCargers == 0 ?0:math.floor(amountofGasStations/amountofCarCargers)*math.getPopulation(time)*(math.convertPerYearToPerSecond(5443));  //TODO fix this is false I need to account for the population in this statment
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
        this.inital_cost = 0; 
        this.energy_per_year = 0; 
        this.custom_handler = handler;
        this.handler = ()=>{
            if(incrementMoney(-1*this.inital_cost)){
                incrementEnergy(this.energy_per_year); 
                this.custom_handler(); 
            }
        }
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
        super(`Knock Down ${tile.type}`,tile,()=>{
            if(tile instanceof ElectricCarCharger || tile instanceof GasStation){
                amountofCarCargers--; 
                if(tile instanceof GasStation)
                    amountofGasStations--; 
            } else if(tile instanceof CoalPlant || tile instanceof SolarPanel || tile instanceof WindTurbine){
                incrementEnergy(tile instanceof CoalPlant ? stdue*-2:stdue*-1); 
            }
            replaceTile(tile,ClaimedGrass)
        }); 
        if(tile instanceof Factory){
            this.inital_cost = 50000;
        }
    }
}

class ChopTree extends Option{
    constructor(tile){
        super("ChopTree",tile,() => replaceTile(tile,Stump));
        this.inital_cost = -1000; 
    }
    
}

class ClaimTile extends Option{
    constructor(tile){
        super("Claim",tile,() => replaceTile(tile,ClaimedGrass));
    }
}

class BuildApt extends Option{
    constructor(tile){
        super("Build Apartment",tile,() => replaceTile(tile,Apt,81283.8));
        this.inital_cost = 428000; 
    }
}

class BuildPark extends Option{
    constructor(tile){
        super("Build Park",tile,() => replaceTile(tile,Park,81283.8));
        //this.inital_cost = 0; 
    }
}

class BuildFactory extends Option{
    constructor(tile){
        super("Build Factory",tile,() => replaceTile(tile,Factory));
        this.inital_cost = 100000; 
    }
}


/*Energy */
class BuildPowerPlant extends Option{
    constructor(tile){
        super("Build Energy",tile,()=> this.createFolder([new BuildCoalPlant(tile),new BuildSolarPower(tile),new BuildWindTurbine(tile)]));
    }
}

class BuildCoalPlant extends Option{
    constructor(tile){
        super("Build Coal Plant",tile,()=>replaceTile(tile,CoalPlant)); 
        this.energy_per_year = stdue*2;  // you need 2 for the inital population 
        
    }
}

class BuildSolarPower extends Option{
    constructor(tile){
        super("Build Solar Power",tile,()=>replaceTile(tile,SolarPanel)); 
        this.energy_per_year = stdue; // This is enough so that you need 4 for the inital population 
    }
}
class BuildWindTurbine extends Option{
    constructor(tile){
        super("Build Wind Turbine Power",tile,()=>replaceTile(tile,WindTurbine)); 
        this.energy_per_year = stdue;// This is enough so that you need 4 for the inital population 
    }
}
/*End Energy */

/*Start Gas Stations */
class BuildCarCharger extends Option{
    constructor(tile){
        super("Build Car Refuler",tile,()=> this.createFolder([new BuildGasStation(tile),new BuildElectricCarCharger(tile)]));
    }
}

class BuildGasStation extends Option{
    constructor(tile){
        super("Build Gas Station",tile,()=>{
            amountofCarCargers++; 
            amountofGasStations++; 
            replaceTile(tile,GasStation)
        }); 
        this.inital_cost = 100000; 
    }
}

class BuildElectricCarCharger extends Option{
    constructor(tile){
        super("Build Gas Station",tile,()=>{
            amountofCarCargers++; 
            replaceTile(tile,ElectricCarCharger)
        }); 
        this.inital_cost = 175000; 
    }
}
/*End Gas Stations*/

/*Start Farm */

class BuildFarm extends Option{
    constructor(tile){
        super("Build Farm",tile,()=> this.createFolder([new BuildMeatFarm(tile),new BuildVegiFarm(tile)]));
    }
}

class BuildMeatFarm extends Option{
    constructor(tile){
        super("Build Meat Farm",tile,()=>replaceTile(tile,MeatFarm)); 
    }
}

class BuildVegiFarm extends Option{
    constructor(tile){
        super("Build Agriculture Farm",tile,()=>replaceTile(tile,VegiFarm)); 
    }
}
/*End Farm */


module.exports = {
    Forest,init,updateTime
}

