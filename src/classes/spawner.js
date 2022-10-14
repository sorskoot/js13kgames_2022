import { AIController } from "./components/AIController";
import { EnemyEntity } from "./components/EnemyEntity";
import { Grave } from "./components/Grave";
import { MeshEntity } from "./components/MeshEntity";
import { secs } from "./secs";

export class Spawner {

    /** @type {boolean} */
    isSpawning;

    /** @type {number} spawning interval in ms*/
    interval;

    /**
     e* Instantiates a new Spawner
     * @param {BABYLON.Scene} scene
     * @param {BABYLON.AbstractMesh} basemesh The mesh to spawn
     * @param {number} interval
     */
    constructor(scene, basemesh, interval, prestartDelay = 0) {
        this.scene = scene;
        this.basemesh = basemesh;
        this.interval = interval;
        this.prestartDelay = prestartDelay;
        this.basemesh.setEnabled(false);
    }

    start() {
        this.isSpawning = true;
        this._timeout = setTimeout(() => {
            this._t = setTimeout(()=>this.spawn(true), this.interval);
        }, this.prestartDelay);
    }

    spawn(first = false){
            /** @type Grave[] */
            let graveEntities = secs.match(Grave).map(e => e.get(Grave));
            let graves = graveEntities.filter(g => g.occupied);
            if(first){
                window.app.totalSkeletons = graves.length;
            }
            if(graves.length == 0) {
                  this.stop();
                  return
            }

            let grave = graves[Math.floor(Math.random() * graves.length)];
            if (grave) {
                grave.occupied = false;
                var skeleton2 = this.basemesh.createInstance(`skeleton${+ new Date()}`);
                skeleton2.parent = window.app.enemyP;                    
                let riseAnim = skeleton2.getAnimationByName("Rise");
                let walkAnim = skeleton2.getAnimationByName("Walk");
                this.scene.beginDirectAnimation(skeleton2, [riseAnim], 0, 100, false);
                setTimeout(() => {
                    this.scene.beginDirectAnimation(skeleton2, [walkAnim], 0, 100, true, .97 + Math.random() * .6)
                }, 1000);

                skeleton2.position.copyFrom(grave.grave.position);                    
                skeleton2.position.z -= 1.7;
                skeleton2.lookAt(new BABYLON.Vector3(0, 0, 0))
                skeleton2.setEnabled(true);
                skeleton2.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
                skeleton2.entity =
                    secs.createEntity([
                        new MeshEntity(skeleton2),
                        new AIController((Math.random() / 50) + .15),
                        new EnemyEntity()
                    ]);
                secs.system.ShadowSystem.add(skeleton2);
            }
            if(this.isSpawning){
                var t = (graves.length * 50) + (-Math.log(Math.random()) * graves.length * 40);
                console.log(t);
                setTimeout(()=>this.spawn(), t);
            }
    
    }

    stop() {
        this.isSpawning = false;
        clearTimeout(this._timeout)
        clearInterval(this._t);
    }
}