/* eslint-env browser, es6 */

(function initJawe () {
	"use strict"

	console.info("initJawe!")

	customElements.define("x-jawe", class jawe extends HTMLElement {

		/*
			constructor

			An instance of the element is created or upgraded. Useful for initializing state, settings up event listeners, or creating shadow dom. See the spec for restrictions on what you can do in the constructor.
		*/

		constructor () {
			super()

			console.info("x-jawe constructed")

			const shadowRoot = this.attachShadow({"mode": "open"})

			shadowRoot.innerHTML = `
				<style>:host { ... }</style>
			`

			this.$textarea = document.createElement("textarea")
			this.$print = document.createElement("div")

			shadowRoot.appendChild(this.$textarea)
			shadowRoot.appendChild(this.$print)
			// ta.value = this.dataset.document

			this.dataset.initial = this.innerHTML.trim()
			this.innerHTML = ""

			this.$textarea.addEventListener("input", (event) => {
				console.log(event)
				this.dataset.document = this.$textarea.value
			})

			this.addEventListener("click", (event) => {
				console.info("event", event)
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
					this.$textarea.value = newVal
					this.$print.innerHTML = newVal

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
}())
