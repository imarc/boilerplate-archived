;(function() {
	var attr = 'focus',
		dataAttr = 'data-'+attr,
		supportsTouch = ('ontouchstart' in window || navigator.msMaxTouchPoints),
		trigger = supportsTouch ? 'touchstart' : 'click';

	// ie8 uses attachEvent
	var addEvent = function(name, listener) {
		!!(document.addEventListener)
			? document.addEventListener(name, listener)
			: document.attachEvent('on'+name, listener);
	};

	// add the event listener
	addEvent(trigger, function(e) {
		var elem = e.target;

		// move up the node tree and discover the selector
		while (elem.attributes && !(dataAttr in elem.attributes)) {
			elem = elem.parentNode;
		}

		if (!elem.attributes) {
			// the Document doesn't have attributes, so
			// we can safely close the focusable area
			elem = document.querySelector('['+dataAttr+']');

			if (elem) {
				elem.setAttribute(dataAttr, '');
			}

			return;
		}

		// we're inside the focusable area, enable it
		elem.setAttribute(dataAttr, attr);	
	});
})();
