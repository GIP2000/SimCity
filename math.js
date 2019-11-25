// this will be for mostly static functions and calculations 
let atmw = null; 
let area = null; 

const init = total=>{
    area = total; 
    atmw = 5.148e18*(area)/(1.230e11);
}
const convertPpmToKg =ppm=>{
    return (ppm/1000)*(44.0095/28.97)*atmw;
}

const convertKgToPpmPercentageOutOf515 =kg=>{
    return (((kg/atmw)/(44.00095/28.97))*1000)/515   ; // make it retun the ppm/515; 
}

const initalCO2 = ()=>{
    const intitalppm = 409.53; 
    return convertPpmToKg(intitalppm);
}
const initalMoney = ()=>{
    return 1000;
}
const initalHappiness = ()=>{
    return 1000; 
}

const getInitalPopulation = ()=>{
    return Math.ceil(.22*area); 
}


const convertPerYearToPerSecond = (value)=>{
    return value/31536000; 
}

const energyRequirments = (population)=>{
    return population*-10800
}

module.exports = {
    initalCO2,
    initalMoney,
    initalHappiness,
    convertPpmToKg,
    convertKgToPpmPercentageOutOf515,
    init,
    convertPerYearToPerSecond,
    getInitalPopulation,
}