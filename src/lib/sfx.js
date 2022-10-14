class Soundfx {
    
    InitAudio() {
        if(this.init)return;
        this.init = true;
        let hitBuffer = BABYLON.Engine.audioEngine.audioContext.createBuffer(1, 96e3, 48e3);
        const hitBufferData = hitBuffer.getChannelData(0);
        for (let i = 96e3; i--;)hitBufferData[i] = this.hit(i); 
        this.hitSound = new BABYLON.Sound("hit", hitBuffer);   
    }
    
    hit(i) {
        let n = 3e4;
        if (i > n) return null;
        let q = Math.pow((n - i) / n, 3.1);
        let d = Math.atan(i / 1000 - Math.sin(i / 331) * Math.sin(i / 61) + Math.sin(Math.sin(i / 59) / 39) * (66)) * (n - i) / n;
        let d2 = Math.sin(Math.tan(i * .001) * (Math.random() / 2)) * Math.sin(i * .0009) * q * d;
        return Math.cos(i * .0003 + (Math.PI / 2)) * d2 * 3;
    }
}

export const sfx = new Soundfx();