class Spawner {

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
                /** @type Grave[] */
                let graveEntities = secs.match(Grave).map(e => e.get(Grave));
                let graves = graveEntities.filter(g => g.occupied);

                if(graves.length == 0) {
                      this.stop();
                      window.app.nextLevel();
                      return  
                }

                let grave = graves[Math.floor(Math.random() * graves.length)];
                if (grave) {
                    grave.occupied = false;
                    var skeleton2 = this.basemesh.createInstance(`skeleton${+ new Date()}`);
                    skeleton2.parent = window.app.enemyParent;                    
                    let riseAnim = skeleton2.getAnimationByName("Rise");
                    let walkAnim = skeleton2.getAnimationByName("Walk");
                    this.scene.beginDirectAnimation(skeleton2, [riseAnim], 0, 100, false);
                    setTimeout(() => {
                        this.scene.beginDirectAnimation(skeleton2, [walkAnim], 0, 100, true, .97 + Math.random() * .6)
                    }, 500);

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
            }, this.interval);
        }, this.prestartDelay);
    }

    stop() {
        this.isSpawning = false;
        clearTimeout(this._timeout)
        clearInterval(this._t);
    }
}