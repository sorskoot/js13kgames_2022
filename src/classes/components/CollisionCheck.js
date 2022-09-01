class CollisionCheck{
        
        /**
         * Instantiates a new Collision check component
         * @param {BABYLON.Ray} ray 
         */
        constructor(ray){            
            this.ray=ray;
        }

        /**
        * @param {import("../systems/InputSystem").MotionData} data
        */
        check(data){
            var enemyEntities = secs.match(EnemyEntity).map(e=>e.get(MeshEntity));
            var enemies = enemyEntities.map(e=>e.mesh);
            var hitInfo = this.ray.intersectsMeshes(enemies);
            if (hitInfo.length) {
                // find picked enemy in list of enemies
                // var enemy = enemyEntities.find(e=>e.mesh==hitInfo[0].pickedMesh);                
                // if(enemy){
                //     var enemyEntity = secs.entitiesToComponents.findIndex(e=>e.MeshEntity === enemy);                
                //     secs.entities[enemyEntity].kill();    
                // }
                hitInfo[0].pickedMesh.entity.kill();
                hitInfo[0].pickedMesh.dispose();
                sfx.play(0);
               //sound.play(0);
                window.app.score++;
                //TODO: figure out a way to remove the entity as well
                const particleSystem = BABYLON.ParticleHelper.CreateDefault(
                    hitInfo[0].pickedPoint, 500);
                    
                //particleSystem.createDirectedSphereEmitter(1, BABYLON.Vector3.Left(), BABYLON.Vector3.Up())
                particleSystem.createDirectedCylinderEmitter(.32,.64, 1, 
                    new BABYLON.Vector3(data.direction.x * .5, data.direction.y * .5, data.direction.z * .5),
                    new BABYLON.Vector3(data.direction.x * 1.5, data.direction.y * 1.5, data.direction.z * 1.5));                    
                
                const dt = new BABYLON.DynamicTexture("name",{width:5, height:5});    
                var ctx = dt.getContext();
                ctx.fillStyle = "#fff";
                ctx.fillRect(0,0,5,5);
                dt.update();
                particleSystem.particleTexture = dt;     
                
                particleSystem.emitRate = 2500;
                particleSystem.targetStopDuration = 0.1;
                particleSystem.disposeOnStop = true;
                
                particleSystem.minEmitPower = .1;
                particleSystem.maxEmitPower = data.speed*1000 * 4;

                particleSystem.color1 = BABYLON.Color4.FromHexString("#d2d1b4");
                particleSystem.color2 = BABYLON.Color4.FromHexString("#acb38c");
                particleSystem.colorDead = BABYLON.Color4.FromHexString("#41452e");                
                particleSystem.minSize = (1/16) / 2;
                particleSystem.maxSize = (1/16);            
                particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
                particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
                // Position where the particles are emitted from
                
                particleSystem.start();
          
            }  
        }
}