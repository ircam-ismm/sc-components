export default function sineGenerator(frequency, sampleRate, blockSize, callback, nbrBlocks = Infinity) {
  const self = {};

  const block = new Float32Array(blockSize);
  const tIncr = blockSize / sampleRate;
  const _2PI = 2 * Math.PI;

  let pIncr = frequency / sampleRate;
  let phase = 0;
  let timeoutId = null;
  let time = 0;
  let counter = 0;

  self.frequency = (frequency) => {
    // mult = _2PI * frequency;
    pIncr = frequency / sampleRate;
  }

  self.start = () => {
    (function createBlock() {
      for (let i = 0; i < blockSize; i++) {
        const value = Math.sin(phase * _2PI);
        block[i] = value;
        phase = (phase + pIncr) % 1;
      }

      callback(time, block);

      time += tIncr;
      counter += 1;

      if (counter < nbrBlocks) {
        timeoutId = setTimeout(createBlock, tIncr * 1000);
      }
    }());
  }

  self.stop = () => {
    clearTimeout(timeoutId);
  }

  return self;
}
