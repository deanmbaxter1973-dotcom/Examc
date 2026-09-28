// Exam Chronicle Service Worker v34
const CACHE="exam-chronicle-v34";
const SHELL=["./","./index.html","./manifest.json","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./logo.png","./favicon.ico"];
self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>{}));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET") return;
  const url=new URL(req.url);
  if(/api\.anthropic|openai\.com|azure\.com/.test(url.hostname)) return;
  if(req.mode==="navigate"){
    event.respondWith(fetch(req).then(res=>{
      const copy=res.clone(); caches.open(CACHE).then(cache=>cache.put("./index.html",copy)); return res;
    }).catch(()=>caches.match("./index.html").then(r=>r||caches.match("./"))));
    return;
  }
  if(url.origin===self.location.origin||url.pathname.match(/\/assets\/|\/icons\/|\/logo\.png|\.woff2?$|\.css$|\.js$/)){
    event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{
      if(res.ok||res.type==="opaque") caches.open(CACHE).then(cache=>cache.put(req,res.clone()));
      return res;
    }).catch(()=>new Response("Offline",{status:503,statusText:"Offline"}))));
  }
});
self.addEventListener("message",event=>{if(event.data==="skipWaiting") self.skipWaiting();});
