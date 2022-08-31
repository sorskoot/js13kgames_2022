const Params = {
    nOsc: 14,
    F: [97.0362, 155.7461, 200.6708, 291.5601, 335.2872, 401.6002, 500.6919,
        599.8203, 679.0558, 704.6314, 850.3987, 1016.353, 1169.165, 1343.452],
    Slope: [-0.71286, -1.08551, -2.68134, -0.80383, -5.88471, -1.06387, -3.419,
    -3.69923, -6.71634, -3.57097, -6.85307, -7.04044, -5.6755, -7.25273],
    Amp0: [-55.7976, -44.8857, -33.3415, -70.8675, -24.9633, -75.653, -27.2338,
    -66.8294, -23.635, -57.3287, -43.0425, -50.9267, -55.1784, -46.6498]
}

const randomWhite = () => Math.random() * 2 - 1;

class Ambience {
    gNode = [];
    osc = [];
    FinalAmp;

    bellgain;
    outputGain;
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

        await this.context.audioWorklet.addModule('noise.js')
        const testNode = new AudioWorkletNode(this.context, 'noise-processor');

        const b = [0.049922035, -0.095993537, 0.050612699, -0.004408786]; // numerator, feedforward
        const a = [1, -2.494956002, 2.017265875, -0.522189400]; // denominator, feedback
        const iirNode = this.context.createIIRFilter(b, a);

        this.outputGain = this.context.createGain();
        this.bellgain = this.context.createGain();
        this.bellgain.gain.value = .15;
        this.bellgain.connect(this.context.destination);

        const filter = this.context.createBiquadFilter();

        testNode.connect(iirNode);
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

        const cricketNoise = this.context.createOscillator();
        const cricketosc1 = this.context.createOscillator();
        const cricketgain1 = this.context.createGain();
        const cricketosc2 = this.context.createOscillator();
        const cricketgain2 = this.context.createGain();
        const cricketgain3 = this.context.createGain();
        const cricketfilter = this.context.createBiquadFilter();
        var f = 30;
        cricketNoise.frequency.value = 3000;
        cricketNoise.type = 'triangle';
        cricketNoise.start();
        cricketNoise.connect(cricketgain1);
        cricketosc1.frequency.value = f;
        cricketosc1.type = 'square';
        cricketosc1.connect(cricketgain1.gain);
        cricketosc1.start();
        cricketgain1.connect(cricketgain2);
        setInterval(() => {
            cricketNoise.frequency.value = 3000 + Math.random() * 50;
        }, 20);
        cricketosc2.frequency.value = f / 4;
        cricketosc2.type = 'square';
        cricketosc2.connect(cricketgain2.gain);
        cricketosc2.start();
        cricketgain2.connect(cricketfilter);

        cricketfilter.type = 'highpass';
        cricketfilter.frequency.value = 1800;
        cricketfilter.Q.value = 5;
        cricketfilter.connect(cricketgain3);

        cricketgain3.gain.value = .001;
        setInterval(() => {
            cricketgain3.gain.exponentialRampToValueAtTime(Math.random() * .001, this.context.currentTime + 3);
        }, 3000);
        cricketgain3.connect(this.context.destination);

        this.strikeTimeout(this.context, 5000);
    };

    strikeTimeout(context, timeout) {
        setTimeout(() => {
            this.strike(context);
            this.strikeTimeout(context, Math.random() * 30000 + 10000);
        }, timeout);
    }

    DBToAmp(db) { return Math.pow(10, db / 20) }

    /**
     * 
     * @param {AudioContext} context 
     */

    strike(context, pitch, duration = 1) {
        pitch = pitch || (1 + Math.random() / 10);
        for (let i = 0; i < Params.nOsc; i++) {
            this.osc[i]?.stop();
        }
        for (let i = 0; i < Params.nOsc; i++) {
            this.gNode[i] = context.createGain()
            this.osc[i] = context.createOscillator()
            this.osc[i].start()
            this.osc[i].connect(this.gNode[i]).connect(this.bellgain)
        }
        var now = context.currentTime
        for (let i = 0; i < Params.nOsc; i++) {
            this.osc[i].frequency.setValueAtTime(pitch * Params.F[i], now)
            this.gNode[i].gain.setValueAtTime(this.DBToAmp(Params.Amp0[i]), now)
            this.FinalAmp = this.DBToAmp(Params.Amp0[i] + Params.Slope[i] * 8 / duration)
            this.gNode[i].gain.exponentialRampToValueAtTime(this.FinalAmp, now + 8)
            this.gNode[i].gain.linearRampToValueAtTime(0, now + 12)
        }
    }
}

export default new Ambience();