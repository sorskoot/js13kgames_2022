import { AIController } from "./components/AIController";
import { EnemyEntity } from "./components/EnemyEntity";
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
    constructor(scene, basemesh, position, interval, prestartDelay = 0) {
        this.scene = scene;
        this.basemesh = basemesh;
        this.position = position;
        this.interval = interval;
        this.prestartDelay = prestartDelay;
        this.basemesh.setEnabled(false);
    }

    start() {
        this.isSpawning = true;
        this._timeout = setTimeout(() => {
            this._t = setInterval(() => {
                var skeleton2 = this.basemesh.createInstance(`skeleton${+ new Date()}`);
                skeleton2.parent = window.app.enemyParent;
                this.scene.beginAnimation(skeleton2, 0, 100, true, .97 + Math.random() * .6);
                skeleton2.position.copyFrom(this.position);
                skeleton2.lookAt(new BABYLON.Vector3(0, 0, 0))
                skeleton2.setEnabled(true);
                skeleton2.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
                skeleton2.entity =
                    secs.createEntity([
                        new MeshEntity(skeleton2),
                        new AIController((Math.random() / 50) + .05),
                        new EnemyEntity()
                    ]);                    
                secs.system.ShadowSystem.add(skeleton2);
                //b.addShadowCaster(skeleton2);
                // this.enemies.push(skeleton2);

            }, this.interval);
        }, this.prestartDelay);
    }

    stop() {
        this.isSpawning = false;
        clearTimeout(this._timeout)
        clearInterval(this._t);
    }
}