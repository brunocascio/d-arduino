var Services = angular.module('starter.services', []);

if (!window.cordova) 
  Services.constant('API_URL', 'http://dev.arduino:3000')
else
  Services.constant('API_URL', 'http://192.168.1.110:3000')

Services.factory('DispenserService', function($http, API_URL) {

  return {
    check: function(){
      return $http.get(API_URL + '/check');
    },
    feed: function(){
      return $http.get(API_URL + '/feed');
    }
  };

});
