'use strict';

angular.module('metAppApp.auth', [
  'metAppApp.constants',
  'metAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
