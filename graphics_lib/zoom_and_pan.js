let drag = false; 
let px = 0; 
let py = 0; 
let zoom = .25; 
const zoom_increment = .25; 


const pointer_down = (pointer)=>{
    if(pointer.button == 0){
        drag = true; 
        px = pointer.x; 
        py = pointer.y;
    }
}

const pointer_up = (pointer)=>{
    if(pointer.button == 0){
        drag = false; 
        px = pointer.x; 
        py = pointer.y;
    }

}

const pointer_move = (pointer,cam)=>{
    if(drag && pointer.button == 0){      

        cam._bounds.x += (px-pointer.x)/zoom;
        cam._bounds.y += (py-pointer.y)/zoom; 

        px = pointer.x; 
        py = pointer.y; 
    }


}

const scroll = (e,scene)=>{

    if (e.deltaY < 0){
        let delta_scale = zoom; 
        zoom += zoom_increment; 
        if( zoom > 1) zoom -= zoom_increment; 
        delta_scale = zoom-delta_scale; 
        scene.cameras.main.zoom = zoom; 
        scene.cameras.main._bounds.x += (scene.input.mousePointer.x-scene.cameras.main._bounds.x)*delta_scale; 
        scene.cameras.main._bounds.y += (scene.input.mousePointer.y-scene.cameras.main._bounds.y)*delta_scale; 
        
    } else {
        let delta_scale = zoom; 
        zoom -= zoom_increment; 
        if (zoom <= 0) zoom += zoom_increment;
        scene.cameras.main.zoom = zoom; 
        scene.cameras.main._bounds.x += (scene.input.mousePointer.x-scene.cameras.main._bounds.x)*delta_scale; 
        scene.cameras.main._bounds.y += (scene.input.mousePointer.y-scene.cameras.main._bounds.y)*delta_scale; 
        
    }
}

module.exports = {
    pointer_down: pointer_down, 
    pointer_up:pointer_up,
    pointer_move:pointer_move,
    scroll:scroll, 
    zoom:zoom
}