'use strict';

var handlebarsGroupBy = require('../index'),
	expect = require('expect.js');

describe('handlebars-layouts spec', function () {
	var count,
		hbs,
		helpers;

	beforeEach(function () {
		count = 0;

		hbs = {
			registerHelper: function (h) {
				count++;
				expect(h.group).to.be.a(Function);
				helpers = h;
			}
		};
	});

	it('should register helper', function () {
		handlebarsGroupBy(hbs);

		expect(count).to.be(1);
	});

	describe('register', function () {
		it('should register helper', function () {
			handlebarsGroupBy.register(hbs);

			expect(count).to.be(1);
		});
	});

	describe('#group', function () {
		it('should use fallback values as needed', function () {
			handlebarsGroupBy(hbs);

			expect(count).to.be(1);
		});
	});
});
