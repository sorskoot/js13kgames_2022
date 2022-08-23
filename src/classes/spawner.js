import { AIController } from "./components/AIController";
import { MeshEntity } from "./components/MeshEntity";
import secs from "./secs";

export class Spawner {
    
    /** @type {boolean} */
    isSpawning;

    /** @type {number} spawning interval in ms*/
    interval;    

    /**
     * Instantiates a new Spawner
     * @param {BABYLON.Scene} scene
     * @param {BABYLON.AbstractMesh} basemesh The mesh to spawn
     * @param {BABYLON.Vector3} position
     * @param {number} interval
     */
    constructor(scene, basemesh, position, interval){
        this.scene = scene;
        this.basemesh = basemesh;
        this.position = position;
        this.interval = interval;
        this.basemesh.setEnabled(false);
    }

    start(){
        this.isSpawning = true;
        this._t = setInterval(()=>{                     
                var skeleton2 = this.basemesh.createInstance(`skeleton`);
                this.scene.beginAnimation(skeleton2, 0, 100, true, .97 + Math.random() * .6);
                skeleton2.position.copyFrom(this.position);
                skeleton2.lookAt(new BABYLON.Vector3(0,0,0))
                skeleton2.setEnabled(true);
                secs.createEntity([
                    new MeshEntity(skeleton2),
                    new AIController()
                ]);
                secs.system.ShadowSystem.add(skeleton2);
                //b.addShadowCaster(skeleton2);
               // this.enemies.push(skeleton2);
            
        }, this.interval);
    }

    stop(){
        this.isSpawning = false;
        clearInterval(this._t);
    }
}