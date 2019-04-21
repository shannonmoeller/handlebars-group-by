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

function transformObjToArrayIfNeeded(obj) {
	if (obj instanceof Array) {
		return obj;
	}
	if (obj instanceof Object) {
		// Would like to have run Object.values instead of below
		return Object.keys(obj).map(
			function (k) {
				return obj[k]
			});
	}
	return obj;
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
			list = transformObjToArrayIfNeeded(list);

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
