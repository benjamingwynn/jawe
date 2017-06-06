/* eslint-env browser */

	function keydown (event) {
		var isCtrlKeyDown = navigator.platform.indexOf("Mac") > -1 ? event.metaKey : event.ctrlKey,
			isSDown = (event.key && event.key === "s") || (event.keyCode || event.which) === 83 // falls back to keycode if no event.key

		if (isCtrlKeyDown && isSDown) {
			// prevent default event on newer browsers
			if (event.preventDefault) {
				event.preventDefault()
			}


			// ... your code here ...


			// prevent default event on older browsers
			return false
		}
	}

	// register the event
	if (document.addEventListener) {
		document.addEventListener("keydown", keydown)
	} else {
		document.onkeydown = keydown
	}


	document.addEventListener("keydown", function keydown (event) {
		if (navigator.platform === "MacIntel" ? event.metaKey : event.ctrlKey && event.key === "s") {
			event.preventDefault()

			// ... your code here ...
		}
	})
