import {sound} from './lib/sound';
import {models} from './scene';

class App {

    /** @type BABYLON.Scene */
    scene;
    /** @type HTMLCanvasElement */
    canvas;    
    
    /** @type BABYLON.WebXRInputSource[] */
    controllers = [];
    
    /** @type BABYLON.SpotLight */
    flashlight;

    constructor() {
                  
        this.canvas = document.querySelector("#c");
        // initialize babylon scene and engine
        this.engine = new BABYLON.Engine(this.canvas, true);       
        
        this.createScene().then(() => {            
            this.engine.runRenderLoop(() => {
                if (this.controllers) {
                    this.controllers.forEach(controller => {
                      this.handleController(controller);
                    });
                  }
                this.scene.render();
            });
        });       
    }
    triggerPressed=false;
    /**
     * 
     * @param {BABYLON.WebXRInputSource} controller 
     */
    handleController(controller){
        if(controller.inputSource.handedness == "right"){
           this.box.position.copyFrom(controller.grip.position);
           this.box.rotationQuaternion = controller.grip.rotationQuaternion;           
           if(controller.inputSource.gamepad.buttons[0].value==1 && !this.triggerPressed){
            this.triggerPressed=true;
            sound.play(4);            
           }else{
            if(controller.inputSource.gamepad.buttons[0].value<.5 && this.triggerPressed){
                this.triggerPressed=false;
            }
           }
        }else{
            this.flashlight.position.copyFrom(controller.grip.position);
            this.flashlight.direction = controller.grip.getDirection(new BABYLON.Vector3(0,-1,0));
        }
                
    }

    async createScene() {
        // create the canvas html element and attach it to the webpage

        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = BABYLON.Color4.FromHexString("#000000");
        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogColor = BABYLON.Color3.FromHexString("#000000");
        this.scene.fogDensity=.2;
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1.7, -3), this.scene);
        camera.attachControl(this.canvas, true);
        var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 4, -3), this.scene);            
        light1.diffuse = BABYLON.Color3.FromHexString("#080040");

        this.box = BABYLON.MeshBuilder.CreateBox("controller",{size:.1});

        var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
        myMaterial.diffuseTexture = new BABYLON.Texture("sprites.png", this.scene,false,true,4);
        myMaterial.diffuseTexture.hasAlpha = true;    
        myMaterial.specularColor = BABYLON.Color3.Black();    
        var s = this.scene;
        const ground = BABYLON.MeshBuilder.CreateTiledGround("ground",{xmin: -32, zmin: -32, xmax: 32, zmax: 32, subdivisions: {w:100,h:100}});
        ground.receiveShadows = true;

        var postProcess = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Reinhard, .8, camera);

        this.flashlight = new BABYLON.SpotLight("light", 
        new BABYLON.Vector3(0, 1.5, -3),
        new BABYLON.Vector3(0, -1, -0), Math.PI/3, .5, this.scene);
        this.flashlight.diffuse = new BABYLON.Color3(1, 1, 1);
        this.flashlight.specular = new BABYLON.Color3(1, 1, 1);
        this.flashlight.range = 50;
        this.flashlight.shadowEnabled = true;
        var b = new BABYLON.ShadowGenerator(1024, this.flashlight);   
        b.useBlurExponentialShadowMap = true;
        b.useKernelBlur = true;
        b.blurKernel = 64;
        
        var mat =  new BABYLON.StandardMaterial("ground");        
        var t = BABYLON.Texture.CreateFromBase64String("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqUlEQVR42k1SW1PaUBBOZ+rYVsVaUAmEYEICIRdIuBhMgAQDCN64iFKntlanfWhnfPOh/fVfs8fS6cPOnrP7nd09+33csOPC65dg6yUsL86RzryHkkvi/tMYYV2BrShwh1kUGgk0TAFKZgu8vIO260CxE+DU5jpqXhZSkceJW4Ik5lCW97GzuY1J5COKqjDbIqxyHsmNN7i/sNGa6cgIG8iXt8CZrSwGtyo0K42mWWQTFNw1/H7+ivGsguiGx95OAlZVRLMtYYtfg6Cvs3xF48E1TQlOoEDK7EJMJlmx6UxlYOpI05TcFJb9KvS4iXogMoxq7eNAEsEtpwGrRsGua0MxUshV19l91ZW8bPM4cjQMFyHLkb1LbIJbAef9Q+bTyW3mJz2dFe55KpuCLB/bYuL8zR9jj38Lji6rIv8bxahoUUyh6uXR6adwcuTBtnL/8mRc09DYISdvsgd0Psi9ZyCKyeIutMJrlqOuNBV5upv2K3Cr0Qk8HJVYYjpycXgmYBq2cLcIWIyMMPSY8LNZiNFVG1zUrb1QEghoD2sMRIDRsIxhU0EYC41itINVo+XAYwx1Lg1w44HPEhRYfYXOTz9/IKwYCAaxcBw1plJm3cnkXBaXoYn56TG4jqWibVmMX6KItkyLcqIMHm4mGHXb6J7oMJsy9Jj34EKLVSmgqvCYf5bAyQKPu/kVEwnxTFTRtnfTSYQ9FUYljYpZhW+ZaNQ19pWPp0OE7QI7c18eIxi1HFMaiYWCRBkJKFjsoeOKMBpFeGcK/MjE0/cFw/RIdJoAzj1U4DhFJlfaBSWJd+c4C8+XUbMtFgsCHZPHPo76AjL5FEaR8TLBTajh1/O3+FEG17cdPCzHMPwMzm9F9AMb/XjUUusD9Eb8xbqE68kE9Z6Eui/icuHjD2FilZlFjG/sAAAAAElFTkSuQmCC","ground", this.scene);
        t.onLoadObservable.add(() => {
            t.updateSamplingMode(BABYLON.Texture.NEAREST_SAMPLINGMODE);
        });
        mat.diffuseTexture = t;
        mat.specularColor = BABYLON.Color3.Black();
        ground.material = mat;

        // const mySpritePackedManager = 
        // new BABYLON.SpritePackedManager("spm", "sprites.png", 16, this.scene);
     
        // const sprite1 = new BABYLON.Sprite("sprite1", mySpritePackedManager);
        // sprite1.cellRef = "triangle.png"

        BABYLON.Animation.AllowMatricesInterpolation = true;
        BABYLON.SceneLoader.ImportMesh("", "", 'data:' + JSON.stringify(models), this.scene, function (meshes, particleSystems, skeletons) {

            var skeleton = skeletons[0];
            var mesh = meshes[0];            
            mesh.material = myMaterial;    
                   
            mesh.translate(BABYLON.Vector3.Up(), .8)
            meshes[1].material = myMaterial;         
            meshes[2].material = myMaterial;                   
            meshes[3].material = myMaterial;
      
            

          //  mesh.animations.push(xSlide);
            b.addShadowCaster(mesh);
            s.beginAnimation(mesh, 0, 100,true);
        
            for (let i = 0; i < 10; i++) {
                var skeleton2 = mesh.clone(`skeleton${i}`,mesh.parent);
                s.beginAnimation(skeleton2, 0, 100,true, .97 + Math.random()*.6);
                skeleton2.position.x=Math.random()*8 - 4;
                skeleton2.position.z=Math.random()*8;
                b.addShadowCaster(skeleton2);                    
            }

            for (let i = 0; i < 30; i++) {                                
                var ts = meshes[Math.floor(Math.random()*3)+1].clone(`tombstone${i}`,mesh.parent);                
                ts.position.x=Math.random()*32 - 16;
                ts.position.z=Math.random()*32;
                ts.rotation.z += Math.random()*.5 - .25;
                ts.rotation.x += Math.random()*.5 - .25;
                ts.rotation.y += Math.random()*.5 - .25;
                b.addShadowCaster(ts);      
            }
            meshes[1].visibility = 0;
            meshes[2].visibility = 0;
            meshes[3].visibility = 0;
            

            
           // mesh.rotation.x = Math.PI * .25;
            // skeleton.bones[12].setRotation(new BABYLON.Vector3(Math.PI * .25,0,0));
            //  s.registerBeforeRender(function () {
                
            //      skeleton.bones[12].rotation.x = 20 ;//.rotate(BABYLON.Axis.X, .01, BABYLON.Space.LOCAL, mesh);
            // // 	//skeleton.bones[1].rotate(BABYLON.Axis.Z, .01, BABYLON.Space.WORLD, mesh);
            // // 	//skeleton.bones[2].rotate(BABYLON.Axis.Z, .01, BABYLON.Space.WORLD, mesh);
                
            // });                        
        });
        // @ifdef DEBUG
        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show();
                }
            }
        });
        // @endif        
        const xrHelper = await this.scene.createDefaultXRExperienceAsync({
            disableNearInteraction:true,
            disablePointerSelection:true,
            disableTeleportation:true,            
            inputOptions:{                
                doNotLoadControllerMeshes:true            
            }
        });        
       
        // xrHelper.baseExperience.onStateChangedObservable.add(state => {
        //     switch (state) {
        //         case BABYLON.WebXRState.ENTERING_XR:
        //             break;
        //         case BABYLON.WebXRState.EXITING_XR:
        //             break;
        //         case BABYLON.WebXRState.IN_XR:
        //             var xrInput = new BABYLON.WebXRInput(xrHelper.sessionManager, camera, {/*options*/});
        //             console.log(xrInput);
        //             break;
        //         case BABYLON.WebXRState.NOT_IN_XR:
        //             break;
        //     }
        // });
        
        // I get a controller, but no gamepad support.
        xrHelper.input.onControllerAddedObservable.add(controller => {
            console.log('controller found', controller);
            
            this.controllers.push(controller);
            // // This part is never called:
            // controller.onMotionControllerInitObservable.add(motionController => {
            //     console.log('never called', motionController);
            //     var thumbstick = motionController.getComponent(BABYLON.WebXRControllerComponent.THUMBSTICK_TYPE);
            //     if (thumbstick) {
            //         thumbstick.onAxisValueChangedObservable.add(value => console.log('never found', value));
            //     }
            // });
        });
        xrHelper.baseExperience.onStateChangedObservable.add((eventData)=>{
            console.log(eventData);
            sound.InitAudio();  
        });
        return this.scene;
    }
}


new App();