let nav = document.querySelector('nav');
console.log(nav);
let routerView = document.querySelector('.router-view');
console.log(routerView);

class Router {
	constructor() {
		this.routes = {};
		this.currentURL = '';
		this.refresh = this.refresh.bind(this);
		window.addEventListener('load', this.refresh);
		window.addEventListener('popstate', this.refresh);
		nav.addEventListener('click', e => {
			this.push(e.target.dataset.path);
		});
	}
	init(path) {
		history.replaceState({ path: path }, null, path);
		console.log(path);
		this.routes[path] && this.routes[path]();
	}
	addRoute(path, callback) {
		this.routes[path] = callback || function() {};
	}
	push(path) {
		history.pushState({ path: path }, null, path);
		this.refresh();
	}
	refresh() {
		let currentURL = location.pathname || '/';
		this.routes[currentURL] && this.routes[currentURL]();
	}
}

let router = new Router();
router.addRoute('/', () => {
	routerView.innerHTML = '<p>这是首页</p>';
});
router.addRoute('/a', () => {
	routerView.innerHTML = '<p>这是页A</p>';
});
router.addRoute('/b', () => {
	routerView.innerHTML = '<p>这是页B</p>';
});
router.addRoute('/c', () => {
	routerView.innerHTML = '<p>这是页C</p>';
});
router.addRoute('/d', () => {
	routerView.innerHTML = '<p>这是页D</p>';
});
router.init(location.pathname);
