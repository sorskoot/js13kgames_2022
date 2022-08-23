import { sound } from './lib/sound';
import { models } from './scene';
import { Spawner } from './classes/spawner';
import secs from './classes/secs';
import { InputSystem } from './classes/systems/InputSystem';
import { MeshEntity } from './classes/components/MeshEntity';
import { ControllerInput } from './classes/components/ControllerInput';
import { ShadowSystem } from './classes/systems/ShadowSystem';
import { ShadowCaster } from './classes/components/ShadowCaster';
import { Position } from './classes/components/Position';
import { AIController } from './classes/components/AIController';

class App {
    /** @type BABYLON.Scene */
    scene;
    /** @type HTMLCanvasElement */
    canvas;
    /** @type BABYLON.WebXRInputSource[] */
    controllers = [];
    /** @type BABYLON.SpotLight */
    flashlight;

    enemies = [];
    
    // Systems
    inputSystem = new InputSystem();
    shadowSystem;

    constructor() {
        
        this.canvas = document.querySelector("#c");
        // initialize babylon scene and engine
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.createScene().then(() => {
            secs.registerSystems([
                this.inputSystem,
                this.shadowSystem
            ]);

            //secs.match(ShadowSystem).map(e=>this.shadow.add(e));
            this.engine.runRenderLoop(() => {
                let dt = this.engine.getDeltaTime();
                secs.match(ControllerInput).map(e=>this.inputSystem.controllers(e));
                secs.match(AIController).map(e=>e.get(AIController).update(dt,e));
                //secs.match(Motion).map(this.physics.move.bind(this.physics, delta));
                this.scene.render();
            });
        });
    }

    triggerPressed = false;


    async createScene() {
        // create the canvas html element and attach it to the webpage

        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = BABYLON.Color4.FromHexString("#000000");
        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogColor = BABYLON.Color3.FromHexString("#000000");
        this.scene.fogDensity = .2;

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(this.canvas, true);

        var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 4, -3), this.scene);
        //light1.diffuse = BABYLON.Color3.FromHexString("#080040");
        light1.diffuse = BABYLON.Color3.FromHexString("#888888");

        const batShape = [
            new BABYLON.Vector3(.025, -0.1),
            new BABYLON.Vector3(.025, -0.09, 0),
            new BABYLON.Vector3(.013, -0.08, 0),
            new BABYLON.Vector3(.03, 0.54, 0),
            new BABYLON.Vector3(.031, 0.73, 0),
            new BABYLON.Vector3(.01, 0.74, 0),
        ];

        this.spriteMaterial = new BABYLON.StandardMaterial("spriteMaterial", this.scene);
        this.spriteMaterial.diffuseTexture = new BABYLON.Texture("sprites.png", this.scene, false, true, 4);
        this.spriteMaterial.diffuseTexture.hasAlpha = true;
        this.spriteMaterial.specularColor = BABYLON.Color3.Black();
        var s = this.scene;
        const ground = BABYLON.MeshBuilder.CreateTiledGround("ground", { xmin: -16, zmin: -16, xmax: 16, zmax: 16, subdivisions: { w: 1, h: 1 } });
        
        ground.receiveShadows = true;

        //Create Baseball bat
        this.bat = BABYLON.MeshBuilder.CreateLathe("bat", {
            shape: batShape, cap: 3, tessellation: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            frontUVs: new BABYLON.Vector4(0.4375, 0, 0.5, 0.375)
        });
        this.bat.material = this.spriteMaterial;
        this.ray = new BABYLON.Ray(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 1, 0));
        var rayHelper = new BABYLON.RayHelper(this.ray);

        var localMeshDirection = new BABYLON.Vector3(0, 1, 0);
        var localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
        var length = 1;

        rayHelper.attachToMesh(this.bat, localMeshDirection, localMeshOrigin, length);
        // rayHelper.show(this.scene);

        //Create bat Entity
        secs.createEntity([
            new ControllerInput("right"),
            new MeshEntity(this.bat)
        ]);                               

        this.flashlight = new BABYLON.SpotLight("light",
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 1, 0), Math.PI / 3, .5, this.scene);
        this.flashlight.diffuse = new BABYLON.Color3(1, 1, 1);
        this.flashlight.specular = new BABYLON.Color3(1, 1, 1);
        this.flashlight.range = 50;
        this.flashlight.shadowEnabled = true;       
        
        this.shadowSystem = new ShadowSystem(this.flashlight);

        var flashlightMesh = BABYLON.CreateCylinder("flashlight",{height:.15, diameterTop:.03, diameterBottom:.02}) 
        this.flashlight.parent = flashlightMesh;
        secs.createEntity([
            new ControllerInput("left"),
            new MeshEntity(flashlightMesh)
        ]);

        // b.useBlurExponentialShadowMap = true;
        //    b.useKernelBlur = true;
        //   b.blurKernel = 64;

        var mat = new BABYLON.StandardMaterial("ground");
        
        var t = BABYLON.Texture.CreateFromBase64String("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqUlEQVR42k1SW1PaUBBOZ+rYVsVaUAmEYEICIRdIuBhMgAQDCN64iFKntlanfWhnfPOh/fVfs8fS6cPOnrP7nd09+33csOPC65dg6yUsL86RzryHkkvi/tMYYV2BrShwh1kUGgk0TAFKZgu8vIO260CxE+DU5jpqXhZSkceJW4Ik5lCW97GzuY1J5COKqjDbIqxyHsmNN7i/sNGa6cgIG8iXt8CZrSwGtyo0K42mWWQTFNw1/H7+ivGsguiGx95OAlZVRLMtYYtfg6Cvs3xF48E1TQlOoEDK7EJMJlmx6UxlYOpI05TcFJb9KvS4iXogMoxq7eNAEsEtpwGrRsGua0MxUshV19l91ZW8bPM4cjQMFyHLkb1LbIJbAef9Q+bTyW3mJz2dFe55KpuCLB/bYuL8zR9jj38Lji6rIv8bxahoUUyh6uXR6adwcuTBtnL/8mRc09DYISdvsgd0Psi9ZyCKyeIutMJrlqOuNBV5upv2K3Cr0Qk8HJVYYjpycXgmYBq2cLcIWIyMMPSY8LNZiNFVG1zUrb1QEghoD2sMRIDRsIxhU0EYC41itINVo+XAYwx1Lg1w44HPEhRYfYXOTz9/IKwYCAaxcBw1plJm3cnkXBaXoYn56TG4jqWibVmMX6KItkyLcqIMHm4mGHXb6J7oMJsy9Jj34EKLVSmgqvCYf5bAyQKPu/kVEwnxTFTRtnfTSYQ9FUYljYpZhW+ZaNQ19pWPp0OE7QI7c18eIxi1HFMaiYWCRBkJKFjsoeOKMBpFeGcK/MjE0/cFw/RIdJoAzj1U4DhFJlfaBSWJd+c4C8+XUbMtFgsCHZPHPo76AjL5FEaR8TLBTajh1/O3+FEG17cdPCzHMPwMzm9F9AMb/XjUUusD9Eb8xbqE68kE9Z6Eui/icuHjD2FilZlFjG/sAAAAAElFTkSuQmCC", "ground", this.scene);
        t.onLoadObservable.add(() => {
            t.updateSamplingMode(BABYLON.Texture.NEAREST_SAMPLINGMODE);
        });

        t.uScale = 50;
        t.vScale = 50;
        mat.diffuseTexture = t;
        mat.specularColor = BABYLON.Color3.Black();
        ground.material = mat;

        BABYLON.Animation.AllowMatricesInterpolation = true;
        BABYLON.SceneLoader.ImportMesh("", "", 'data:' + JSON.stringify(models),
            this.scene, (meshes, particleSystems) => {
                
                var mesh = meshes[0];
                mesh.material = this.spriteMaterial;
                
                mesh.translate(BABYLON.Vector3.Up(), .8)
                this.enemies.push(mesh);

                this.spawner = new Spawner(s,
                    mesh, new BABYLON.Vector3(0, 0, 10), 2000);
                this.spawner.start();

                meshes[1].material = this.spriteMaterial;
                meshes[2].material = this.spriteMaterial;
                meshes[3].material = this.spriteMaterial;

                meshes[4].material = this.spriteMaterial;


                //  mesh.animations.push(xSlide);
            //    b.addShadowCaster(mesh);
                s.beginAnimation(mesh, 0, 100, true);


                for (let i = 0; i < 100; i++) {
                    var ts = meshes[Math.floor(Math.random() * 3) + 1].createInstance(`tombstone${i}`);
                    ts.position.x = Math.random() * 32 - 16;
                    ts.position.z = Math.random() * 32;
                    ts.rotation.z += Math.random() * .5 - .25;
                    ts.rotation.x += Math.random() * .5 - .25;
                    ts.rotation.y += Math.random() * .5 - .25;
                    this.shadowSystem.add(ts);
                    secs.createEntity([
                        new MeshEntity(ts)                   
                    ]);
                }


                for (let i = 0; i < 10; i++) {
                    var w = meshes[4].clone('wall', mesh.parent);
                    w.rotate(new BABYLON.Vector3(0, 0, 1), -Math.PI / 2);
                    w.position.z = i * .64 - 3.2;
                    w.receiveShadows = true;
                }

                for (let i = 0; i < 10; i++) {
                    var w = meshes[4].clone('wall', mesh.parent);
                    w.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI / 2);
                    w.position.z = i * .64 - 3.2;
                    w.position.x += 7
                    w.receiveShadows = true;
                }

                meshes[1].setEnabled(false)
                meshes[2].setEnabled(false);
                meshes[3].setEnabled(false);
                meshes[4].setEnabled(false);
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
            disableNearInteraction: true,
            disablePointerSelection: true,
            disableTeleportation: true,                        
            inputOptions: {
                doNotLoadControllerMeshes: true
            }
        });
        //var postProcessTonemap = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Reinhard, .2, camera);
        
       // var postProcess = new BABYLON.PostProcess("Down sample", "./postfx", ["screenSize", "highlightThreshold"], null, 0.25, camera);
        
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

        xrHelper.input.onControllerAddedObservable.add(controller => {
            this.inputSystem.xrControllers.push(controller);
        });
        xrHelper.baseExperience.onStateChangedObservable.add((eventData) => {
            console.log(eventData);
            sound.InitAudio();
        });
        return this.scene;
    }
}


new App();