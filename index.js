/* eslint-env browser, es6 */
window.chainloadr("Markdot from ./markdot/markdot.js").then((Markdot) => {
	"use strict"

	console.info("Markdot", Markdot)

	const COLOUR_PRIMARY = "darkorange"
		, COLOUR_SECONDARY = "#ffbf71"
		, css = `
		:host {
			display: table;
		}

		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		textarea, div {
			display: table-cell;
			position: absolute;

			height: 100%;
			width: 100%;
			font-family: sans-serif;
			font-size: 1em;
			padding: 0.8em 0.8em;
			background: none;
			overflow-y: scroll;
			overflow-x: hidden;

			white-space: pre-wrap;
			word-wrap: break-word;

			transition: all 0.2s;
		}

		div {
			color: #333;
		}

		div::after {
			content: "EOF";
			font-size: 0;
		}

		/* syntax */

		div span {
			display: inline-block;
		}

		div span * {
			font-weight: inherit;
			font-size: inherit;
		}

		div span h1 {
			color: ${COLOUR_PRIMARY};
			text-shadow: ${COLOUR_PRIMARY} 0px 0px;
		}

		div span strong {
			text-shadow: black 0px 0px;
		}

		div span em::before, div span em::after,
		div span strong::before, div span strong::after {
			color: silver;
		}


		div span em::before, div span em::after {
			content: "**"
		}

		div span strong::before, div span strong::after {
			content: "*";
		}

		/* text area formatting */

		textarea {
			border: none;
			resize: none;
			z-index: 2;

			color: ${COLOUR_PRIMARY};
			-webkit-text-fill-color: transparent;
		}

		textarea::-webkit-input-placeholder {
			color: #ccc;
			text-shadow: none;
			-webkit-text-fill-color: initial;
		}

		textarea:not(:focus) ~ div {
			opacity: 0.5;
			background: whitesmoke;
		}

		textarea:focus {
			outline: none;
			/*outline: ${COLOUR_SECONDARY} solid 2px;*/
		}

		textarea::selection {
			background: ${COLOUR_SECONDARY};
		}

		textarea::-moz-selection {
			background: ${COLOUR_SECONDARY};
		}
	`

	customElements.define("x-jawe", class jawe extends HTMLElement {

		/*
			constructor

			An instance of the element is created or upgraded. Useful for initializing state, settings up event listeners, or creating shadow dom. See the spec for restrictions on what you can do in the constructor.
		*/

		constructor () {
			super()

			console.info("x-jawe constructed")

			const $shadowRoot = this.attachShadow({"mode": "open"})

			$shadowRoot.innerHTML = `
				<style>${css}</style>
			`

			this.$textarea = document.createElement("textarea")
			this.$print = document.createElement("div")

			$shadowRoot.appendChild(this.$textarea)
			$shadowRoot.appendChild(this.$print)

			this.dataset.initial = this.innerHTML.trim()
			this.innerHTML = ""

			this.$textarea.addEventListener("input", () => {
				this.dataset.document = encodeURIComponent(this.$textarea.value)
			})

			this.$textarea.addEventListener("focus", () => {
				this.$textarea.setAttribute("spellcheck", "true")
			})

			this.$textarea.addEventListener("blur", () => {
				this.$textarea.setAttribute("spellcheck", "false")
			})

			// link scroll
			this.$textarea.addEventListener("scroll", () => {
				this.$print.scrollTop = this.$textarea.scrollTop
			})
		}

		/*
			connectedCallback

			Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.
		*/

		connectedCallback () {
			this.dataset.document = this.dataset.initial
			console.log("connectedCallback")
		}

		/*
			disconnectedCallback

			Called every time the element is removed from the DOM. Useful for running clean up code (removing event listeners, etc.).
		*/

		disconnectedCallback () {
			console.log("attributeChangedCallback")
		}

		/*
			attributeChangedCallback(attrName, oldVal, newVal)

			An attribute was added, removed, updated, or replaced. Also called for initial values when an element is created by the parser, or upgraded. Note: only attributes listed in the observedAttributes property will receive this callback.
		*/

		static get observedAttributes () {
			return ["data-document"]
		}

		attributeChangedCallback (attrName, oldVal, newVal) {
			console.log("attributeChangedCallback")

			switch (attrName) {
				case "data-document": {
					const decoded = decodeURIComponent(newVal)

					this.$textarea.value = decoded
					this.$print.innerHTML = new Markdot(decoded).output

					break
				}

				default: {
					throw new Error(`No case for observed attribute "${attrName}"`)
				}
			}
		}

		/*
			adoptedCallback()

			The custom element has been moved into a new document (e.g. someone called document.adoptNode(el)).
		*/

		adoptedCallback () {
			console.log("adoptedCallback")
		}
	})
})
