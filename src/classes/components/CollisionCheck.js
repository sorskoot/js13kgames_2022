import { sound } from "../../lib/sound";
import secs from "../secs";
import { EnemyEntity } from "./EnemyEntity";
import { MeshEntity } from "./MeshEntity";

export class CollisionCheck{
        
        /**
         * Instantiates a new Collision check component
         * @param {BABYLON.Ray} ray 
         */
        constructor(ray){            
            this.ray=ray;
        }
        check(){
            var enemies = secs.match(EnemyEntity).map(e=>e.get(MeshEntity).mesh);
            var hitInfo = this.ray.intersectsMeshes(enemies);
            if (hitInfo.length) {
                hitInfo[0].pickedMesh.dispose();
                sound.play(0);

                //TODO: figure out a way to remove the entity as well
                const particleSystem = BABYLON.ParticleHelper.CreateDefault(
                    hitInfo[0].pickedPoint, 500);
                    
                //particleSystem.createDirectedSphereEmitter(1, BABYLON.Vector3.Left(), BABYLON.Vector3.Up())
                particleSystem.createSphereEmitter(.32,1);
                
                const dt = new BABYLON.DynamicTexture("name",{width:5, height:5});    
                var ctx = dt.getContext();
                ctx.fillStyle = "#fff";
                ctx.fillRect(0,0,5,5);
                dt.update();
                particleSystem.particleTexture = dt;     
                
                particleSystem.emitRate = 500;
                particleSystem.targetStopDuration = 0.1;
                particleSystem.disposeOnStop = true;
                
                particleSystem.color1 = BABYLON.Color4.FromHexString("#d2d1b4");
                particleSystem.color2 = BABYLON.Color4.FromHexString("#acb38c");
                particleSystem.colorDead = BABYLON.Color4.FromHexString("#41452e");                
                particleSystem.minSize = (1/16) / 2;
                particleSystem.maxSize = (1/16);            
                particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
                particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
                // Position where the particles are emitted from
                
                particleSystem.start();
                

                //this.bat.setEnabled(false);
            } else {
                //this.bat.setEnabled(true);
            } 
        }
}