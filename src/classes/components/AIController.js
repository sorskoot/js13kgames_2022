import { NodeMaterialConnectionPointCustomObject } from "babylonjs";
import { MeshEntity } from "./MeshEntity";

export class AIController {
    update(deltaTime, entity){
        let mesh = entity.get(MeshEntity).mesh;
        mesh.position.z -= .1 / deltaTime;
    }
}
