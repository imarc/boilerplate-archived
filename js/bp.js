;(function() {
	var focusedElement = null;
	var focus = function(evt) {
		var className = evt.target.className;
		if (className.match(/(^| )focusable( |$)/) && !className.match(/(^| )focused( |$)/)) {
			focusedElement = evt.target;
			evt.target.className += ' focused';
		} else {
			if (focusedElement) {
				focusedElement.className = focusedElement.className.replace(/(^| )focused( |$)/, ' ').trim();
				focusedElement = null;
			}
		}
	};
	document.addEventListener('click', focus);
})();
