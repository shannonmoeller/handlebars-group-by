'use strict';

var handlebarsGroupBy = require('../index'),
	expect = require('expect.js'),
	fs = require('fs'),
	handlebars = require('handlebars'),
	map = require('map-stream'),
	vs = require('vinyl-fs');

describe('handlebars-group-by e2e', function () {
	var count;

	function toEqualExpected(datafile) {
		return function (file, cb) {
			count++;
			var data = require('./fixtures/data/' + datafile),
				expected = file.path.replace('fixtures', 'expected'),
				template = handlebars.compile(file.contents.toString()),
				retval = template(data);

			expect(retval).to.be(fs.readFileSync(expected, 'utf8'));
			cb(null, file);
		};
	}

	before(function () {
		handlebarsGroupBy(handlebars);
	});

	beforeEach(function () {
		count = 0;
	});

	it('should render layouts properly when posts sits in an array', function (done) {
		vs.src(__dirname + '/fixtures/group.hbs')
			.pipe(map(toEqualExpected('posts.json')))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(1);
				done();
			});
	});
	it('should render layouts properly when posts sits in an object', function (done) {
		vs.src(__dirname + '/fixtures/group.obj.hbs')
			.pipe(map(toEqualExpected('posts.obj.json')))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(1);
				done();
			});
	});
});
