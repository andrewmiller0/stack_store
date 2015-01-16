'use strict';

angular.module('stackStoreApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, orderItems) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.showCartDropdown = false;   
    $scope.orderItems = orderItems; 
    console.log($scope.getCurrentUser() + " hey");

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.adminChecker = function(){
      return Auth.isAdmin();
    }


    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleShowCartDropdown = function() {
      $scope.showCartDropdown = !$scope.showCartDropdown;
    }    
  });
