'use strict';

const request = require('supertest');

const app = require('../app.js');

describe('Home', function(done) {
  it('should return 200', function() {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
