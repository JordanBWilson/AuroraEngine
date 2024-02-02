const version = 'v1';
const masonMvpCache = `mason-mvp-${version}`;
const assets = [
	'/',
	'/index.html',
	'/favicon.ico',
	'/js/mason.js',
	'/js/mason_arena.js',
	'/js/mason_cut_scenes.js',
	'/js/mason_factory.js',
	'/js/mason_globals.js',
	'/js/mason_home.js',
	'/js/mason_maul.js',
	'/js/mason_tutorial.js',
	'/assets/font/VT323-Regular.ttf',
	'/assets/icons/apple-touch-icon.png',
	'/assets/icons/masonIcon-348.png',
	'/assets/icons/masonIcon-72.png',
	'/assets/icons/masonIcon-96.png',
	'/assets/icons/masonIcon-128.png',
	'/assets/icons/masonIcon-144.png',
	'/assets/icons/masonIcon-152.png',
	'/assets/icons/masonIcon-192.png',
	'/assets/icons/masonIcon-512.png',
	'/assets/images/brick.png',
	'/assets/images/grass.png',
	'/assets/images/Lost_City.png',
	'/assets/images/New_World_Chassis_Walk.gif',
	'/assets/images/New_World_Head_Walk.gif',
	'/assets/images/New_World_Left_Arm_Walk.gif',
	'/assets/images/New_World_Left_Leg_Walk.gif',
	'/assets/images/New_World_Right_Arm_Walk.gif',
	'/assets/images/New_World_Right_Leg_Walk.gif',
	'/assets/images/New_World_Walk.gif',
	'/assets/images/NW_Harvester_Chassis_Walk.gif',
	'/assets/images/NW_Harvester_Head_Walk.gif',
	'/assets/images/NW_Harvester_Left_Arm_Walk.gif',
	'/assets/images/NW_Harvester_Left_Leg_Walk.gif',
	'/assets/images/NW_Harvester_Right_Arm_Walk.gif',
	'/assets/images/NW_Harvester_Right_Leg_Walk.gif',
	'/assets/images/NW_Scout_Chassis_Walk.gif',
	'/assets/images/NW_Scout_Head_Walk.gif',
	'/assets/images/NW_Scout_Left_Arm_Walk.gif',
	'/assets/images/NW_Scout_Left_Leg_Walk.gif',
	'/assets/images/NW_Scout_Right_Arm_Walk.gif',
	'/assets/images/NW_Scout_Right_Leg_Walk.gif',
	'/assets/images/NW_Scrapper_Chassis_Walk.gif',
	'/assets/images/NW_Scrapper_Head_Walk.gif',
	'/assets/images/NW_Scrapper_Left_Arm_Walk.gif',
	'/assets/images/NW_Scrapper_Left_Leg_Walk.gif',
	'/assets/images/NW_Scrapper_Right_Arm_Walk.gif',
	'/assets/images/NW_Scrapper_Right_Leg_Walk.gif',
	'/assets/images/Wild_Tree.png',
	'/assets/sounds/add_scrap.wav',
	'/assets/sounds/arena_ready.wav',
	'/assets/sounds/build_tower.wav',
	'/assets/sounds/emp_explosion.wav',
	'/assets/sounds/robot_hit.wav',
	'/assets/sounds/scrapping.wav',
	'/assets/sounds/select.wav',
	'/assets/sounds/sell.wav',
	'/assets/sounds/tower_explosion.wav',
	'/assets/sounds/tower_shoot.wav',
	'/assets/sounds/wall_drop.wav',
	'/assets/splashscreens/ipadpro1_splash.png',
	'/assets/splashscreens/ipadpro2_splash.png',
	'/assets/splashscreens/ipadpro3_splash.png',
	'/assets/splashscreens/ipad_splash.png',
	'/assets/splashscreens/iphone5_splash.png',
	'/assets/splashscreens/iphone6_splash.png',
	'/assets/splashscreens/iphoneplus_splash.png',
	'/assets/splashscreens/iphonexr_splash.png',
	'/assets/splashscreens/iphonexsmax_splash.png',
	'/assets/splashscreens/iphonex_splash.png',
  //"/",
  //"/index.html",
  //"/css/style.css",
  //"/js/app.js",
  //"/images/coffee1.jpg",
  //"/images/coffee2.jpg",
  //"/images/coffee3.jpg",
  //"/images/coffee4.jpg",
  //"/images/coffee5.jpg",
  //"/images/coffee6.jpg",
  //"/images/coffee7.jpg",
  //"/images/coffee8.jpg",
  //"/images/coffee9.jpg",
];
// On install, cache the static resources
self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(masonMvpCache);
			cache.addAll(assets);
		})()
	);
});
// delete old caches on activate
self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const names = await caches.keys();
			await Promise.all(
				names.map((name) => {
				if (name !== masonMvpCache) {
					return caches.delete(name);
				}
			}));
			await clients.claim();
		})()
	);
});
// On fetch, intercept server requests
// and respond with cached responses instead of going to network
self.addEventListener('fetch', (event) => {
	// As a single page app, direct app to always go to cached home page.
	if (event.request.mode === 'navigate') {
		event.respondWith(caches.match('/'));
		return;
	}
	// For all other requests, go to the cache first, and then the network.
	event.respondWith(
		(async () => {
			const cache = await caches.open(masonMvpCache);
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) {
				// Return the cached response if it's available.
				return cachedResponse;
			}
			// If resource isn't in the cache, return a 404.
			return new Response(null, { status: 404 });
		})()
	);
});
