var BV3 = BABYLON.Vector3;
const maps = [
    `0II03 !3!!3"!3#!3$!3%!3&!3'!3(!3)!3*!3+!3,!3-!3.!3/!30!31!32!33!2 !2!!2"!2#!2$!2%!2&!2'!2(!2)!2*!2-!2.!2/!20!21!22!23!43!42!41!40!4/!4.!4-!4,!4+!4*!4)!4'!4&!4"!4!!4 !1+!24!25!26!36!46!45!44!34!35!16!17!07!29!58!.*!-*!7%!,1",2",3",4",5",6",7",8",9":1#:2#:3#:4#:5#:6#:7#:8#:9#,0":0#27!28!39!38!48!47!37!09!1;!4=!6:!->$.>$/>$0>$1>$2>$3>$4>$5>$6>$7>$8>$9>$,:",;",<",="::#:;#:<#:=#,>":>#.(&+(&0&&.&&+&&0$&.$&,$&7$&;$&8&&9&&;&&6(&7(&9(&:(&8*&6,&8-&/.&**&'%&-!&9!&;+&6&&2,!1,!0,!/,!.,!-,!,,!5'!6'!7'!8'!9'!:'!;'!<'!='!>'!?'!+,!*,!),!(,!9$&/(&5"&`,
];
//const STATES = { TITLE: 1, GAME: 2, LOSE: 3, INIT: 0 };
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

    /** @type CanvasRenderingContext2D */
    spritectx;

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
                    case 2:

                        secs.match(AIController).map(e => e.get(AIController).update(dt, e));
                        //secs.match(Motion).map(this.physics.move.bind(this.physics, delta));                                                                                               
                        break;
                    case 1:
                        break;
                    case 3:
                        break;
                }
                this.scene.render();

            });
        });
    }
   
    loadLevel(b) {
        let d = {}; 
        d.t = b.codePointAt(0) - 32; 
        d.w = b.codePointAt(1) - 32; 
        d.h = b.codePointAt(2) - 32; 
        d.z = +b[3]; 
        d.m = []; 
        d.M = []; 
        for (let i = 4; i < b.length; i += 3)
            d.m.push([b.codePointAt(i) - 32, b.codePointAt(i + 1) - 32, b.codePointAt(i + 2) - 32]); 
        return d;
    }

    async changeState(newState) {
        this.state = newState;
        switch (newState) {
            case 2:
                this.score = 0;
                this.scoreScreen.setEnabled(false);
                this.titleParent.setEnabled(false);
                this.gameOverParent.setEnabled(false);
                this.titleNotVRParent.setEnabled(false);
                this.spawner.start();
                break;
            case 1:
                this.scoreScreen.setEnabled(false);
                this.titleParent.setEnabled(this.inXR);
                this.titleNotVRParent.setEnabled(!this.inXR);
                this.spawner?.stop();
                break;
            case 3:
                // remove all skeletons.
                this.spawner.stop();                
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


        const scoreTexture = new BABYLON.DynamicTexture("dynamic texture Score", { width: 1200 / 5, height: 100 / 5 });
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

    createCanvasTexture() {
        
        const spritecanvas = document.createElement("Canvas");
        this.spritectx = spritecanvas.getContext("2d");
        this.spriteMaterial.diffuseTexture.getInternalTexture();
        const image = new Image();
        return new Promise(res => {
            image.onload = () => {
                this.spritectx.drawImage(image, 0, 0);
                console.log("Created spriteMaterial");
                res();
            }
            image.src = SPRITESTEXTURE;
        })

    }

    createMesh(name, positions, indices, uvs, scale = [1, 1, 1]) {
        let mesh = new BABYLON.Mesh(name);
        let normals = [];
        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.uvs = uvs;
        vertexData.normals = normals;
        vertexData.applyToMesh(mesh);
        mesh.material = this.spriteMaterial;
        mesh.receiveShadows = true;
        mesh.scaling = BV3.FromArray(scale);
        mesh.setEnabled(false);
        return mesh;
    }

    async createScene() {
        // create the canvas html element and attach it to the webpage

        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = BABYLON.Color4.FromHexString("#040010");
        this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogColor = BABYLON.Color3.FromHexString("#000000");
        this.scene.fogDensity = .2;

        this.nonVRCamera = new BABYLON.FreeCamera("camera1", new BV3(0, 1.7, -3));;
        this.camera = this.nonVRCamera;
        this.enemyParent = new BABYLON.Node("enemyParent");

        this.camCollider = BABYLON.CreateSphere("camCollider", { diameter: .4 });

       this.light = new BABYLON.PointLight("light1", new BV3(0, 4, -3), this.scene);
         this.light.diffuse = BABYLON.Color3.FromHexString("#8080FF");
        //this.light.diffuse = BABYLON.Color3.FromHexString("#ffffff");
        this.controllerParent = new BABYLON.Node("controllerParent");
        const batShape = [
            new BV3(.025, -0.1),
            new BV3(.025, -0.09, 0),
            new BV3(.013, -0.08, 0),
            new BV3(.03, 0.54, 0),
            new BV3(.031, 0.73, 0),
            new BV3(.01, 0.74, 0),
        ];

        this.spriteMaterial = new BABYLON.StandardMaterial("spriteMaterial", this.scene);
        const texture = BABYLON.Texture.CreateFromBase64String(SPRITESTEXTURE, "SpritesTexture", this.scene, false, true, 4);
        this.spriteMaterial.diffuseTexture = texture;
        //this.spriteMaterial.diffuseTexture = new BABYLON.Texture("sprites.png", this.scene, false, true, 4);

        this.spriteMaterial.diffuseTexture.hasAlpha = true;
        this.spriteMaterial.specularColor = BABYLON.Color3.Black();

        await this.createCanvasTexture();

        //Create Baseball bat
        this.bat = BABYLON.MeshBuilder.CreateLathe("bat", {
            shape: batShape, cap: 3, tessellation: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            frontUVs: new BABYLON.Vector4(0.4375, 0, 0.5, 0.375)
        });
        this.bat.material = this.spriteMaterial;
        this.bat.parent = this.controllerParent;
        this.ray = new BABYLON.Ray(BV3.Zero(), new BV3(0, 1, 0));
        var rayHelper = new BABYLON.RayHelper(this.ray);

        rayHelper.attachToMesh(this.bat, new BV3(0, 1, 0), new BV3(0, 0, 0), .8);
        // rayHelper.show(this.scene);

        //Create bat Entity
        secs.createEntity([
            new ControllerInput("right"),
            new MeshEntity(this.bat),
            new CollisionCheck(this.ray)
        ]);

        this.flashlight = new BABYLON.SpotLight("light",
            new BV3(0, 0, 0),
            new BV3(0, 1, 0), Math.PI / 3, .5, this.scene);
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



        
        // Create Ground
         const ground = BABYLON.MeshBuilder.CreateTiledGround("ground", { xmin: -16, zmin: -16, xmax: 16, zmax: 16, subdivisions: { w: 1, h: 1 } });
         ground.receiveShadows = true;
        
        var mat = new BABYLON.StandardMaterial("ground");
        var groundTexture = new BABYLON.DynamicTexture("ground texture", { width: 16, height: 16 },this.scene,false,BABYLON.Texture.NEAREST_SAMPLINGMODE);
        const textureContext = groundTexture.getContext();                
        textureContext.putImageData(this.spritectx.getImageData(32, 0, 16, 16), 0, 0);
        groundTexture.update();
       
        groundTexture.uScale = groundTexture.vScale = 50;
        groundTexture.wrapU = groundTexture.wrapV = 1;
        mat.diffuseTexture = groundTexture;
        mat.specularColor = BABYLON.Color3.Black();
        
        ground.material = mat;

        // Create Path
        this.path = BABYLON.CreatePlane('path',{size:.64});
        this.path.rotation.x = Math.PI/2;
        this.path.receiveShadows = true;
        
        var matPath = new BABYLON.StandardMaterial("path");
        var pathTexture = new BABYLON.DynamicTexture("path texture", { width: 16, height: 16 },this.scene,false,BABYLON.Texture.NEAREST_SAMPLINGMODE);
        const pathTextureContext = pathTexture.getContext();                
        var data = this.spritectx.getImageData(32, 0, 16, 16);
        for(let i = 0; i<data.data.length;i+=4)
        {
            data.data[i] = (data.data[i]+0x8B)/2;
            data.data[i+1] = (data.data[i+1]+0x45)/2;
            data.data[i+2] = (data.data[i+2]+0x13)/2;
        };
        pathTextureContext.putImageData(data, 0, 0);
        pathTexture.update();
               
        matPath.diffuseTexture = pathTexture;
        matPath.specularColor = BABYLON.Color3.Black();
        
        this.path.material = matPath;

        // Create Titles
        this.titleNotVRParent = await this.createTitle("DEATHKEEPER", false);
        this.titleParent = await this.createTitle("DEATHKEEPER", true);
        this.gameOverParent = await this.createTitle(" GAME OVER", true);

        this.scoreScreen = new BABYLON.Node("scoreScreen", this.scene);
        this.scorePlane = BABYLON.MeshBuilder.CreatePlane("scoreScreen", { width: 3, height: .25 });
        this.scorePlane.parent = this.scoreScreen;
        this.shadowSystem.add(this.scorePlane);
        this.scorePlane.position = new BV3(0, 1.25, 1.5);

        await this.changeState(1);

        BABYLON.Animation.AllowMatricesInterpolation = true;

        // let skeleton = new BABYLON.Mesh("skeleton");
        let skeletonPositions = [-0.08, 0.3224, -0.0418, -0.24, 0.64, -0.0161, -0.24, 0.3224, -0.0417, -0.4391, 1.2006, -0.2456, -0.2362, 1.1178, -0.0355, -0.2329, 1.2352, -0.0601, 0, 1.2771, -0.0432, -0.24, 1.7897, -0.1267, -0.24, 1.2771, -0.0432, -0.2381, 0.9577, -0.0202, 0, 1.2771, -0.0432, -0.2398, 1.277, -0.0438, 0, 0.6402, 0.0026, -0.2381, 0.9577, -0.0202, -0.2398, 0.64, -0.0008, -0.5732, 1.0382, -0.4617, -0.4391, 1.2006, -0.2456
            , -0.5741, 1.1563, -0.483, -0.08, 0.005, 0.0014, -0.24, 0.3224, -0.0417, -0.24, 0.005, 0.0014, 0.24, 0.6401, -0.0124, 0.08, 0.3223, -0.0413, 0.24, 0.3223, -0.0412, 0.2419, 1.2387, -0.0426, 0.3084, 1.1173, -0.3124, 0.3086, 1.2373, -0.313, 0.24, 1.7897, -0.1264, 0, 1.2771, -0.0432, 0.24, 1.2771, -0.0432, 0.2392, 0.9573, -0.0306, 0, 1.2771, -0.0432, 0, 0.9571, -0.0415, 0.2392, 0.9573, -0.0306
            , 0, 0.6402, 0.0026, 0.2399, 0.6397, -0.0043, 0.3086, 1.2373, -0.313, 0.3635, 1.1159, -0.5868, 0.3634, 1.2359, -0.5875, 0.24, 0.3223, -0.0412, 0.08, 0.0043, -0.0092, 0.24, 0.0043, -0.0057, -0.08, 0.3224, -0.0418, -0.08, 0.64, -0.0149, -0.24, 0.64, -0.0161, -0.4391, 1.2006, -0.2456, -0.4389, 1.0828, -0.2229, -0.2362, 1.1178, -0.0355, 0, 1.2771, -0.0432, 0, 1.789, -0.1348, -0.24, 1.7897, -0.1267
            , -0.2381, 0.9577, -0.0202, 0, 0.9571, -0.0415, 0, 1.2771, -0.0432, 0, 0.6402, 0.0026, 0, 0.9571, -0.0415, -0.2381, 0.9577, -0.0202, -0.5732, 1.0382, -0.4617, -0.4389, 1.0828, -0.2229, -0.4391, 1.2006, -0.2456, -0.08, 0.3224, -0.0418, -0.24, 0.3224, -0.0417, 0.24, 0.6401, -0.0124, 0.08, 0.64, -0.0087, 0.08, 0.3223, -0.0413, 0.2419, 1.2387, -0.0426, 0.2398, 1.1187, -0.0418, 0.3084, 1.1173, -0.3124
            , 0.24, 1.7897, -0.1264, 0, 1.789, -0.1348, 0, 1.2771, -0.0432, 0.2392, 0.9573, -0.0306, 0.24, 1.2771, -0.0432, 0, 1.2771, -0.0432, 0.2392, 0.9573, -0.0306, 0, 0.9571, -0.0415, 0, 0.6402, 0.0026, 0.3086, 1.2373, -0.313, 0.3084, 1.1173, -0.3124, 0.3635, 1.1159, -0.5868, 0.24, 0.3223, -0.0412, 0.08, 0.3223, -0.0413, 0.08, 0.0043, -0.0092];
        let skeletonUvs = [0.023, 0.47, 0.007, 0.941, 0.007, 0.47, 0.07, 0.468, 0.082, 0.932, 0.07, 0.932, 0.062, 0.001, 0.039, 0.875, 0.039, 0.001, 0.102, 0.499, 0.125, 1, 0.102, 0.998, 0.125, 0, 0.102, 0.499, 0.102, 0, 0.082, 0.004, 0.07, 0.468, 0.07, 0.004, 0.023, -0.001, 0.007, 0.47, 0.007, -0.001, 0.007, 0.941, 0.023, 0.47, 0.007, 0.47, 0.07, 0.932
            , 0.082, 0.468, 0.07, 0.468, 0.039, 0.875, 0.062, 0.001, 0.039, 0.001, 0.102, 0.499, 0.125, 1, 0.125, 0.5, 0.102, 0.499, 0.125, 0, 0.102, 0, 0.07, 0.468, 0.082, 0.004, 0.07, 0.004, 0.007, 0.47, 0.023, -0.001, 0.007, -0.001, 0.023, 0.47, 0.023, 0.941, 0.007, 0.941, 0.07, 0.468, 0.082, 0.468, 0.082, 0.932, 0.062, 0.001, 0.062, 0.875
            , 0.039, 0.875, 0.102, 0.499, 0.125, 0.5, 0.125, 1, 0.125, 0, 0.125, 0.5, 0.102, 0.499, 0.082, 0.004, 0.082, 0.468, 0.07, 0.468, 0.023, 0.47, 0.007, 0.47, 0.007, 0.941, 0.023, 0.941, 0.023, 0.47, 0.07, 0.932, 0.082, 0.932, 0.082, 0.468, 0.039, 0.875, 0.062, 0.875, 0.062, 0.001, 0.102, 0.499, 0.102, 0.998, 0.125, 1, 0.102, 0.499
            , 0.125, 0.5, 0.125, 0, 0.07, 0.468, 0.082, 0.468, 0.082, 0.004, 0.007, 0.47, 0.023, 0.47, 0.023, -0.001];
        let skeletonIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
            , 51, 52, 53, 54, 55, 56, 57, 58, 59, 18, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82];

        let skeleton = this.createMesh('skeleton', skeletonPositions, skeletonIndices, skeletonUvs);
        skeleton.translate(BV3.Up(), .8)

        let walkAnimation = BABYLON.Animation.Parse({ "name": "Walk", "property": "rotation", "framePerSecond": 60, "dataType": 1, "loopBehavior": 1, "blendingSpeed": 0.01, "keys": [{ "frame": 0, "values": [0, -0.2, 0, [0, 0, 0], [0, 0, 0]] }, { "frame": 2.3419999992847806, "values": [0.003843388574529361, -0.19012657335305522, 0, [0.003172824639617277, 0.008150789527368132, 0], [0.003172824639617277, 0.008150789527368132, 0]] }, { "frame": 25, "values": [0.1, 0.0015222520821878138, 0.03, [0, -0.00013129021272804048, 0], [0, -0.0001312906607115637, 0]] }, { "frame": 50, "values": [0, 0.19423644856981923, 0, [-0.0008184867371567691, -0.0021026416153625926, 0.00001603579409734409], [-0.0008184867371567691, -0.0021026416153625926, 0.000016035725922977702]] }, { "frame": 75.18395957947034, "values": [0.1, 0, -0.03, [0.00019980075393701113, -0.00005634573384141068, 0], [0.00019980075393701113, -0.00005634605055441348, 0]] }, { "frame": 100.29121798069308, "values": [0, -0.2, 0, [0, 0, 0], [0, 0, 0]] }] });
        let riseAnimation = BABYLON.Animation.Parse({ "name": "Rise", "property": "rotation", "framePerSecond": 60, "dataType": 1, "loopBehavior": 1, "blendingSpeed": 0.01, "keys": [{ "frame": 0, "values": [2.14, 0, 0, [0, 0, 0], [-0.07, 0, 0]] }, { "frame": 100, "values": [0, 0, 0, [0, 0, 0], [0, 0, 0]] }] });
        skeleton.animations.push(walkAnimation, riseAnimation);

        // Add Spawners
        this.spawner = new Spawner(this.scene, skeleton, new BV3(0, 0, 10), 7000);
        // this.spawner2 = new Spawner(this.scene, skeleton, new BV3(6, 0, 12), 5000, 13500);
        // this.spawner3 = new Spawner(this.scene, skeleton, new BV3(-6, 0, 13), 4000, 9250);

        // Create Tombstones

        let tombstonePositions = [1, 0, 1, -1, 0, 2, -1, 0, 1, 1, 0, 0, -1, 0, 1, -1, 0, 0, 1, 0, 2, 1, 0, 1, -1, 0, 1];
        let tombstoneIndices = [0, 1, 2, 3, 4, 5, 0, 6, 1, 3, 7, 8];

        let tombstone1Uvs = [0.312, 0, 0.25, 1, 0.25, 0, 0.25, 0.001, 0.188, 1, 0.188, 0, 0.312, 1, 0.25, 1.001, 0.188, 1];
        let tombstone2Uvs = [0.375, 0, 0.313, 1, 0.313, 0, 0.25, 0.001, 0.188, 1, 0.188, 0, 0.375, 1, 0.25, 1.001, 0.188, 1];
        let tombstone3Uvs = [0.437, 0, 0.375, 1, 0.375, 0, 0.25, 0.001, 0.188, 1, 0.188, 0, 0.437, 1, 0.25, 1.001, 0.188, 1];

        this.tombstone = [
            this.createMesh('tombstone1', tombstonePositions, tombstoneIndices, tombstone1Uvs, [0.32, 1, 0.64]),
            this.createMesh('tombstone2', tombstonePositions, tombstoneIndices, tombstone2Uvs, [0.32, 1, 0.64]),
            this.createMesh('tombstone3', tombstonePositions, tombstoneIndices, tombstone3Uvs, [0.32, 1, 0.64])
        ];

        // wall
        this.wall = this.createMesh("wall",
            [1, 0, 1, -1, 0, 2, -1, 0, 1, 1, 0, 0, -1, 0, 1, -1, 0, 0, 1, 0, 2, -1, 0, 3, -1, 0, 2, 1, 0, 2, 1, 0, 1, -1, 0, 1, 1, 0, 3],
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 1, 3, 10, 11, 6, 12, 7],
            [0.625, 0, 0.563, 1, 0.563, 0, 0.562, 0.001, 0.5, 1, 0.5, 0, 0.687, 0, 0.625, 1, 0.625, 0, 0.625, 1, 0.562, 1.001, 0.5, 1, 0.687, 1],
            [0.32, 1, 0.64]);
     
        this.createMap();
        this.generateRandomTree();

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

        xrHelper.baseExperience.onStateChangedObservable.add(state => {
            switch (state) {
                case BABYLON.WebXRState.IN_XR:
                    this.inXR = true;
                    this.changeState(1);
                    sfx.InitAudio();
                    ambience.start();
                    this.camera = xrHelper.baseExperience.camera.leftCamera;
                    xrHelper.baseExperience.camera.position = new BV3(0, 1.7, 0);
                    const postProcessTonemapL = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Reinhard, 1.2, this.camera);
                    const postProcessTonemapR = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Reinhard, 1.2, xrHelper.baseExperience.camera.rightCamera);
                    this.camCollider.parent = this.camera;
                    this.light.diffuse = BABYLON.Color3.FromHexString("#080040");
                    this.controllerParent.setEnabled(true);
                    break;
                case BABYLON.WebXRState.NOT_IN_XR:
                    this.inXR = false;
                    this.changeState(1);
                    ambience.pause();
                    this.controllerParent.setEnabled(false);
                    this.camera = this.nonVRCamera;
                    this.light.diffuse = BABYLON.Color3.FromHexString("#a0a0FF");
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

    createMap(){  
        this.map = new BABYLON.TransformNode("map");      
        var level1 = this.loadLevel(maps[0]);
        for(let i=0; i<level1.m.length;i++){            let p;
            switch(level1.m[i][2]){
                case 1: // path
                    p = this.path.createInstance(`path${+ new Date()}`);                 
                break;
                case 2:
                    p = this.wall.createInstance(`wall${+ new Date()}`);                 
                    p.rotation = BV3.FromArray([-1.5708, 0, -1.5708]);
                break;
                case 3:
                    p = this.wall.createInstance(`wall${+ new Date()}`);                 
                    p.rotation = BV3.FromArray([-1.5708, 0, 1.5708]);
                break;
                case 4:
                    p = this.wall.createInstance(`wall${+ new Date()}`);                 
                    p.rotation = BV3.FromArray([-1.5708, 0, Math.PI]);
                break;
                case 5:
                    p = this.wall.createInstance(`wall${+ new Date()}`);                 
                    p.rotation = BV3.FromArray([-1.5708, 0, 0]);
                break;
                case 6:
                    p = this.tombstone[Math.floor(Math.random() * 3)].createInstance(`tombstone${i}`);
                    p.rotation = BV3.FromArray([-1.5708, 0, 0]);            
                    p.rotation.z += Math.random() * .5 - .25;
                    p.rotation.x += Math.random() * .5 - .25;
                    p.rotation.y += Math.random() * .5 - .25;
                    p.entity = 
                        secs.createEntity([
                            new MeshEntity(p),
                            new Grave(p),
                        ]);

                    this.shadowSystem.add(p);
                        break;

                default: continue;
            };                       
            p.position = new BV3(level1.m[i][0]*.64 - 13, 0.001, -level1.m[i][1]*.64 + 13);
            p.parent = this.map;
        }
    }


curve = 60;
curve2 = 5;

drawTree(ctx, startX, startY, len, angle, branchWidth) {
    ctx.beginPath();
    ctx.save();    
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    if (angle > 0){
        ctx.bezierCurveTo(this.curve2, -len/2, this.curve2, -len/2, 0, -len);
    } else {
        ctx.bezierCurveTo(this.curve2, -len/2, -this.curve2, -len/2, 0, -len);
    }
     
    ctx.stroke();

      if (len > 10) {               
        this.drawTree(ctx, 0, -len, len * 0.7, angle + (this.curve*Math.random()), branchWidth * 0.6);
        this.drawTree(ctx, 0, -len, len * 0.7, angle - (this.curve*Math.random()), branchWidth * 0.6);

      }
    ctx.restore();
}
generateRandomTree() {
    
    const tree = BABYLON.MeshBuilder.CreatePlane("Tree", { width: 6, height: 6 });    
    tree.position = new BV3(0, 2, 25);

    const treeTexture = new BABYLON.DynamicTexture("tree texture" , { width: 64, height: 64 });
    treeTexture.hasAlpha = true;    
    const treeContext = treeTexture.getContext();
    
    const treeMaterial = new BABYLON.StandardMaterial("Tree Mat");
    treeTexture.updateSamplingMode(BABYLON.Texture.NEAREST_SAMPLINGMODE);
    this.drawTree(treeContext, 32, 64, 24, 0, 6);
    
    treeMaterial.diffuseTexture = treeTexture;    
    treeMaterial.diffuseTexture.hasAlpha = true;
    treeMaterial.useAlphaFromDiffuseTexture = true;
    treeMaterial.specularColor = BABYLON.Color3.Black();
    treeTexture.update();
    tree.material = treeMaterial;
    
    for(let i=0; i<30; i++){
        let t= tree.createInstance(`tree${i}`);
        t.position = new BV3(Math.random() * 3 + i*2 - 30, 2, 18 + Math.random()*7);
        t.scaling = new BV3(1, 1+Math.random(), 1);
    }    
}


    createTitle(titleText, xr) {
        var titlescreen = new BABYLON.Node("titleParent" + titleText, this.scene);

        const pressTrigger = BABYLON.MeshBuilder.CreatePlane("PressTrigger" + titleText, { width: 3, height: .75 });
        pressTrigger.parent = titlescreen;
        pressTrigger.position = new BV3(0, 1.75, 2);
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

        return new Promise((res) => {
            // image.onload = () => {


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
                        const s = this.spritectx.getImageData(Math.floor(Math.random() * 16) + 48, 17 - r, 1, 1);
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
            //};

        });
    }
}

window.app = new App();
