var fab = {
	v: {

	},
	f: {
		events: {
			blur: function (trg) {
				var child, children, i, sibling
				trg.classList.remove("focused")
				trg.parentNode.classList.remove("focused")
				children = trg.parentNode.childNodes
				for (i = 0; i < children.length; i += 1) {
					child = children[i]
					if (util.f.isElem(child)) {
						if (child.classList.contains("fab_group")) {
							sibling = child
							break
						}
					}
				}
				if (util.f.isElem(sibling)) {
					util.f.addStyle(sibling, ["Opacity","Top", "Transform"], ["", "", ""])
				}
			},
			focus: function (trg) {
				var child, children, i, sibling, size = 0
				trg.classList.add("focused")
				trg.parentNode.classList.add("focused")
				children = trg.parentNode.childNodes
				for (i = 0; i < children.length; i += 1) {
					child = children[i]
					if (util.f.isElem(child)) {
						if (child.classList.contains("fab_group")) {
							sibling = child
							break
						}
					}
				}
				if (util.f.isElem(sibling)) {
					children = sibling.childNodes
					for (i = 0; i < children.length; i += 1) {
						child = children[i]
						if (util.f.isElem(child)) {
							size += 42
						}
					}
					util.f.addStyle(sibling, ["Opacity", "Top","Transform"], [1, "-" + size + "px", "scale(1)"], "all")
				}
			},
			toggle: function (event) {
				var trg = util.f.getTrg(event)
				if (trg.classList.contains("focused")) {
					fab.f.events.blur(trg)
				} else {
					fab.f.events.focus(trg)
				}
			}
		},
		init: function () {
			document.getElementById("fab").addEventListener("click", fab.f.events.toggle)
			document.getElementById("actions").addEventListener("click", function () {
				fab.f.events.blur(document.getElementById("fab"))
			})
		}
	}
}, util = {
	f: {
		addStyle: function (elem, prop, val, vendors) {
			var i, ii, property, value
			if (!util.f.isElem(elem)) {
				elem = document.getElementById(elem)
			}
			if (util.f.isElem(elem)) {
				if (!util.f.isArray(prop)) {
					prop = [prop]
					val = [val]
				}
				for (i = 0; i < prop.length; i += 1) {
					var thisProp = String(prop[i]),
						thisVal = String(val[i])
					if (typeof vendors !== "undefined") {
						if (!util.f.isArray(vendors)) {
							vendors.toLowerCase() == "all" ? vendors = ["webkit", "moz", "ms", "o"] : vendors = [vendors]
						}
						for (ii = 0; ii < vendors.length; ii += 1) {
							elem.style[vendors[i] + thisProp] = thisVal
						}
					}
					thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1)
					elem.style[thisProp] = thisVal
				}
			}
		},
		getSize: function (elem, prop) {
			return parseInt(elem.getBoundingClientRect()[prop], 10)
		},
		getTrg: function (event) {
			event = event || window.event
			event.stopPropagation()
			if (event.srcElement) {
				return event.srcElement
			} else {
				return event.target
			}
		},
		isElem: function (elem) {
			return (util.f.isNode(elem) && elem.nodeType == 1)
		},
		isArray: function(v) {
			return (v.constructor === Array)
		},
		isNode: function(elem) {
			return (typeof Node === "object" ? elem instanceof Node : elem && typeof elem === "object" && typeof elem.nodeType === "number" && typeof elem.nodeName==="string" && elem.nodeType !== 3)
		}
	}
}
window.onload = fab.f.init
setTimeout(function (a) {
	fab.f.events.focus(a)
}, 2E1, document.getElementById("fab"))
