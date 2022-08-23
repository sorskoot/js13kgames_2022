 const FRAC = 2.3283064365386963e-10; /* 2^-32 */

 class RNG {
     _seed = 0;
     _s0 = 0;
     _s1 = 0;
     _s2 = 0;
     _c = 0;
 
     /**
      * Seed the number generator
      * @param {Number} seed}
      */
     setSeed(seed) {
         seed = (seed < 1 ? 1/seed : seed);
 
         this._seed = seed;
         this._s0 = (seed >>> 0) * FRAC;
 
         seed = (seed*69069 + 1) >>> 0;
         this._s1 = seed * FRAC;
 
         seed = (seed*69069 + 1) >>> 0;
         this._s2 = seed * FRAC;
 
         this._c = 1;
         return this;
     }
 
     /**
      * @returns Pseudorandom value [0,1), uniformly distributed
      */
     getUniform() {
         let t = 2091639 * this._s0 + this._c * FRAC;
         this._s0 = this._s1;
         this._s1 = this._s2;
         this._c = t | 0;
         this._s2 = t - this._c;
         return this._s2;
     }
 
     /**
      * @param {number} lowerBound The lower end of the range to return a value from, inclusive
      * @param {number} upperBound The upper end of the range to return a value from, inclusive
      * @returns Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
      */
     getUniformInt(lowerBound, upperBound) {
         let max = Math.max(lowerBound, upperBound);
         let min = Math.min(lowerBound, upperBound);
         return Math.floor(this.getUniform() * (max - min + 1)) + min;
     }
  
     /**
      * @param {Array} array Array to pick a random item from
      * @returns Randomly picked item, null when length=0
      */
     getItem(array) {
         if (!array.length) { return null; }
         return array[Math.floor(this.getUniform() * array.length)];
     }
 }
 
 export default new RNG().setSeed(Date.now());