export class ShadowSystem{    
    
    constructor(light){
        this._shadowGenerator  = new BABYLON.ShadowGenerator(1024, light);
        //this._shadowGenerator.bias = 0.01;
    }

    add(mesh){       
        this._shadowGenerator.addShadowCaster(mesh);
    }
}