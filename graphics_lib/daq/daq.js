const chart = require("chart.js"); 
let CO2data = [];
let ppmdata = [];  
let modal = null; 

const init=document=>{
    modal = document.querySelector(".modal");
    document.getElementById("graph").addEventListener("click",()=>{
        getGameData(document); 
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

const getGameData=document=>{

    const ctx = document.getElementById("chart").getContext('2d');
    //console.log(CO2data); 

    let myChart = new chart.Chart(ctx,{
        type:"line",
        data:{
            labels: CO2data.map((x,i)=>i),
            datasets:[
            // {
            //     data:CO2data,
            //     label:"CO2",
            //     fill:false,
            //     borderColor: "#3e95cd",

            // },
            {
                data:ppmdata.map(x=>x*100),
                label:"%PPM/515",
                fill:false,
                borderColor: "#8e5ea2",
            }
        
        ],

        },
    });

    
    toggleModal(); 
    

}

const toggleModal=()=>{
    modal.classList.toggle("show-modal");
}

module.exports = {
    appendCO2Data,init,appendPpmData
}