import { ControllerInput } from "../components/ControllerInput";
import { MeshEntity } from "../components/MeshEntity";
import { Position } from "../components/Position";
import { Entity } from "../secs";

export class InputSystem {
    xrControllers = [];

    controllers(entity) {
        if (this.xrControllers) {
            this.xrControllers.forEach(controller => {
                this.handleController(entity, controller);
            });
        }
    };

    /**
     * @param {Entity} entity;
     * @param {BABYLON.WebXRInputSource} controller
     */
    handleController(entity, controller) {
        var inputEntity = entity.get(ControllerInput);
        if (controller.inputSource.handedness == inputEntity.handedness) {

            var mesh = entity.get(MeshEntity).mesh;
            mesh.position.copyFrom(controller.grip.position);
            mesh.rotationQuaternion = controller.grip.rotationQuaternion;
            mesh.rotate(BABYLON.Vector3.Right(), Math.PI / 2);
            
            // if (controller.inputSource.gamepad.buttons[0].value == 1 && !this.triggerPressed) {
            //     this.triggerPressed = true;
            //     sound.play(4);
            // } else {
            //     if (controller.inputSource.gamepad.buttons[0].value < .5 && this.triggerPressed) {
            //         this.triggerPressed = false;
            //     }
            // }

            // var hitInfo = this.ray.intersectsMeshes(this.enemies);
            // if (hitInfo.length) {
            //     hitInfo[0].pickedMesh.setEnabled(false);
            //     //this.bat.setEnabled(false);
            // } else {
            //     //this.bat.setEnabled(true);
            //}            
        }
    }
}
