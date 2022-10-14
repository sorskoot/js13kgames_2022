import { MeshEntity } from "./MeshEntity";

export class AIController {
    constructor(speed){
        this.speed = speed;
    }

    update(deltaTime, entity){
                
        /** @type {BABYLON.AbstractMesh} */
        let mesh = entity.get(MeshEntity).mesh;
        
        mesh.lookAt(window.app.camera.position);
        const direction = mesh.position.subtract(window.app.camera.position).normalize();        
        mesh.translate(new BABYLON.Vector3(direction.x,0,direction.z), -this.speed / deltaTime, BABYLON.Space.LOCAL);
        mesh.position.y=0;

        if(mesh.intersectsMesh(window.app.camCol)){
            window.app.changeState(3);            
        }
    }
}
