/* eslint-env es6, browser */

(function initMarkdot () {
	"use strict"

	function stringContains (str, contains) {
		return str.indexOf(str) > -1
	}

	function replaceAll (str, replaceThis, withThis) {
		return str.split(replaceThis).join(withThis)
	}

	function wrapInHtmlTag (str, tag) {
		return `<${tag}>${str}</${tag}>`
	}

	function tokenToHtmlTag (str, token, tag) {
		let out, splitI

		const split = str.split(token)
			, nSplit = split.length

		out = ""

		for (splitI = 0; splitI < nSplit; splitI += 1) {
			const part = split[splitI]

			if (splitI % 2 === 0) {
				out += part
			} else {
				out += wrapInHtmlTag(part, tag)
			}
		}

		return out
	}

	function italicify (input) {
		return tokenToHtmlTag(input, "**", "em")
	}

	function boldify (input) {
		return tokenToHtmlTag(input, "*", "strong")
	}

	function headify (input) {
		console.log("headify")

		return wrapInHtmlTag(input, "h1")
	}

	function Markdot (input) {
		if (!this) {
			throw new TypeError("Missing new operator.")
		}

		const lines = input.split("\n")
			, nLines = lines.length

		this.output = (lines.map((line, lineNumber) => {
			// if the next line is blank
			const nextLine = lines[lineNumber + 1]

			console.log("line", line)
			console.log("nextLine", nextLine)

			if (!nextLine && lineNumber !== nLines - 1) {
				console.log("next line is blank!")
				// if this line does not end in a full stop
				if (line.trim().lastIndexOf(".") !== line.trim().length - 1) {
					console.log("this line does not end in a full stop")

					return wrapInHtmlTag(headify(line), "span")
				}
			}

			return wrapInHtmlTag(boldify(italicify(line)), "span")
		})).join("\n")
	}

	// export to global
	// FUTURE: support webworkers and node.js
	window.Markdot = Markdot
}())
