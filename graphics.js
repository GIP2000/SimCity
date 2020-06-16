//this will deal with the drawing
const logic = require("./logic.js");
const phaser = require("phaser"); 
const toolbar = require("./graphics_lib/toolbar.js"); 
const zoom_and_pan = require("./graphics_lib/zoom_and_pan.js"); 
let game = null; 
let config = null; 
let has_clicked_on_conatiner = false; // if true will not destory container 
let document = null; 
let paused = false; 
let new_scene = null; 

exports.startGraphics = (pdocument,width,height) => {

    config = {
        type: Phaser.AUTO,
        width: width - width*.02,
        height: height - height*.05,
        loader:{
            crossOrigin: 'anonymous',
            baseURL:"https://raw.githubusercontent.com/GIP2000/assets/master/"
        },
        scene: {
            preload: preload,
            create: create,
        }
    };

    game = new Phaser.Game(config);
    document = pdocument;

    document.getElementById("pause").addEventListener("click",function(){
        paused = !paused; 
        this.textContent = paused ? "Play":"Pause";  
    });
} 

function preload (){
    this.load.image('tile', 'Test_tile.jpg');
    this.load.image('Forest', 'Trees.png');
    this.load.image('Stump', 'Stumps.png');
    this.load.image("grass",'grass.png');
    this.load.image('SolarPanel', 'solarPV.png');
    this.load.image("WindTurbne",'windmill.png'); 
    this.load.image("CoalPlant",'coal.png'); 
    this.load.image("Factory",'factory.png'); 
    this.load.image("MeatFarm",'farmAnimal.png');
    this.load.image("Agriculture",'plantfarm.png');
    this.load.image("Apt",'house.png');
    this.load.image("Park",'PARK.png');
}
function create(){
    logic.init(this,createContainer,toolbar); 

    this.cameras.main.setBounds(0, 0, config.width, config.height);
    this.cameras.main.setZoom(zoom_and_pan.zoom); 
    let camera = this.cameras.main; 
    let scene = this;

    this.input.on("pointerdown",(pointer)=>{
        if(has_clicked_on_conatiner){
            has_clicked_on_conatiner = false; 
        } else {
            zoom_and_pan.pointer_down(pointer); 
            logic.removeOpenContainer(); 
        }
        
    });

    this.input.on("pointerup",(pointer)=>{
        zoom_and_pan.pointer_up(pointer); 
    });

    this.input.on("pointermove",(pointer)=>{
        zoom_and_pan.pointer_move(pointer,camera);
    });
    
    window.addEventListener("wheel",(e)=>{
        zoom_and_pan.scroll(e,scene); 
        logic.removeOpenContainer(); 
    });

    new_scene = this.scene.add("ToolBar",Phaser.Scene,true); 

    toolbar.init(new_scene,config.width,config.height,logic.getTotal(),document); 

    timeStamp = this.time.addEvent({
        delay: 1000,
        callback: oneSecond,
        callbackScope: scene,
    }); 
}

function oneSecond(){
    //console.log("Paused is ", paused); 
    if(!paused){
        logic.updateTime(); 
        logic.updateCO2();  
        logic.updateWellness();
        logic.taxes();  
    } 
    const game_status = logic.checkGameOver(); 
    if(game_status == null){
        this.time.addEvent({
            delay: 1000,
            callback: oneSecond,
            callbackScope: this,
        }); 
    }
}

const createContainer = (tile,scene,tw,th,options=null,cords=null)=>{
    const left = -200; 
    const top = (-2*th);
    let op_flag = options == null
    options = op_flag? tile.options:options;

    const text = new_scene.add.text(left,top-100,"Options",{color:"Black",fontFamily: 'my_font'}); 
    const rect = new Phaser.GameObjects.Rectangle(new_scene,0,top, left*-2, 200,0x234099).setInteractive();
    rect.on("pointerdown",pointer=>{has_clicked_on_conatiner = true;});
    const buttons = options.map( (x,i) => {
        let button = new_scene.add.text(left,(top-100)+20*(i+1),x.name_string(),{color:"white",fontFamily: 'my_font'}).setInteractive(); 
        button.on("pointerdown",x.handler); 
        return button
    });

    //console.log(new_scene.input.activePointer,scene.input.activePointer); 
    if(op_flag){ 
        var x = new_scene.input.activePointer.x-left;
        var y = new_scene.input.activePointer.y+th;
    } else {
        var x = cords.x;
        var y = cords.y;
    }
    logic.removeOpenContainer(); 
    logic.removeOpenContainer(); 
    logic.setOpencontainer(tile.row(),tile.column(),x,y); 
    const container = new_scene.add.container(x,y,[rect,text,...buttons]); 

    return container; 
}
