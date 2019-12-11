const math = require("../math.js");
const daq = require("./daq/daq.js"); 
const stdue = 75600; 
let scene = null; 
let CO2 = null;
let money = null;
let CO2_progress = null; 
let money_progress = null; 
let energy_progress = null; 
let energy = 0; 
let time = 0; 
let food = 0; 
let meat_food = 0; 
let apt = 0; 
let factory = 0; 
let wellness_bar = null; 



const init = (toolbar,width,height,total,document)=>{
    math.init(total); 
    money = math.initalMoney(); 
    CO2 = math.initalCO2()
    scene = toolbar; 
    daq.init(document)
    daq.appendCO2Data(CO2);
    daq.appendPpmData(math.convertKgToPpmPercentageOutOf515(CO2)); 
    
    let CO2_box = scene.add.graphics(); 
    CO2_box.fillStyle(0x222222, 0.8);
    CO2_box.fillRect(5, 0, 320, 50); //TODO of new bar 248 x 48
    updateCO2Bar(); 

    let money_box = scene.add.graphics();
    money_box.fillStyle(0xFFFF00, 0.8);
    money_box.fillRect(500, 0, 320, 50); 
    updateMoney(); 

    let energy_box = scene.add.graphics();
    energy_box.fillStyle(0xFFFF00, 0.8);
    energy_box.fillRect(1000, 0, 320, 50); 
    updateEnergy();
    
    let wellness_box = scene.add.graphics(); 
    wellness_box.fillStyle(0x222222, 0.8);
    wellness_box.fillRect(1500, 0, 320, 50); //TODO of new bar 248 x 48
    updateWelnessBar();  
}

const updateCO2Bar=()=>{
    if (CO2_progress != null)
        CO2_progress.visible = false; // TODO make sure I do proper garbage collection here do some research on it
    CO2_progress = scene.add.graphics(); 
    CO2_progress.fillStyle(0xffffff, 1);
    CO2_progress.fillRect(15, 10, 300 * math.convertKgToPpmPercentageOutOf515(CO2), 30);
    daq.appendCO2Data(CO2); 
    daq.appendPpmData(math.convertKgToPpmPercentageOutOf515(CO2)); 
}

const updateWelnessBar=()=>{
    if (wellness_bar != null)
        wellness_bar.visible = false; // TODO make sure I do proper garbage collection here do some research on it
    wellness_bar = scene.add.graphics(); 
    wellness_bar.fillStyle(0xffffff, 1);
    console.log("Wellness = ",getWellness()); 
    wellness_bar.fillRect(1515, 10, 300 * getWellness(), 30);
}

const getWellness = ()=>math.getWellness(time,food,energy,apt,factory,meat_food,CO2);

const updateMoney=()=>{
    if (money_progress != null)
        money_progress.visible = false; 
    money_progress = scene.add.text(515,10,`$${money}`,{color:"Black"});
}

const updateEnergy =()=>{
    if (energy_progress != null)
        energy_progress.visible = false; 
    energy_progress = scene.add.text(1015,10,`${energy}kwh`,{color:"Black"});
}

const incrementFood=inc=>{food+=inc;}
const incrementMeatFood=inc=>{meat_food+=inc;}

const incrementCO2=inc=>{
    CO2+=inc; 
}

const incrementMoney=inc=>{
    if(money + inc < 0){
        alert("You don't have enough money for that "); 
        return false; 
    }else {
        if(inc != undefined) {
            money+=inc; 
            updateMoney(); 
            return true; 
        } else {
            return false;
        } 
    }
}
const incrementEnergy = inc=>{energy+=inc;updateEnergy();}; 

const getCO2 = ()=>math.convertKgToPpmPercentageOutOf515(CO2); 

const updateTime =t=>{time=math.getTimeInDecYear(t);console.log(time); }

const incrementApt =inc=>{apt+=inc;}
const incrementFactory =inc=>{factory+=inc;}

const getTime = ()=>time;

const initalCoal=()=>{
    const amountCoal = 28;
    energy += stdue*2*amountCoal; 
    return amountCoal

}

const initalFactory=()=>{
    const amountFactory = 18;
    factory += amountFactory;  
    return amountFactory

}

const initalApt=()=>{
    const amountApt = 8;
    apt += amountApt;  
    return amountApt

}

const initalVegiFarm=()=>{
    const amountVegiFarm = 21;
    food += amountVegiFarm*8250;  
    return amountVegiFarm

}

const initalMeatFarm=()=>{
    const amountMeatFarm = 24;
    food += amountMeatFarm* 237.484737485;  
    meat_food += amountMeatFarm* 237.484737485
    return amountMeatFarm
}

const getPop = ()=>math.getPopulation(time); 



module.exports = {
    init,
    incrementCO2,
    incrementMoney,
    updateCO2Bar,
    incrementEnergy,
    getCO2,
    updateTime, 
    incrementFood,
    incrementMeatFood,
    incrementApt,
    incrementFactory,
    updateWelnessBar,
    getTime,
    getWellness,
    initalCoal,
    initalFactory,
    initalApt,
    initalVegiFarm,
    initalMeatFarm,
    getPop,
}