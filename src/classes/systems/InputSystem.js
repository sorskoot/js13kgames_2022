import { CollisionCheck } from "../components/CollisionCheck";
import { ControllerInput } from "../components/ControllerInput";
import { MeshEntity } from "../components/MeshEntity";
import { Entity } from "../secs";

/** @typedef MotionData 
 * @property {number} speed
 * @property {BABYLON.Vector3} direction
*/
export class InputSystem {
    
    xrControllers = [];    
    lastPosition = {};
    data = {};

    controllers(entity,dt) {
        if (this.xrControllers) {
            this.xrControllers.forEach(controller => {
                this.handleController(entity, controller);
                this.trackDirection(entity, controller, dt);
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
            var colCheck = entity.get(CollisionCheck);
            if (colCheck) {
                colCheck.check(this.data[inputEntity.handedness]);
            }
            if (controller.inputSource.gamepad.buttons[0].value == 1 && !this.triggerPressed) {
                this.triggerPressed = true;
                window.app.gotTrigger();
            } else {
                if (controller.inputSource.gamepad.buttons[0].value < .5 && this.triggerPressed) {
                    this.triggerPressed = false;
                }
            }
        }


    }

    trackDirection(entity, controller, deltaTime) {
        var inputEntity = entity.get(ControllerInput);
        if (controller.inputSource.handedness == inputEntity.handedness) {
            if (this.lastPosition[inputEntity.handedness]) {
                //distance since last frame                    
                var distance =
                    BABYLON.Vector3.Distance(this.lastPosition[inputEntity.handedness], controller.grip.position);
                    
                //direction since last frame
                var direction =
                    controller.grip.position.subtract(this.lastPosition[inputEntity.handedness]).normalize();
                var speed = distance / deltaTime;
                this.data[inputEntity.handedness] = {
                    speed: speed,
                    direction: direction                    
                }
                this.lastPosition[inputEntity.handedness].copyFrom(controller.grip.position);
            }else{
                this.lastPosition[inputEntity.handedness] = new BABYLON.Vector3(0,0,0);
            }
            

            
        }
    }
}
