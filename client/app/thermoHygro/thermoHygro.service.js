'use strict';

angular.module('metAppApp')
  .service('thermoHygro', function ($resource) {
    return $resource('/api/thermoHygros/:id', {id: '@_id'});
  });
