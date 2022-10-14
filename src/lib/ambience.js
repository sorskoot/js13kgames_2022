class Ambience {
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
        
        const noiseNode = this.context.createScriptProcessor(1024, 1, 1);
        noiseNode.addEventListener('audioprocess', evt => evt.outputBuffer.getChannelData(0).forEach((v, i, a) => a[i] = Math.random() * 2 - 1));
        const b = [0.049922035, -0.095993537, 0.050612699, -0.004408786]; // numerator, feedforward
        const a = [1, -2.494956002, 2.017265875, -0.522189400]; // denominator, feedback
        const iirNode = this.context.createIIRFilter(b, a);

        this.outputGain = this.context.createGain();
      

        const filter = this.context.createBiquadFilter();

        noiseNode.connect(iirNode);
        iirNode.connect(filter);
        filter.connect(this.outputGain);
        filter.frequency.value = 50;
        filter.type = 'lowpass';
        filter.Q.value = 5;

        setInterval(() => {
            filter.frequency.exponentialRampToValueAtTime(Math.random() * 400 + 50, this.context.currentTime + 2);
        }, 2000);
        filter.frequency.exponentialRampToValueAtTime(250, this.context.currentTime + 2);

        this.outputGain.gain.value = .8;
        this.outputGain.connect(this.context.destination);
    };
}

export const ambience = new Ambience();