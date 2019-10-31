//this will deal with the drawing
const logic = require("./logic.js");
const phaser = require("phaser"); 
let game = null; 
let zoom = 1; 
const zoom_increment = .5; 




exports.startGraphics = (window,width,height) => {

    const config = {
        type: Phaser.AUTO,
        width: width - width*.02,
        height: height,
        
        scene: {
            preload: preload,
            create: create,
            upadte: upadte,
        }
    };
    

    game = new Phaser.Game(config);
    logic.init(width,height);
     

   
    
} 

scroll = (e)=>{
    console.log(this);
    if (e.deltaY < 0){
        // zoom in
        //game.cameras.main.setZoom(2); 

    } else {
        //zoom out
        
    }

}


function preload (){
    this.load.image('logo', 'assets/Tiles/test_tile.jpg');
}
function create(){
    

    this.image = this.add.sprite(400,350,'logo'); 
    let scene = this;   
    window.addEventListener("wheel",function(e){
        //e.preventDefault(); 
        console.log(e); 

        if (e.deltaY < 0){
            zoom += zoom_increment; 
            //scene.cameras.main.centerOn(e.clientX,e.clientY); 
            scene.cameras.main.setZoom(zoom); 
    
        } else {
            zoom -= zoom_increment; 
            //scene.cameras.main.centerOn(e.clientX,e.clientY); 
            scene.cameras.main.setZoom(zoom); 
            //zoom out
            
        }
        

    });

}

function upadte(){
    console.log("upadte"); 



}

const drawBoard = (board,ctx) => {
    let rect_width = logic.getRectWidth();
    let rect_height = logic.getRectHeight();
    
    for(let row of board){
        for(let tile of row){
            ctx.rect(tile.x,tile.y,rect_width,rect_height);
        }
    }
    ctx.stroke(); 

}

