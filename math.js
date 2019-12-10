// this will be for mostly static functions and calculations 
let atmw = null; 
let area = null; 
const stdue = 75600; 

// game speed is how many real seconds one second in the game represents 
const game_speed = 35040000; // 876000 is way too slow we are going to need to speed shit up a lot and have the game take place over a longer period of time (theoretical time)


const init = total=>{
    area = total; 
    atmw = 5.148e18*(area)/(1.230e11);
    console.log("atmw = ",atmw); 
}
const convertPpmToKg =ppm=>{
    return (ppm/10000)*(44.0095/28.97)*atmw;
}

const convertKgToPpmPercentageOutOf515 =kg=>{
    return (((kg/atmw)/(44.00095/28.97))*10000)/515   ; // make it retun the ppm/515; 
}

const initalCO2 = ()=>{
    const intitalppm = 409.53;
    console.log(`Inital CO2 is `,convertPpmToKg(intitalppm) ) ;
    return convertPpmToKg(intitalppm);
}
const initalMoney = ()=>{
    return 100000000;
}
const initalHappiness = ()=>{
    return 1000; 
}

const getPopulation = (time=0)=>{
    return Math.ceil(.22*area)*2^time; 
}

const convertPerYearToPerSecond = value=>(value/31536000)*game_speed; // TODO check this function again because something is off I think

const energyRequirments = (population,factory)=>(population*-10800)+(factory*2*stdue);  // I made up the factory stuff 

const housingNeed = population=>Math.ceil(population*.077); 

const getTimeInDecYear =cycle=>(cycle*game_speed)/31536000; 

module.exports = {
    initalCO2,
    initalMoney,
    initalHappiness,
    convertPpmToKg,
    convertKgToPpmPercentageOutOf515,
    init,
    convertPerYearToPerSecond,
    getPopulation,
    energyRequirments,
    housingNeed,
    getTimeInDecYear
}