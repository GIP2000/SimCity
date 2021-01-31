const chart = require("chart.js"); 
let CO2data = [];
let ppmdata = [];  
let modal = null; 
let myChart = null; 

const init=(document,game_speed)=>{
    modal = document.querySelector(".modal");
    document.getElementById("graph").addEventListener("click",()=>{
        getGameData(document,game_speed); 
    });
    document.querySelector(".close-button").addEventListener("click",()=>{
        toggleModal(); 
    });


}

const appendCO2Data=d=>{
    CO2data.push(d); 
}

const appendPpmData=d=>{
    ppmdata.push(d); 
}

const getGameData=(document,game_speed)=>{

    const ctx = document.getElementById("chart").getContext('2d');
    let data = {
        labels: CO2data.map((x,i)=>(parseFloat(parseInt(((i*game_speed)/(31536000.0)+2020)*100))/100.0)),
        datasets:[
        {
            data:ppmdata.map(x=>x*100),
            label:"%PPM/515",
            fill:false,
            borderColor: "#8e5ea2",
        }
    
    ],

    }
    if (myChart == null)
        myChart = new chart.Chart(ctx,{type:"line",data});
    else
        myChart.data = data; 
        myChart.update(); 
    toggleModal(); 

}

const toggleModal=()=>{
    modal.classList.toggle("show-modal");
}

module.exports = {
    appendCO2Data,init,appendPpmData
}