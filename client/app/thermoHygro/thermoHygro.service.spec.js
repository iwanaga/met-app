'use strict';

describe('Service: thermoHygro', function () {

  // load the service's module
  beforeEach(module('metAppApp.thermoHygro'));

  // instantiate service
  var thermoHygro;
  beforeEach(inject(function (_thermoHygro_) {
    thermoHygro = _thermoHygro_;
  }));

  it('should do something', function () {
    expect(!!thermoHygro).toBe(true);
  });

});
