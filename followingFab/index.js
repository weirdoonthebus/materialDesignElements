//utils...real stuff below
var util = {
	addStyle: function (elem, prop, val, vendors) {
		var i, ii, property, value
		if (!util.isElem(elem)) {
			elem = document.getElementById(elem)
		}
		if (util.isElem(elem)) {
			if (!util.isArray(prop)) {
				prop = [prop]
				val = [val]
			}
			for (i = 0; i < prop.length; i += 1) {
				var thisProp = String(prop[i]),
					thisVal = String(val[i])
				if (typeof vendors !== "undefined") {
					if (!util.isArray(vendors)) {
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
		if (!util.isElem(elem)) {
			elem = document.getElementById(elem)
		}
		var size
		typeof prop !== "undefined" ? size = parseInt(elem.getBoundingClientRect()[prop], 10) : size = elem.getBoundingClientRect()
		return size
	},
	isArray: function(v) {
		return (v.constructor === Array)
	},
	isElem: function (elem) {
		return (util.isNode(elem) && elem.nodeType == 1)
	},
	isNode: function(elem) {
		return (typeof Node === "object" ? elem instanceof Node : elem && typeof elem === "object" && typeof elem.nodeType === "number" && typeof elem.nodeName==="string" && elem.nodeType !== 3)
	}
},
float = {
	v: {
		action: document.getElementById("action"),
		action_pos: 0,
		body: document.getElementsByTagName("body")[0],
		body_height: 0,
		card: document.getElementById("follow_me"),
		card_height: 0,
		card_top: 0,
		last_scroll: 0,
		resizing: false,
		scroll_dif: 0,
		scroll_pos: 0,
		scrolling: false
	},
	f: {
		init: function () {
			float.v.body_height = util.getSize(float.v.body, "height")
			float.v.card_height = util.getSize(float.v.card, "height")
			util.addStyle(float.v.action, "transform", "translateY(0)")
			window.addEventListener("scroll", float.f.throttle.scroll)
			window.addEventListener("resize", float.f.throttle.resize)
		},
		scroll: {
			fab: {
				down: function () {
					var int
					float.v.action_pos = float.v.action.offsetTop
					console.log(float.v.action_pos)
					int = parseInt(float.v.action.style.transform.replace("translateY(", "").replace("px)", ""), 10) + float.v.scroll_dif
					if (float.v.scroll_pos > float.v.card_top + int) {
							if (int < float.v.card_height - 80) {
								util.addStyle(float.v.action, "Transform", "translateY(" + int + "px)", "all")
							}
					}
				},
				up: function () {
					var int
					float.v.action_pos = float.v.action.offsetTop
					int = parseInt(float.v.action.style.transform.replace("translateY(", "").replace("px)", ""), 10) + float.v.scroll_dif
					if (float.v.scroll_pos < float.v.card_height - float.v.card_top + 72) {
						if (float.v.action_pos <= float.v.body_height - 8) {
							if (int > 0) {
								util.addStyle(float.v.action, "Transform", "translateY(" + int + "px)", "all")
							}
						}
					}
				}
			}
		},
		throttle: {
			scroll: function () {
				if (!float.v.scrolling) {
					float.v.scrolling = true
					setTimeout(function () {
						float.v.scrolling = false
						float.v.scroll_pos = window.scrollY
						float.v.scroll_dif = float.v.scroll_pos - float.v.last_scroll
				float.v.last_scroll = float.v.scroll_pos
						if (float.v.scroll_dif > 0) {
							float.f.scroll.fab.down()
						} else {
							float.f.scroll.fab.up()
						}
					}, 10)
				}
			},
			resize: function () {
				if (!float.v.resizing) {
					float.v.resizing = true
					setTimeout(function () {
						float.v.resizing = false
						float.v.body_height = util.getSize(float.v.body, "height")
						float.v.card_height = util.getSize(float.v.card, "height")
					}, 10)
				}
			}
		}
	}
}
float.f.init()
