class NoiseNode extends AudioWorkletProcessor {
  process(inputs, outputs) {    
    outputs[0].forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {        
        channel[i] = (Math.random() * 2 - 1);
      }
    });        
    return true;
  }
};
registerProcessor('noise-processor', NoiseNode)