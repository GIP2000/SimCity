let drag = false; 
let px = 0; 
let py = 0; 
let zoom = 1; 
const zoom_increment = .5; 


const pointer_down = (pointer)=>{
    drag = true; 
    px = pointer.x; 
    py = pointer.y;
}

const pointer_up = (pointer)=>{
    drag = false; 
    px = pointer.x; 
    py = pointer.y;

}

const pointer_move = (pointer,cam)=>{
    if(drag){
        let temp_zoom = zoom > 1 ? 1.2:1/zoom; 
        
        cam._bounds.x += (px-pointer.x)*temp_zoom;
        cam._bounds.y += (py-pointer.y)*temp_zoom; 


        px = pointer.x; 
        py = pointer.y; 
    }


}

const scroll = (e,scene)=>{

    if (e.deltaY < 0){
        let delta_scale = zoom; 
        zoom += zoom_increment; 
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
    scroll:scroll 
}