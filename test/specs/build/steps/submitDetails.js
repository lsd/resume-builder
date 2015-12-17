var fs = require('fs');
var chai = require('chai').use(require('chai-fs')).use(require('chai-json-schema'));
var async = require('async');

var main = require('../../../../index');
var objects = require('../../../objects.json');
var selectors = require('../../../selectors-build.js');
var defaults = require('../../../defaults');
var build = require(main.src + '/data/build.json');

it('Submits Details Form', function (done) {
    browser
        .pause(defaults.async)
        .click(selectors.submitDetails)
        .pause(defaults.defaultWaitForElement)
        .call(done);
});
it.skip('Assert JSON Matches', function (done) {
    var buildSchema = {
        "title": "build schema v1",
        "type": "object",
        "required": [
            "background",
            "backgroundImage",
            "firstName",
            "lastName",
            "emailAddress",
            "phoneNumber",
            "gitHub",
            "objective",
            "education",
            "skills",
            "jobs"
        ],
        "properties": {
            "background": {
                "type": "string"
            },
            "backgroundImage": {
                "type": "string"
            },
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "emailAddress": {
                "type": "string"
            },
            "phoneNumber": {
                "type": "string"
            },
            "objective": {
                "type": "string"
            },
            "education": {
                "type": "object",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            },
            "skills": {
                "type": "object",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            },
            "jobs": {
                "type": "object",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                    "type": "string"
                }
            }
        }
    };
    browser
        .call(function () {
            return chai.assert.jsonSchema(build, buildSchema, 'JSON Mismatch!');
        })
        .call(done);
});