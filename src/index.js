import { models } from './scene';
import { Spawner } from './classes/spawner';
import secs from './classes/secs';
import { InputSystem } from './classes/systems/InputSystem';
import { MeshEntity } from './classes/components/MeshEntity';
import { ControllerInput } from './classes/components/ControllerInput';
import { ShadowSystem } from './classes/systems/ShadowSystem';
import { AIController } from './classes/components/AIController';
import { CollisionCheck } from './classes/components/CollisionCheck';
import { EnemyEntity } from './classes/components/EnemyEntity';
import ambience from './lib/ambience';

const STATES = { TITLE: 1, GAME: 2, LOSE: 3, INIT: 0 };
const SPRITESTEXTURE = "data:image/webp;base64,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";
//data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMElEQVR42m2S+2+TVRzG37/BmKgTZ0CiKBI2ZkScxNt+MTHuB0CDJhjHGOEyd82cYUzoJpe2tKXs0vWyrmvpbV27ttKVtttLXdvNlsvYhpPgZYAkRI0/aPz543veJSQz/vDkeb/Pec5znnPySndX7rK8VETw4sJNHizJ/DI/w/xMnIX8JW6Xpvnt3gp/PXzAsK3vkU9A7JOE6L/oVBevZ70ql+QIt+YmmQoNsZxPMBnx88/v9ykkIizlMqpHIBoJICUjTpavfcv95SJyfISfb2SUOcvCVZl8apzUuId0PIR8KUh2cpwb+TSFdEThyyzMZZDkqJs1CNtVnk74+fuPe/z56wqxoJs787MkA3ZSIecavxSz68hFXWvEGaWJ4ELCy/VMkH6TjjtLJeSYmzHLGW7nJykm/asB/20wbtUoxiHlHQLcKiTIxXwMmA147BeYClhYTLq44tETtWj+P0Dg4co10mEnuWSIUvYyPyzOExwd5uyxNuZiDlz6DkI27WpAeMTIdMhB3GEkcXGQn76/SjGXJjXhozgV5WYhTamQY7E4y4/fJSnFrMg+I6buw4Qsp5BG9F3YTrXhNnWRCdrw28xkUxNE/RbG7Hp8lrNoe3vxOh0kw8PIEQf6ria03a24Bk8jmXs1OM06DL2dDBp6OPFFKyc724iHvLj79UrtFmZnrmA2aHFZ+1Q97B1lzO1iwjeKNGQ8R2DEhk0J8Sg/hxADTjsOs4nu1maMJ7ux9p/n80P7CQc9+N1OtF9riHiHVwPsAwZ1gxiEKELE7Ozvw3behNsyoJ4sWED+ZkxtIOB3WJGsfRceBeh6emhqaKDj6BG0J77CdOa0uiZgOXdcubOJYy2H0fccR/NlOzrFI9Xv38fO7eVqQEtjI9Xvvkzjgd20NB2ktfkgGzetU8M2b3uGI0fr2FDxFAca9vFp3Se0dzQjiY9tFVt4ccMTNB+qp7auhh016yh79nHalSZC3/7qRiorn1fnLVvLVe3jXbuofOdppJo3K6h54zleeO0xXnrlSXZUrWdPbS1Vb6+nqrqcD3ZX8+Fbm+hsr2fr62Xs2buTzz56j83VZby/t5x/AUL/xybrS2n4AAAAAElFTkSuQmCC";

class App {

    /** @type BABYLON.Scene */
    scene;
    /** @type HTMLCanvasElement */
    canvas;

    camera2;

    /** @type BABYLON.WebXRInputSource[] */
    controllers = [];
    /** @type BABYLON.SpotLight */
    flashlight;

    enemies = [];

    // Systems
    inputSystem = new InputSystem();
    shadowSystem;

    /** @type number */
    state;

    inXR = false;
    /** @type BABYLON.Node */
    titleParent;
    /** @type BABYLON.Node */
    gameOverParent;
    /** @type BABYLON.Node */
    titleNotVRParent;
    /** @type BABYLON.Node */
    controllerParent;
    /** @type BABYLON.Node */
    scoreScreen
    /** @type BABYLON.Mesh */
    scorePlane 
    /** @type BABYLON.Node */
    enemyParent;
    /** @type BABYLON.PointLight */
    light;

    /** @type number */
    score;

    constructor() {

        this.canvas = document.querySelector("#c");
        // initialize babylon scene and engine
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.createScene().then(() => {
            if (!this.systemsRegistered) {
                secs.registerSystems([
                    this.inputSystem,
                    this.shadowSystem
                ]);
                this.systemsRegistered = true;
            }
            //  this.changeState(STATES.GAME).then(() => { });

            //secs.match(ShadowSystem).map(e=>this.shadow.add(e));
            this.engine.runRenderLoop(() => {
                let dt = this.engine.getDeltaTime();
                secs.match(ControllerInput).map(e => this.inputSystem.controllers(e, dt));
                switch (this.state) {
                    case STATES.GAME:

                        secs.match(AIController).map(e => e.get(AIController).update(dt, e));
                        //secs.match(Motion).map(this.physics.move.bind(this.physics, delta));                                                                                               
                        break;
                    case STATES.TITLE:
                        break;
                    case STATES.LOSE:
                        break;
                }
                this.scene.render();

            });
        });
    }

    async changeState(newState) {
        this.state = newState;
        switch (newState) {
            case STATES.GAME:                
                this.score = 0;                                
                this.scoreScreen.setEnabled(false);
                this.titleParent.setEnabled(false);
                this.gameOverParent.setEnabled(false);
                this.titleNotVRParent.setEnabled(false);
                this.spawner.start();
                this.spawner2.start();
                this.spawner3.start();
                break;
            case STATES.TITLE:
                this.scoreScreen.setEnabled(false);
                this.titleParent.setEnabled(this.inXR);
                this.titleNotVRParent.setEnabled(!this.inXR);
                this.spawner?.stop();
                this.spawner2?.stop();
                this.spawner3?.stop();
                break;
            case STATES.LOSE:
                // remove all skeletons.
                this.spawner.stop();
                this.spawner2.stop();
                this.spawner3.stop();
                setTimeout(() => {
                    secs.match(EnemyEntity).forEach(e => e.kill());
                    this.enemyParent.getChildren().forEach(e => e.dispose());
                }, 200);
                this.gameOverParent.setEnabled(true);                
                this.showScore();
                this.scoreScreen.setEnabled(true);
                break;
        }

    }
    showScore() {


        const scoreTexture = new BABYLON.DynamicTexture("dynamic texture Score", { width: 1200/5, height: 100/5 });        
        const pressTriggerMaterial = new BABYLON.StandardMaterial("ScoreMat");
        scoreTexture.updateSamplingMode(BABYLON.Texture.NEAREST_SAMPLINGMODE);

        pressTriggerMaterial.diffuseTexture = scoreTexture;
        pressTriggerMaterial.emissiveTexture = scoreTexture;
        pressTriggerMaterial.specularColor = BABYLON.Color3.Black();
        this.scorePlane.material = pressTriggerMaterial;
        const font = "bold 18px monospace";

        scoreTexture.drawText(
            `${this.score} skeletons killed!`, 18, 18, font, "#c0a48c", "rgba(0,0,0,0)", true, true);

        scoreTexture.hasAlpha = true;

    }

    gotTrigger() {
        if (this.state !== 2) {
            this.changeState(2);
        }
    }

    triggerPressed = false;

    async createTitleScene() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = BABYLON.Color4.FromHexString("#000000");
    }



    async createScene() {
        // create the canvas html element and attach it to the webpage

        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = BABYLON.Color4.FromHexString("#000000");
        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogColor = BABYLON.Color3.FromHexString("#000000");
        this.scene.fogDensity = .2;

        this.nonVRCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1.7, -3));;
        this.camera = this.nonVRCamera;
        //this.camera.attachControl(this.canvas, true);
        this.enemyParent = new BABYLON.Node("enemyParent");

        this.camCollider = BABYLON.CreateSphere("camCollider", { diameter: .5 });

        this.light = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 4, -3), this.scene);
        this.light.diffuse = BABYLON.Color3.FromHexString("#8080FF");
        //light1.diffuse = BABYLON.Color3.FromHexString("#888888");
        this.controllerParent = new BABYLON.Node("controllerParent");
        const batShape = [
            new BABYLON.Vector3(.025, -0.1),
            new BABYLON.Vector3(.025, -0.09, 0),
            new BABYLON.Vector3(.013, -0.08, 0),
            new BABYLON.Vector3(.03, 0.54, 0),
            new BABYLON.Vector3(.031, 0.73, 0),
            new BABYLON.Vector3(.01, 0.74, 0),
        ];

        this.spriteMaterial = new BABYLON.StandardMaterial("spriteMaterial", this.scene);
        const texture = BABYLON.Texture.CreateFromBase64String(SPRITESTEXTURE, "SpritesTexture", this.scene, false, true, 4);
        this.spriteMaterial.diffuseTexture = texture;
        //this.spriteMaterial.diffuseTexture = new BABYLON.Texture("sprites.png", this.scene, false, true, 4);

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
        this.bat.parent = this.controllerParent;
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
            new MeshEntity(this.bat),
            new CollisionCheck(this.ray)
        ]);

        this.flashlight = new BABYLON.SpotLight("light",
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 1, 0), Math.PI / 3, .5, this.scene);
        this.flashlight.diffuse = new BABYLON.Color3(1, 1, 1);
        this.flashlight.specular = new BABYLON.Color3(1, 1, 1);
        this.flashlight.range = 50;
        this.flashlight.shadowEnabled = true;

        this.shadowSystem = new ShadowSystem(this.flashlight);

        var flashlightMesh = BABYLON.CreateCylinder("flashlight", { height: .15, diameterTop: .03, diameterBottom: .02 })
        this.flashlight.parent = flashlightMesh;
        flashlightMesh.parent = this.controllerParent;

        secs.createEntity([
            new ControllerInput("left"),
            new MeshEntity(flashlightMesh)
        ]);

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

        this.titleNotVRParent = await this.createTitle("DEATHKEEPER", false);
        this.titleParent = await this.createTitle("DEATHKEEPER", true);
        this.gameOverParent = await this.createTitle(" GAME OVER", true);

        this.scoreScreen = new BABYLON.Node("scoreScreen", this.scene);
        this.scorePlane = BABYLON.MeshBuilder.CreatePlane("scoreScreen", { width: 3, height: .25 });
        this.scorePlane.parent = this.scoreScreen;
        this.shadowSystem.add(this.scorePlane);
        this.scorePlane.position = new BABYLON.Vector3(0, 1.25, 1.5);

        await this.changeState(1);

        BABYLON.Animation.AllowMatricesInterpolation = true;
        BABYLON.SceneLoader.ImportMesh("", "", 'data:' + JSON.stringify(models),
            this.scene, (meshes, particleSystems, skel, animgr) => {
                console.log(animgr);
                var skeleton = meshes[0];
                skeleton.material = this.spriteMaterial;
                skeleton.translate(BABYLON.Vector3.Up(), .8)
                skeleton.receiveShadows = true;
                this.enemies.push(skeleton);

                this.spawner = new Spawner(s, skeleton, new BABYLON.Vector3(0, 0, 10), 7000);
                //  this.spawner.start();

                this.spawner2 = new Spawner(s, skeleton, new BABYLON.Vector3(6, 0, 12), 5000, 13500);
                // this.spawner2.start();

                this.spawner3 = new Spawner(s, skeleton, new BABYLON.Vector3(-6, 0, 13), 4000, 9250);
                //  this.spawner3.start();

                meshes[1].material = this.spriteMaterial;
                meshes[1].receiveShadows = true;
                meshes[2].material = this.spriteMaterial;
                meshes[2].receiveShadows = true;
                meshes[3].material = this.spriteMaterial;
                meshes[3].receiveShadows = true;
                meshes[4].material = this.spriteMaterial;
                meshes[4].receiveShadows = true;

                //  mesh.animations.push(xSlide);
                //    b.addShadowCaster(mesh);
                s.beginAnimation(skeleton, 0, 100, true);                

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
                    var w = meshes[4].createInstance(`wall${i}`);
                    w.rotate(new BABYLON.Vector3(0, 0, 1), -Math.PI / 2);
                    w.position.z = i * .64 - 3.2 - 2;

                }

                for (let i = 0; i < 10; i++) {
                    var w = meshes[4].createInstance(`wall${i + 10}`);
                    w.rotate(new BABYLON.Vector3(0, 0, 1), Math.PI / 2);
                    w.position.z = i * .64 - 3.2 - 2;
                    w.position.x += 7

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


        // var postProcess = new BABYLON.PostProcess("Down sample", "./postfx", ["screenSize", "highlightThreshold"], null, 0.25, camera);

        xrHelper.baseExperience.onStateChangedObservable.add(state => {

            switch (state) {
                case BABYLON.WebXRState.IN_XR:
                    this.inXR = true;
                    this.changeState(STATES.TITLE);
                    ambience.start();
                    this.camera = xrHelper.baseExperience.camera.leftCamera;
                    xrHelper.baseExperience.camera.position = new BABYLON.Vector3(0, 1.7, 0);
                    const postProcessTonemapL = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Reinhard, 1.2, this.camera);
                    const postProcessTonemapR = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Reinhard, 1.2, xrHelper.baseExperience.camera.rightCamera);
                    this.camCollider.parent = this.camera;
                    this.light.diffuse = BABYLON.Color3.FromHexString("#080040");
                    this.controllerParent.setEnabled(true);
                    break;
                case BABYLON.WebXRState.NOT_IN_XR:
                    this.inXR = false;
                    this.changeState(STATES.TITLE);
                    ambience.pause();
                    this.controllerParent.setEnabled(false);
                    this.camera = this.nonVRCamera;
                    this.light.diffuse = BABYLON.Color3.FromHexString("#8080FF");
                    break;
                case BABYLON.WebXRState.EXITING_XR:
                case BABYLON.WebXRState.ENTERING_XR:
                    break;
            }
        });

        xrHelper.input.onControllerAddedObservable.add(controller => {
            this.inputSystem.xrControllers.push(controller);
        });
        return this.scene;
    }

    createTitle(titleText, xr) {
        var titlescreen = new BABYLON.Node("titleParent" + titleText, this.scene);

        const pressTrigger = BABYLON.MeshBuilder.CreatePlane("PressTrigger" + titleText, { width: 3, height: .75 });
        pressTrigger.parent = titlescreen;
        pressTrigger.position = new BABYLON.Vector3(0, 1.75, 2);
        this.shadowSystem.add(pressTrigger);
        const pressTriggerTexture = new BABYLON.DynamicTexture("dynamic texture" + titleText, { width: 1200, height: 300 });
        const textureContext = pressTriggerTexture.getContext();
        const pressTriggerMaterial = new BABYLON.StandardMaterial("Mat" + titleText);
        pressTriggerMaterial.diffuseTexture = pressTriggerTexture;
        pressTriggerMaterial.emissiveTexture = pressTriggerTexture;
        pressTriggerMaterial.specularColor = BABYLON.Color3.Black();
        pressTrigger.material = pressTriggerMaterial;
        const font = "bold 44px monospace";

        pressTriggerTexture.drawText(
            xr ? "Press trigger to start" : " Switch to VR to play", 300, 215, font, "#7c8898", "rgba(0,0,0,0)", true, true);

        pressTriggerTexture.hasAlpha = true;

        /** @type HTMLCanvasElement */
        const canvas = document.createElement("Canvas");
        canvas.width = 2048
        const ctx = canvas.getContext("2d");

        /** @type HTMLCanvasElement */
        const spritecanvas = document.createElement("Canvas");

        const spritectx = spritecanvas.getContext("2d");

        this.spriteMaterial.diffuseTexture.getInternalTexture();
        const image = new Image();
        return new Promise((res) => {
            image.onload = () => {
                spritectx.drawImage(image, 0, 0);

                ctx.font = "150px 'Montserrat', Arial, sans-serif";


                ctx.strokeStyle = '#222';
                ctx.lineWidth = 12;
                ctx.strokeText(titleText, 20, 128);

                ctx.fillStyle = "#FFF";
                ctx.fillText(titleText, 25, 123);
                ctx.shadowColor = '#888';
                ctx.shadowBlur = 6;
                ctx.shadowOffsetX = -2;
                ctx.shadowOffsetY = 3;
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#FFF';
                ctx.strokeText(titleText, 25, 123);

                for (let j = 0; j < 300; j += 8) {
                    for (let i = 0; i < 1200; i += 8) {
                        const d = ctx.getImageData(i, j, 1, 1);
                        const r = Math.floor(d.data[0] / 16);
                        if (r != 0) {
                            const s = spritectx.getImageData(Math.floor(Math.random() * 16) + 48, 17 - r, 1, 1);
                            textureContext.fillStyle = `rgb(${s.data[0]},${s.data[1]},${s.data[2]})`
                        } else {
                            textureContext.fillStyle = `rgba(0,0,0,0)`
                        }
                        textureContext.fillRect(i, j, 8, 8)
                    }
                }
                pressTriggerTexture.update();
                titlescreen.setEnabled(false);
                res(titlescreen);
            };
            image.src = SPRITESTEXTURE;
        });
    }
}

window.app = new App();