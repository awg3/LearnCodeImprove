angular.module('PowerChess', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService', 'storyCtrl', 'storyService'])

.config(function($httpProvider){
    // constantly push token to http request, in order to check our header has a token
    $httpProvider.interceptors.push('AuthInterceptor');
});