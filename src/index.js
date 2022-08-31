import { models } from './scene';
import { Spawner } from './classes/spawner';
import secs from './classes/secs';
import sfx from './lib/sfx';
import { InputSystem } from './classes/systems/InputSystem';
import { MeshEntity } from './classes/components/MeshEntity';
import { ControllerInput } from './classes/components/ControllerInput';
import { ShadowSystem } from './classes/systems/ShadowSystem';
import { AIController } from './classes/components/AIController';
import { CollisionCheck } from './classes/components/CollisionCheck';
import { EnemyEntity } from './classes/components/EnemyEntity';
import ambience from './lib/ambience';

const STATES = { TITLE: 1, GAME: 2, LOSE: 3, INIT: 0 };
const SPRITESTEXTURE = "data:image/webp;base64,UklGRigRAABXRUJQVlA4TBwRAAAv/8ADEA0waBvJ0WV2vs7zJ3ztIUT0fwKoSlLgOqVXCuOP8SveA7iMfkVFElpLe4AKdjeVpdD7+qunc2wkUOeMgKQI8Jsl28KSJV1XdQlZkv4aOIgkSZEyNo6Z/Gt8ZuZ3AEkWAALVyzZWXDXd/yh2q/pGdg2jNpIc+fIsf4AH4fZ5ufs/AaBAo+GZaea3YcODcVE4gJcu8DLqCzd2Ar7grxRoALCTRTZYCZTJszFDVYX8+8KGDXlPERcv/J3R5TdmxQPkafkVyCQUqCxem0MW5UEbIJ4oztgFKzb4ZkTMACqPMBuWh+Ee6cHAQODicmGF2zwM0vBf6lKz6Ly7/LHLD8oUKf4gNi+Q+bM0aeKU+aAs2vDGq3e6zSM5QG3S4kKX/ucrLoNLvMXFb0R2tf9fJFmpf3lXVVd3T1ePT4/P0Tnru/ja7OLu7u4wGRa5xBDZRLi7u6+777bPTntVlwsyz0wfaPIf7q6ZXoGmujGEGrq7k3ED5CebEHeHwj1yMiKuAx5rtvW2kSQ9ACQlRUVkK9p3j9nSbGD24Oe3Xab3M2XTZ0oiAViyrT2RJOn7wWTmKncPSs7CUY6qunsLvTca4caYuZP9ZFQ4y9xM+v9fQFDk/2gM3DZSlMzyHuMbMBAArLu8GXyo28RWvsr6DebjRmZ9ob+wVU8jYoHj+MXWRVTkSt8//6xIR//+iaLM2E8QW58wbv/v3PoDjCQVnKeNFc5VgDDMA2QDsztBQZHAkpgCuAQfHtGecZ5WdCbEoArg65YdC3I4HKBFtRwLtMIt98mKUFUC4DrCbQGZ81xY6VJUJskQsEOroUyA6x2APeetzlQV4Db/nnWq2UOnNRICyCmwCkEBq0MugVfowMnhaECA0TQ+NKIJCgwMU3MAfACAA2Nb+SxzBgDnut2i5it5uxX5yqzbgV1CKVZyc+asT7EycDypkM29SeJ/Mskbg/1mJ1VUKaBUDRsKKSMBDijjiABMiCMJJ4onYSRQBBcGDyeycR43kPWo7hN2jGn1C1XI0KlYvS15AEHIFDALrKIiqDouiUjY8qhASoi4wySYxSkWcCFYwESIfCoFNuhkg0Jrm7Th/h32TjabG95CNy4OrFYiRXATQgGaqMEBGhAvUJCmlZAaoISINwaNbULKECfzARJS+AAAvg9jWwGwBLh8z3q3jY2ffcW7uZL8lLS9/a1TxGjF4z+09//Lld7A40HpLVN/XWg/O1j0o2/t/eNJZDRRdb17wgIEjglXhOE4JwFLMLNxBTCck85JMzOJ3PGwjnCXCdoIayvv8I8EME8yb3dEUV5Ufp0MfI7jojiFnYTOBhGYsDMjVK4rEngABh2VCKgSuISZtS62oqICUZg8jKACQywKMCAcQSbcq5gFEhzIBg805N6fmoVKthMwgT4l4yaQCh54/G0RJiADB4l7EIxN0uWhMZmi/Ozk5XyYFAAPLc4434q+3dnx1RNG6Qz/6w8WyX9Ql6euYTcicsE+PGC/T6Q55JelY/+6yM9L635bzZQAXKEUynKiwHgcPhylisTZNbEizBQrwzVBqgCgyP16WRs4kq2XCzN7vFS/exfqKwbqSFTCBkZNhHS/q5dZX2EAeHdeO7WAuQGLXP2uQ0S1ApHwMoAT7kmEH+tSgS2zNllodhZMYiZzYFZOWMIDlR1LABOBh6vU5s7vwyYlEcI8wgNN9VYhQbYBq4BEMjxMSUWmMgnoSKN00uDlZ2EqH1b7Arz/ZCcxuiyc/vaNRUvvsA6z7s5Of9vMohPshVyz/N8c+WbpVM9Lp7998GbRVU0LHaIkNJlyBNiAjF6YwoQMGqDhQgEkzEtCqHIAAFuZmzOiPMhdO/Q4k6WDx3/E4gu1WVV6YRkIOakTbsy7i0Nbw9rKwbqmRPP+LbHzZaGd1dUxMQNWHQBQAGCz2zofZJyRAwLh8oD0RjGNQLWMQimgfHnAP4GBQ7Cku0Ng+4poUfONMsREOCfT+wRXvO8RCi9/JQXhIGEgATTjRggmIdYgVlSTkkICL6yhic8ZTOsX4EXw5FlUI1fxuWgTH1t6hdHlC/fRkCMD7AVOOsMsyNLrC20xsxIYJp4YwwMBc82ZXLiAp0x0UyChrLEDFFHNQC0NtDwLTC4MATxvlfYLnsyNHuWFVSY9sbDZiK7MYSbT1MWyuNtTU9IZFa6giqPxAv5j0eCqaADh6onYRrDOAMbtDFEI4WIFVHp4kvsJaJPrWd0eqr3pAB6SAO6wNemEy6HuGkyYGS8ubar3YG4Tf0lo53r36nBgvRFSST7AFDJX4He2VuvomKomCnsqE0Aa+0Yj49exIw+Z+IUlwOceEp/72MdOf9uMXLPth+r8uMWVT2pf/chwJbMgb35zWvaUYK9RCN+g1PEAjrOkMWAWQAAeMFMRhbLCQHwCzgi3jxxEm2Yaji0d6TjaqgERMNYcBj3ccCURNamHbjkd8W9YMnIFSAU0GqIkXsz0uuD2majwGR/qdGVkNplBFtrEUiE0nfXHgnlA7jEQOwHN19YBK6m2IiIygFtd2CFBNFSnHRUEeJZQF60uGCf6SK51mD0Jx0u4H8FTsIUMOkk4BJwtkEFc4f4CAzjZCFFIGYDGXKz+95EPBw47D57c50cjV/G/rhI+1ueNvayMr03vcuMbo8sz/xy5Ls2ON3LLz3lyVjXAjNgZ3uTgfu3BUACuxMEgGMKVAtK1wveO6KDngs0JM1QRwHBNQ5VxijVeJ5wtORxJOknlEXcUfh0MVGyxwx9P1doG7y+YIoR0v9NwoXDP8ZLVQwmwCuRnoRgbjF6099aOXkgVJUaGHCzkJHWEWeg4QfJwWWBvhk4jD2oLXQNQnbERNF+4VXV8sp7J6AKRbnDv6b3jKOAFbrcJ2YPloLubW8h4CCZAGCRf3fKp6aKKWVNTMiQuXsjSP0JDr3s0k1kCX6zjMiTAI9e1Wbg+PzmeFCPnwfFadsK3sOQmkzZTbgD7PgLccRfhhweh/43Em/8gP65ptWr1OwwGLwYTVpDGDaIF1LIxhtDLBDEQgc+4S2I78QAnZ7QNWlMYCjiwQ0x8NLiyPeK4fCdYR9X+SBID9dijN4u+YrR/AwpwRcUCCiSUGTugrjI/ke21kWNGSaj0pLuHos6UBjYk/3qlQ1zIDlCDVXTwAW3RdFlne0wiAKoFAHQfzunJIeNWa9xolgxsnWRR6crOkpDzcBsJakJYiKIQSbKWcJ4TaT9YXMh1AvrUBZVQhcgeoJG9oz4FMCnikk3deZwpG13uLL7/ZOUe+g4zy5OVkAWrGe+PpbcZdjZBY0CWk52nNef2AfY4iuSkBrPyXuDIUDG4m0JsNdWNWoKmk7fvLSNWT0yAG6RG0MpjjiSmJLZXCLAk8bIqwPRsJOu5ycbztRg3CnZvP1WdT7QPHXrDA8oV6p2m9zVhW1K2QWpT4yRIYD5hfDIZwvFeeg8kCOaaAFOEAyPFFXTWKRD0FQjYCKq43AQw2b0TuavCLQntCTFA8rCtuXPOgAx2PjdKZ3RTBVxcyVaBQ0u43Q7wyGSC8jMSgI+BV0xr/+AXdfrb//szP5sL8K0jrj32tQmdG/rtnaY1NK23rNMj1hgtphLv9jRuCbrFmagC5dKU+MgiOG1HPWYhE68MxBcsRo4MLJtIRxGWhHMIyRphOxZweAdZGikyW8FOY3pC0ejFFGKHoYI6ZWo3NB2vkA4wieP/9P4qSauC20deHaRHJyoEUf24VQZub7xGQg9s/1pROjFLjx8gDiZmJ4gShOnCZCF7gZAG6TVsxC1NMEQkIL2lQQgsqowaAM0zgNtMZ2vGHiicgaIXQi5AcQKkLiEwnsAUF1GyzCBdoDsBrr8RClYESFwZmAfMsdDQU9bxxjoIXNJ/Y9q/Ef/A8Ocrw9fHelp2qmd2UmPDKpZ/IKdZnjNWaL5jRbK9nQn//ofcywHTRl3/+xtav8LpnuWmEqNUJE7JZNuzfKlse8SY6LyUFEB8RMTKfsKhuaRMA8IHnxDToXHDtdfsYJ0xqEigcTaQsx2Rpyo+4hA1KgBoGlhHucsMbcBaNt1fmOK7S/qaiiNgk+n5yXZuFkOzKc5QeAsuneCVtS+jnO7QDdRDlB5J03lS6YM2XAFgxsxTFoPxhBqEVKXC/sZIwEfjFgWdTKreAc2Yq52wQum0k9Yk/gQiDBYWt61+bwtQY4SXJNGc5y4NWwL0w0RxFzZ3y+pOG8xJpSjrA3YcQk+HCVtAKOP2AH0QUwg0sqM9GdsKWCdvXH16BaZxbC2+fML60uBxC/tURWyy4TETLtmmE0w87BWehFueQpcR/RpQzJwf3YkycZ1N3BBlrNXiOVsmAbbYKMIioppRlQXqBs5TNoWQChFivIcxo2QpFomDqeDM9ok7niIN/volQwWhJOS/gAS8cHYRCasAaDV0Gww9F1svTpEBL4UGwTGor039G8ZvXyAK88JMpv0EGFD40jlCjJ0IFSjATMBVqF1ErABXiVWUHg2Hc6UHsEsWkgK0BAlgA1owULQjLrPtQFMyFcIoa9tV9XRB1OoYcnE/epmTkrXaZ06sBjYBE08zY4agQRCRySBD4kKiRk5D2CWAGQt4KA/IJAuloxZ1jx1COBqYD3iwhsa/iO9AYitgWs9yn93USPNjU13eIJ4XsNMJ/3FrQEL0FpLnG87dnZa6p9dsblNQ8Cq/L1G5hOWBXTeqKE0G3pYo6ZQgaQ94MHs8Z1pRbkDogVs7pbygku2qR+F8SugsymOidIIAIWAqezUeUIUEkuByYSYxCoHoPnI52XyjArGiD+AZvDkSACFRm20HaSU7YN1N7uASdxsgGxCAgNrN/T4AAPngOIRVCNaBN6NxgrMSjLDvDXAPQhqQPCcw8BHkNwRRrHF3Te7Bfmebnzb61oQ7Ft54OxGna+EWr9UxJLnXIyy8MDuEJHCuhQVfryha3NaBDGH5DLloP8RGEe09zG69kQRFR0JmGHBUJ2QzhHFSSpFJwLthgHuLAYBAKAuXAs4EGDBoaK9W5+Nz9v67AVMztpYBEhTn5taaska9VhPvnwC1P0G/quyV1eJONY66FtZPhvzgDi9Nr5uJmLT8/52Ck/9/1InRrvW1pGwk7KOUHhDlL/LlIx0gu0OxZqZS9CRCFYoFtb5hFeA8yb5C3p0rzkkgwxkKGozCoWRZCSLK57nApRh2tbY5KeC/bFHSYQq4vO5hrKnqBkKs0yJ8OJ9P20yhI9wFhvyRWvkPL52Q7EPdLEGmjb6P9ZnvXcATcMOQoZgEIHyJyUKtgvDPUAi9HBEjk7dJQI12MZ6D4c9cqld2qYz/fpCYix3tCye+ZLdpI2kPFoNjmrjny0xezBw+U/r/njmaKo5tzTFf7mTrxJKeZ87qTjk5CQNA18Qc1R+/g4uSLNmpSQh1ML3LS+fGMFhMAgCwN01zA2hE1smbp/71is8ZwIFphq/+o63jmAo8F31nWHC6hQZrmQ7IqePomf2fYNfEW1nh+zUnsk4fRZ6zVfUlTT+qpVG/r+772Urov2LcV5TnT/bsQN5/ULrvbAM2T4PN/TWDtWwr9LzSkoYbd1rpBIrpPyfNTdgmZhyIkYxSeBylqtT2MvwEfigxCujG5EK1qjEAcAAvAFxLJvJePyu79UTbikPKY3oVbgdRIQ+4sIC/gtPsFkOL4pRpwO9CYUiYl0w2R5nC3HgckHScXLEJyCYEAusjrzhrMJGei8J0Uulq16kQ2kbz/7/3wPstb806uVX98D9mE22I/I835r975j6vrnsy7g2k/tuL2xsYAK8z24wNwKUX3cgWI/cyUBXu2wXdAY4CmFC3zyAizgggJVykhMUFFtMDUCsA19X6NLOAWoOGAwA=";
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