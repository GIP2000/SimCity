//this will deal with the drawing
const logic = require("./logic.js");
const phaser = require("phaser"); 
const zoom_and_pan = require("./graphics_lib/zoom_and_pan.js"); 
let game = null; 
let config = null; 

exports.startGraphics = (window,width,height) => {

    config = {
        type: Phaser.AUTO,
        width: width - width*.02,
        height: height - height*.02,
        loader:{
            crossOrigin: 'anonymous',
            baseURL:"https://raw.githubusercontent.com/nazimboudeffa/assets/master/"
        },

        
        scene: {
            preload: preload,
            create: create,
            upadte: upadte,
        }
    };

    game = new Phaser.Game(config);
    logic.init(width,height);
   
    
} 



function preload (){
    this.load.image('tree', 'pics/hyrule.png');
}
function create(){
     
    this.cameras.main.setBounds(0, 0, config.width, config.height);
    let camera = this.cameras.main; 
    let scene = this;


    this.image = this.add.sprite(400,350,'tree'); 
    this.input.on("pointerdown",(pointer)=>{
        zoom_and_pan.pointer_down(pointer); 
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

function upadte(){
    console.log("upadte"); 



}


