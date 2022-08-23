import { MeshEntity } from "../components/MeshEntity";

export class ShadowSystem{    
    
    constructor(light){
        this._shadowGenerator  = new BABYLON.ShadowGenerator(1024, light);
    }

    add(mesh){       
        this._shadowGenerator.addShadowCaster(mesh);
    }
}