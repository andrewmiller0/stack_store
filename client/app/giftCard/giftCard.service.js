'use strict';

angular.module('stackStoreApp')
  .factory('giftCard', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }, 
      save: function () {
      return meaningOfLife;
      }
    };
  });
