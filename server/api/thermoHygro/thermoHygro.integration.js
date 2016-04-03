'use strict';

var app = require('../..');
import request from 'supertest';

var newThermoHygro;

describe('ThermoHygro API:', function() {

  describe('GET /api/thermoHygros', function() {
    var thermoHygros;

    beforeEach(function(done) {
      request(app)
        .get('/api/thermoHygros')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          thermoHygros = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      thermoHygros.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/thermoHygros', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/thermoHygros')
        .send({
          name: 'New ThermoHygro',
          info: 'This is the brand new thermoHygro!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newThermoHygro = res.body;
          done();
        });
    });

    it('should respond with the newly created thermoHygro', function() {
      newThermoHygro.name.should.equal('New ThermoHygro');
      newThermoHygro.info.should.equal('This is the brand new thermoHygro!!!');
    });

  });

  describe('GET /api/thermoHygros/:id', function() {
    var thermoHygro;

    beforeEach(function(done) {
      request(app)
        .get('/api/thermoHygros/' + newThermoHygro._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          thermoHygro = res.body;
          done();
        });
    });

    afterEach(function() {
      thermoHygro = {};
    });

    it('should respond with the requested thermoHygro', function() {
      thermoHygro.name.should.equal('New ThermoHygro');
      thermoHygro.info.should.equal('This is the brand new thermoHygro!!!');
    });

  });

  describe('PUT /api/thermoHygros/:id', function() {
    var updatedThermoHygro;

    beforeEach(function(done) {
      request(app)
        .put('/api/thermoHygros/' + newThermoHygro._id)
        .send({
          name: 'Updated ThermoHygro',
          info: 'This is the updated thermoHygro!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedThermoHygro = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThermoHygro = {};
    });

    it('should respond with the updated thermoHygro', function() {
      updatedThermoHygro.name.should.equal('Updated ThermoHygro');
      updatedThermoHygro.info.should.equal('This is the updated thermoHygro!!!');
    });

  });

  describe('DELETE /api/thermoHygros/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/thermoHygros/' + newThermoHygro._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thermoHygro does not exist', function(done) {
      request(app)
        .delete('/api/thermoHygros/' + newThermoHygro._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
