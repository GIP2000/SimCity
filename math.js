// this will be for mostly static functions and calculations 
let atmw = null; 
let area = null; 
const stdue = 75600; 

const game_speed = 438056.605675;  // this is every second is about 5 days

const init = total=>{
    area = total; 
    atmw = 5.148e18*(area)/(1.230e11);
}
const convertPpmToKg =ppm=>(ppm/10000)*(44.0095/28.97)*atmw;

const convertKgToPpmPercentageOutOf515 =kg=>(((kg/atmw)/(44.00095/28.97))*10000)/515   ; // make it retun the ppm/515; 

const initalCO2 = ()=>{
    const intitalppm = 409.53;
    return convertPpmToKg(intitalppm);
}
const initalMoney = ()=>10000000000;

const getWellness = (time,food,energy,houses,factory,meat)=>{
    const food_fraction = food/foodRequirements(time) > 1 ? 1: food/foodRequirements(time); 
    const energy_fraction = energy/energyRequirments(getPopulation(time),factory) > 1 ? 1: energy/energyRequirments(getPopulation(time),factory); 
    const housing_fraction = houses/housingNeed(getPopulation(time)) > 1 ? 1: houses/housingNeed(getPopulation(time)); 
    const econemy_fraction = factory/factoryRequiremnets(time) > 1 ? 1: factory/factoryRequiremnets(time);
    const meat_fraction = meat/meatRequirements(time) > 1 ? 1: meat/meatRequirements(time); 

    return ((Math.pow(food_fraction,2))/(Math.pow(100,2-1))*(Math.pow(energy_fraction,.75))/(Math.pow(100,.75-1))*(Math.pow(housing_fraction,1.75))/(Math.pow(100,1.75-1))*(Math.pow(econemy_fraction,.66))/(Math.pow(100,.66-1))*(Math.pow(meat_fraction,.5))/(Math.pow(100,.5-1)))/0.047863009232263824; 
}; 

const getPopulation = (time=0)=>Math.ceil(.22*area*(Math.pow(1.05,time)));

const convertPerYearToPerSecond = value=>(value/31536000)*game_speed; // TODO check this function again because something is off I think

const energyRequirments = (population,factory)=>(population*10800)+(factory*2*stdue);  // I made up the factory stuff 

const housingNeed = population=>Math.ceil(population*.077); 

const getTimeInDecYear =cycle=>(cycle*game_speed)/31536000; 

const foodRequirements =time=>getPopulation(time)*2000; 

const factoryRequiremnets =time=>Math.ceil(getPopulation(time)/5);

const meatRequirements =time=>foodRequirements(time)/31;

module.exports = {
    initalCO2,
    initalMoney,
    convertPpmToKg,
    convertKgToPpmPercentageOutOf515,
    init,
    convertPerYearToPerSecond,
    getPopulation,
    energyRequirments,
    housingNeed,
    getTimeInDecYear,
    getWellness
}