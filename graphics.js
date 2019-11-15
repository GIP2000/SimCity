//this will deal with the drawing
const logic = require("./logic.js");
const phaser = require("phaser"); 

const zoom_and_pan = require("./graphics_lib/zoom_and_pan.js"); 
let game = null; 
let config = null; 
let has_clicked_on_conatiner = false; // if true will not destory container 

exports.startGraphics = (window,width,height) => {

    config = {
        type: Phaser.AUTO,
        width: width - width*.02,
        height: height - height*.02,
        loader:{
            crossOrigin: 'anonymous',
            baseURL:"https://raw.githubusercontent.com/GIP2000/assets/master/"
        },

        
        scene: {
            preload: preload,
            create: create,
            update: update,
        }
    };

    game = new Phaser.Game(config);
} 

function preload (){
    this.load.image('tile', 'Test_tile.jpg');
    this.load.image('Forest', 'Trees.png');
    this.load.image('Stump', 'Stumps.png');
}
function create(){
    logic.init(this,createContainer); 

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
    });


}

function update(){
    //console.log("upadte"); 
}

const createContainer = (tile,scene,tw,th)=>{
    let left = -60; 
    let top = (-1*th);

    const text = scene.add.text(left,top-50,"Options",{color:"Black"}); 
    const rect = new Phaser.GameObjects.Rectangle(scene,0,top, 120, 100,0xff0000).setInteractive();
    rect.on("pointerdown",(pointer)=>{has_clicked_on_conatiner= true;})
    const buttons = tile.options.map( (x,i) => {
        let button = scene.add.text(left,(top-50)+20*(i+1),x.name,{color:"White"}).setInteractive(); 
        button.on("pointerdown",x.handler); 
        return button
    });
    let container = scene.add.container(tile.x+60,tile.y+60,[rect,text,...buttons]); 

    return container; 
}


