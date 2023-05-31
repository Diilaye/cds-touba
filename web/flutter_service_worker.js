'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "7eccba52b18e7cd68db87edb1ef477bb",
"index.html": "154d8829df3d3433df72a4e03b901326",
"/": "154d8829df3d3433df72a4e03b901326",
"main.dart.js": "73f0f3105722e53e9a2083925a672109",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "7eaa25409738f3602bb0bb0de076ae82",
"assets/AssetManifest.json": "ce2a9dd842c896d94f612f5c7567d47e",
"assets/NOTICES": "46c770ee7bfa1332e0fef6aa62aebdca",
"assets/FontManifest.json": "f7f153a8aa1820c466d971827b809c82",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_paypal/lib/src/assets/img/cloud_state.png": "e695e021561a6d9754f06038b4d6b1d9",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/email.png": "bd625dd1e0173c6d799245ea79dbc3f0",
"assets/assets/images/user-interface.png": "c98cfbb2840a9c162502de7bf38b212b",
"assets/assets/images/evaluation.png": "e1ddd39c84d3da3e916ec6dfa54c43f8",
"assets/assets/images/texte-de-la-liste.png": "6c6bdeafc1a9d84e204ade3f9c2fa94a",
"assets/assets/images/facture-dachat.png": "041163055738c322152ad46ea88dd321",
"assets/assets/images/engrenage.png": "05a79c67109dce7fb1a006c062ea885b",
"assets/assets/images/chevron.png": "d652bd448faf60a70a096c6d9fc7189a",
"assets/assets/images/avatar.jpg": "09bdf7d0ffa9f762538a88aba0e16eb3",
"assets/assets/images/financement-participatif.png": "3b2fd30e3a9db067eca84939e329bf03",
"assets/assets/images/cds-logo.png": "6ee0b8ce25c02d0950ed54baf35bc1d5",
"assets/assets/images/5.jpeg": "695a6a4619e2573a4a14ad42cca23bb4",
"assets/assets/images/4.jpg": "ff69e18982e20767aee443c3af9f73f4",
"assets/assets/images/telephone-intelligent.png": "d530c5b396915011dd4fde84e539140b",
"assets/assets/images/ouvrir-le-menu.png": "59abfc7478c09990a9e9517812f7505d",
"assets/assets/images/2.jpg": "29fe323903677d992bdf4a8175bbba19",
"assets/assets/images/avion-en-papier.png": "753ee611abdd7a77b4d7f99a1234a2f5",
"assets/assets/images/3.jpg": "5ee917e803cb790b70d73af09919514c",
"assets/assets/images/1.jpg": "f926fefc087616923a22b54d4b6c8065",
"assets/assets/fonts/Dosis/Dosis-VariableFont_wght.ttf": "d5a308211f35a29c0f3588ae66ada82a",
"assets/assets/fonts/Dosis/static/Dosis-Medium.ttf": "e78a0ddd67a5c09569eb3dc4c7e2e451",
"assets/assets/fonts/Dosis/static/Dosis-Regular.ttf": "86c75ddac0edfda48afe48d1ef804cb9",
"assets/assets/fonts/Dosis/static/Dosis-Light.ttf": "225695470d7a3ce9be905f02b69cadaf",
"assets/assets/fonts/Dosis/static/Dosis-Bold.ttf": "b8724a9f9bde971809eeffa81476d776",
"assets/assets/fonts/Dosis/static/Dosis-ExtraBold.ttf": "dbe59d60a5712222e3e9c8539b771e34",
"assets/assets/fonts/Dosis/static/Dosis-SemiBold.ttf": "a9af2cea9b7b50f6f956fa89e16745a0",
"assets/assets/fonts/Dosis/static/Dosis-ExtraLight.ttf": "80e5d4f56a8701208afc3a75c7e2e5f3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
