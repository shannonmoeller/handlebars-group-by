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
				groups = {},
				isArray = list instanceof Array,
				isObject = list instanceof Object;

			if (!prop || !list || !(isArray || isObject))
			{
				return inverse(this);
			}

			function groupKeyObj(itemkey) {
				var item = list[itemkey],
					groupKey = get(item, prop);

				if (keys.indexOf(groupKey) === -1) {
					keys.push(groupKey);
				}

				if (!groups[groupKey]) {
					groups[groupKey] = {
						value: groupKey,
						items: {}
					};
				}
				groups[groupKey].items[itemkey] = item;
			}

			function groupKeyArray(item) {
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

			if (isArray) {
				list.forEach(groupKeyArray);
			}
			else {
				Object.keys(list).forEach(groupKeyObj);
			}
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
