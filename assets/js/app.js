!(function yeah() {
	document.addEventListener('readystatechange', function (ev) {
		var status = ev.target.readyState;
		if (status != 'complete') { return; }
		init();
	}, false);

	function init() {
		track();
		cookies();
	}

	function cookies(){
		var hideCookieNotice = window.localStorage.getItem('c') === '1';
		var cookieEl = document.querySelector('#cookie-ok');
		if (hideCookieNotice) { return; }
		cookieEl.style.display = '';
		cookieEl.addEventListener('click', function () {
			window.localStorage.setItem('c', '1');
			cookieEl.remove();
		});
	}
	function track() {
		if (window.location.hostname === 'localhost') { console.log('skip tracking'); return; }
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		gtag('js', new Date());
		gtag('config', 'UA-12754582-1');
	}
})();
