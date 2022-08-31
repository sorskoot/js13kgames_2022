class Soundfx {

    /** @type AudioContext */
    audioContext;
    soundinitialized = false;
    audiopool = [];
    pannerNodes = [];

    InitAudio() {
        if (this.soundinitialized) return;
        this.soundinitialized = true;
        this.audioContext = new AudioContext();
        //audioContext.sampleRate = 11025;
        let gain = this.audioContext.createGain();
        gain.connect(this.audioContext.destination);
        for (let i = 0; i < 25; i++) {
            let bufferSource = this.audioContext.createBufferSource();            
            bufferSource.buffer = this.audioContext.createBuffer(1, 96e3, 48e3);
            
            bufferSource.connect(this.audioContext.destination);
            //const audio = new Audio();            
            this.audiopool.push(bufferSource);
            // const element = this.audioContext.createMediaElementSource(audio);                
            //element.connect(gain);        
        }
        let hitBuffer = this.audioContext.createBuffer(1, 96e3, 48e3);
        this.hitBufferData = hitBuffer.getChannelData(0);
        for (let i = 96e3; i--;)this.hitBufferData[i] = this.hit(i);
    }
    currentSfxIndex = 0;

    // Sound
    t(i, n) { return (n - i) / n };

    hit(i) {
        let n = 3e4;
        if (i > n) return null;
        let q = Math.pow(this.t(i, n), 3.1);
        let d = Math.atan(i / 1000 - Math.sin(i / 331) * Math.sin(i / 61) + Math.sin(Math.sin(i / 59) / 39) * (66)) * this.t(i, n);
        let d2 = Math.sin(Math.tan(i * .001) * (Math.random() / 2)) * Math.sin(i * .0009) * q * d;
        return Math.cos(i * .0003 + (Math.PI / 2)) * d2 * 3;
    }


    f(i) {
        let n = 2e4;
        if (i > n) return null;
        let q = this.t(i, n);
        return Math.sin(-i * 0.03 * Math.sin(0.09 * i + Math.sin(i / 200)) + Math.sin(i / 100)) * q * q;
    }

    play(sound) {
        if (!this.soundinitialized) this.InitAudio();

        if (sound == 0) {
            this.audiopool[this.currentSfxIndex].buffer.copyToChannel(this.hitBufferData,0);            
        }
        this.audiopool[this.currentSfxIndex].start();
        this.currentSfxIndex = (this.currentSfxIndex + 1) % 25;
    }
}

export default new Soundfx();