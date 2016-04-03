'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var thermoHygroCtrlStub = {
  index: 'thermoHygroCtrl.index',
  show: 'thermoHygroCtrl.show',
  create: 'thermoHygroCtrl.create',
  update: 'thermoHygroCtrl.update',
  destroy: 'thermoHygroCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var thermoHygroIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './thermoHygro.controller': thermoHygroCtrlStub
});

describe('ThermoHygro API Router:', function() {

  it('should return an express router instance', function() {
    thermoHygroIndex.should.equal(routerStub);
  });

  describe('GET /api/thermoHygros', function() {

    it('should route to thermoHygro.controller.index', function() {
      routerStub.get
        .withArgs('/', 'thermoHygroCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/thermoHygros/:id', function() {

    it('should route to thermoHygro.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'thermoHygroCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/thermoHygros', function() {

    it('should route to thermoHygro.controller.create', function() {
      routerStub.post
        .withArgs('/', 'thermoHygroCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/thermoHygros/:id', function() {

    it('should route to thermoHygro.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'thermoHygroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/thermoHygros/:id', function() {

    it('should route to thermoHygro.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'thermoHygroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/thermoHygros/:id', function() {

    it('should route to thermoHygro.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'thermoHygroCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
