'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.orderItems = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/lineItems').success(function(lineItems){
      $scope.orderItems = lineItems;
      console.log(lineItems);

    });

    $scope.cartTotal = function() {
      return "$10,000"
    }




    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };



    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
