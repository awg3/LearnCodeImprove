'use strict';

angular.module('powerChessApp.auth', [
  'powerChessApp.constants',
  'powerChessApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
