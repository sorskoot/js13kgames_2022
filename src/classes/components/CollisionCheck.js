import secs from "../secs";
import { EnemyEntity } from "./EnemyEntity";
import { MeshEntity } from "./MeshEntity";

export class CollisionCheck{
        constructor(ray){
            this.ray=ray;
        }
        check(){
            var enemies = secs.match(EnemyEntity).map(e=>e.get(MeshEntity).mesh);
            var hitInfo = this.ray.intersectsMeshes(enemies);
            if (hitInfo.length) {
                hitInfo[0].pickedMesh.setEnabled(false);
                //this.bat.setEnabled(false);
            } else {
                //this.bat.setEnabled(true);
            } 
        }
}