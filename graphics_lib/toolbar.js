const math = require("../math.js");
let scene = null; 
let CO2 = null;
let money = null;
let happiness = null;
let CO2_progress = null; 
let money_progress = null; 
let population = math.getInitalPopulation();

const init = (toolbar,width,height,total)=>{
    math.init(total); 
    money = math.initalMoney(); 
    CO2 = math.initalCO2()
    happiness = math.initalHappiness(); 
    scene = toolbar; 
    
    let CO2_box = scene.add.graphics(); 
    CO2_box.fillStyle(0x222222, 0.8);
    CO2_box.fillRect(5, 0, 320, 50);
    updateCO2Bar(); 

    let money_box = scene.add.graphics();
    money_box.fillStyle(0xFF0000, 0.8);
    money_box.fillRect(500, 0, 320, 50); 
    updateMoney(); 

    

    

}

const updateCO2Bar=()=>{
    if (CO2_progress != null)
        CO2_progress.visible = false; // TODO make sure I do proper garbage collection here do some research on it
    CO2_progress = scene.add.graphics(); 
    CO2_progress.fillStyle(0xffffff, 1);
    CO2_progress.fillRect(15, 10, 300 * math.convertKgToPpmPercentageOutOf515(CO2), 30);
}

const updateMoney=()=>{
    if (money_progress != null)
        money_progress.visible = false; 
    money_progress = scene.add.text(515,10,`$${money}`,{color:"Black"});
}


const incrementCO2=inc=>{
    CO2+=inc; 
}

const incrementHappiness=inc=>{
    happiness+=inc; 
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

module.exports = {
    init,
    incrementCO2,
    incrementHappiness,
    incrementMoney,
    updateCO2Bar,
}