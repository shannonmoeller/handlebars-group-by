!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.handlebarsGroupBy=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function get(obj, prop) {
	var parts = prop.split('.'),
		last = parts.pop();

	while ((prop = parts.shift())) {
		obj = obj[prop];

		if (obj == null) {
			return;
		}
	}

	return obj[last];
}

function noop() {
	return '';
}

/**
 * Registers a group helper on an instance of Handlebars.
 *
 * @type {Function}
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Handlebars instance.
 */
function groupBy(handlebars) {
	var helpers = {
		/**
		 * @method group
		 * @param {Array} list
		 * @param {Object} options
		 * @param {Object} options.hash
		 * @param {String} options.hash.by
		 * @return {String} Rendered partial.
		 */
		group: function (list, options) {
			options = options || {};

			var fn = options.fn || noop,
				inverse = options.inverse || noop,
				hash = options.hash,
				prop = hash && hash.by,
				keys = [],
				groups = {};

			if (!prop || !list || !list.length) {
				return inverse(this);
			}

			function groupKey(item) {
				var key = get(item, prop);

				if (keys.indexOf(key) === -1) {
					keys.push(key);
				}

				if (!groups[key]) {
					groups[key] = {
						value: key,
						items: []
					};
				}

				groups[key].items.push(item);
			}

			function renderGroup(buffer, key) {
				return buffer + fn(groups[key]);
			}

			list.forEach(groupKey);

			return keys.reduce(renderGroup, '');
		}
	};

	handlebars.registerHelper(helpers);

	return handlebars;
}

/**
 * Assemble-compatible register method.
 *
 * @method register
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Handlebars instance.
 * @static
 */
groupBy.register = groupBy;

// Legacy
module.exports = groupBy;

},{}]},{},[1])(1)
});