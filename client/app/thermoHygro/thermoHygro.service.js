'use strict';

angular.module('metAppApp.thermoHygro')
  .service('thermoHygro', function ($resource) {
    return $resource('/api/thermoHygros/:id', {id: @_id});
  });



