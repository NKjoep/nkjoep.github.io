!(function yeah() {
	document.addEventListener('readystatechange', function (ev) {
		var status = ev.target.readyState;
		if (status != 'complete') { return; }
		init();
	}, false);

	function init() {
		// welcome aboard
	}
})
