export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","favicon.svg","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","logo.png","manifest.json","sound/execute.mp3","sound/load.mp3","sound/upload.mp3"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".mp3":"audio/mpeg"},
	_: {
<<<<<<< HEAD
		client: {start:"_app/immutable/entry/start.DzMlJffu.js",app:"_app/immutable/entry/app.FwF6dm0c.js",imports:["_app/immutable/entry/start.DzMlJffu.js","_app/immutable/chunks/Dh2BxOmn.js","_app/immutable/chunks/CkB3rulY.js","_app/immutable/chunks/DRLRay5q.js","_app/immutable/entry/app.FwF6dm0c.js","_app/immutable/chunks/D4_Pyaou.js","_app/immutable/chunks/CkB3rulY.js","_app/immutable/chunks/CloBQR8U.js","_app/immutable/chunks/CGTM0tl8.js","_app/immutable/chunks/B3zu0t7a.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
=======
		client: {start:"_app/immutable/entry/start.CTV7Y5wS.js",app:"_app/immutable/entry/app.DkUaamf1.js",imports:["_app/immutable/entry/start.CTV7Y5wS.js","_app/immutable/chunks/DuBU2VAN.js","_app/immutable/chunks/DnJUyzKp.js","_app/immutable/chunks/CbkD_G3i.js","_app/immutable/entry/app.DkUaamf1.js","_app/immutable/chunks/BM_Jpxoe.js","_app/immutable/chunks/DnJUyzKp.js","_app/immutable/chunks/DYmd7MfC.js","_app/immutable/chunks/B9M8D51k.js","_app/immutable/chunks/32KD8V7I.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/contracts",
				pattern: /^\/api\/contracts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/contracts/_server.ts.js'))
			},
			{
				id: "/api/contracts/[id]",
				pattern: /^\/api\/contracts\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/contracts/_id_/_server.ts.js'))
			},
			{
				id: "/api/settings",
				pattern: /^\/api\/settings\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/settings/_server.ts.js'))
			},
			{
				id: "/api/uplink",
				pattern: /^\/api\/uplink\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/uplink/_server.ts.js'))
			},
			{
				id: "/assign",
				pattern: /^\/assign\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/morgue",
				pattern: /^\/morgue\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/registry",
				pattern: /^\/registry\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
