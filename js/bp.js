;(function() {
	var focusedElement = null;
	var focus = function(evt) {
		var className = evt.target.className;
		if (className.match(/(^| )focusable( |$)/) && !className.match(/(^| )focused( |$)/)) {
			focusedElement = evt.target;
			focusedElement.className += ' focused';
		} else {
			if (focusedElement) {
				focusedElement.className = focusedElement.className.replace(/(^| )focused( |$)/, ' ').trim();
				focusedElement = null;
			}
		}
	};
	var onEvent = 'click';
	if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
		onEvent = 'touchstart';
	}

	if (document.addEventListener) {
		document.addEventListener(onEvent, focus);
	} else {
		document.attachEvent(onEvent, focus);
	}
})();
