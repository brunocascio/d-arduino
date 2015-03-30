

angular.module('starter.controllers', [])

.controller('TabController', function($scope, $rootScope, $ionicLoading, DispenserService) {
  $rootScope.connected = false;

  $scope.check = function() {

    $ionicLoading.show();

    DispenserService.check().success(function(data, status, headers, config) {
      $rootScope.connected = true;
      $ionicLoading.hide();
    }).error(function(data, status, headers, config) {
      $rootScope.connected = false;
      $ionicLoading.hide();
    });
  };

  $scope.check();

})

.controller('DashCtrl', function($scope) {})

.controller('ActionsCtrl', function($rootScope, $scope, $timeout, DispenserService) {
  $scope.settings = {
    food: false,
    water: false,
  };

  $scope.feed = function () {

    $scope.operations = {
      feed: {
        failed: false
      }
    };

  	if ($scope.settings.food) {
  		DispenserService.feed()
      .success(
        function(data, status, headers, config) {
    			// this callback will be called asynchronously
    			// when the response is available
          $scope.operations.feed.failed = false;
      		$scope.settings.food = false;
  		  }
      ).error(
        function(data, status, headers, config) {
  		    // called asynchronously if an error occurs
  		    // or server returns response with an error status.
          $scope.operations.feed.failed = true;
          $timeout(function() {
            $scope.settings.food = false;
          }, 1000);
  		  }
      );
  	}
  }
});
