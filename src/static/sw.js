var CACHE = 'Deathkeeper-Offline';

const files = [];

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