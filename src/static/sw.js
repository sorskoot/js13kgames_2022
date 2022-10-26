var CACHE = 'Deathkeeper-Offline';

const files = [
  '/',
  '/index.html',
  '/main.js',
  '/sprites.png',
  '/Level1.wav',
  '/Level2.wav',
  '/Level3.wav',
  '/skeleton_hit1.mp3',
  '/skeleton_hit2.mp3',
  '/skeleton_hit3.mp3',
  '/skeleton_hit4.mp3',
  '/favicon.ico',
  '/manifest.json',
  '/Ambience_Bell.wav',
  '/Ambience_BirdsFlying.wav',
  '/Ambience_Crow.wav',
  '/Ambience_Crow2.wav',
  '/Ambience_HowlingWind_Loop.wav',
  '/Ambience_Thunder.wav'
];

self.addEventListener('install', event => {
  precache().then(() => self.skipWaiting());
});

self.addEventListener('fetch', evt => {      
  if ( evt.request.url.match(/^.*(\?nocache)$/ )) {
    return false;
}
  evt.respondWith(fromNetwork(evt.request, 400).catch(() => {
      return fromCache(evt.request);
  }));

  evt.waitUntil(update(evt.request));
});

function precache() {
  return caches.open(CACHE).then(cache => {
      return cache.addAll(files);
  });
}

function fromNetwork(request, timeout) {

  return new Promise(function (fulfill, reject) {
      var timeoutId = setTimeout(reject, timeout);
      fetch(request.clone()).then(function (response) {
          clearTimeout(timeoutId);
          fulfill(response);
      }, reject);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request){
  // return if request is not GET
  if (request.method !== 'GET') return;
  // return if scheme is not http or https
  if (request.url.indexOf('http') !== 0) return;

  return new Promise((fulfill, reject)=>
      caches.open(CACHE).then(
          (cache)=> fetch(request.clone()).then(
              (response)=> cache.put(request, response).then(fulfill),
              reject
          ))
      )
}