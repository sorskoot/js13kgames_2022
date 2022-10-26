import rng from "./rng";

class Soundfx {
    
    InitAudio() {
        if(this.init)return;
        this.init = true;
        // let hitBuffer = BABYLON.Engine.audioEngine.audioContext.createBuffer(1, 96e3, 48e3);
        // const hitBufferData = hitBuffer.getChannelData(0);
        // for (let i = 96e3; i--;)hitBufferData[i] = this.hit(i); 
        // this.hitSound = new BABYLON.Sound("hit", hitBuffer);   

        this.level1 = new BABYLON.Sound("Level1", "Level1.wav");
        this.level2 = new BABYLON.Sound("Level2", "Level2.wav");
        this.level3 = new BABYLON.Sound("Level3", "Level3.wav");

        this.skeletonHit = [
            new BABYLON.Sound("hit1", "skeleton_hit1.mp3"),
            new BABYLON.Sound("hit2", "skeleton_hit2.mp3"),
            new BABYLON.Sound("hit3", "skeleton_hit3.mp3"),
            new BABYLON.Sound("hit4", "skeleton_hit4.mp3")
        ];
    }
    
    hit() {
        rng.getItem(this.skeletonHit).play();
        // let n = 3e4;
        // if (i > n) return null;
        // let q = Math.pow((n - i) / n, 3.1);
        // let d = Math.atan(i / 1000 - Math.sin(i / 331) * Math.sin(i / 61) + Math.sin(Math.sin(i / 59) / 39) * (66)) * (n - i) / n;
        // let d2 = Math.sin(Math.tan(i * .001) * (Math.random() / 2)) * Math.sin(i * .0009) * q * d;
        // return Math.cos(i * .0003 + (Math.PI / 2)) * d2 * 3;
    }    
}

export const sfx = new Soundfx();