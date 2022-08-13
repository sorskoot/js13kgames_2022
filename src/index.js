import {sound} from './lib/sound';

class App {

    /** @type BABYLON.Scene */
    scene;
    /** @type HTMLCanvasElement */
    canvas;

    constructor() {
        sound.InitAudio();            
        this.canvas = document.querySelector("#c");
        // initialize babylon scene and engine
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.createScene().then(() => {
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        });       
    }

    async createScene() {
        // create the canvas html element and attach it to the webpage
        
        this.scene = new BABYLON.Scene(this.engine);

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);
        camera.attachControl(this.canvas, true);
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);

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
        const xrHelper = await this.scene.createDefaultXRExperienceAsync();        
        return this.scene;
    }
}
new App();