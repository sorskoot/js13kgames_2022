import rng from "./rng";

class Ambience {
    gNode = [];
    osc = [];
    FinalAmp;

    bellgain;
    outputGain;

    /** @type AudioContext */
    context;

    started = false;
    initialized = false;

    resume() {
        if (!this.initialized) return;
        this.context.resume();
    }
    pause() {
        if (!this.initialized) return;
        this.context.suspend();
    }

    async start() {
        if (this.initialized) {
            this.resume();
            return;
        }
        this.initialized = true;
        this.context = new AudioContext();

        this.wind = new BABYLON.Sound("wind","Ambience_HowlingWind_Loop.wav",undefined,undefined,{ loop: true, autoplay: true, volume: 0.5 });
        this.sfx = [
            new BABYLON.Sound("crow","Ambience_Crow.wav",undefined,undefined,{ loop: false, autoplay: false, volume: 0.5, spatialSound:true }),
            new BABYLON.Sound("crow2","Ambience_Crow2.wav",undefined,undefined,{ loop: false, autoplay: false, volume: 0.5, spatialSound:true }),
            new BABYLON.Sound("bell","Ambience_Bell.wav",undefined,undefined,{ loop: false, autoplay: false, volume: 0.5, spatialSound:true }),
            new BABYLON.Sound("bell","Ambience_BirdsFlying.wav",undefined,undefined,{ loop: false, autoplay: false, volume: 0.5, spatialSound:true }),
            new BABYLON.Sound("bell","Ambience_Thunder.wav",undefined,undefined,{ loop: false, autoplay: false, volume: 0.5, spatialSound:true })
        ];
        //this.crow.setPosition(new BABYLON.Vector3(0,10,0));
        this.playRandomSound();        
    }
    playRandomSound() {        
        rng.getItem(this.sfx).play();
        setTimeout(() => {         
            this.playRandomSound();
        }, 5000 + Math.random() * 10000);
    }
}

export const ambience = new Ambience();