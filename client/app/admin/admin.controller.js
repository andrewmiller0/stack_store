'use strict';

angular.module('stackStoreApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    $scope.getCategories = function() {
      $http.get("/api/categorys").success(function(cat) {
        $scope.cat = cat;
      })
    }
    $scope.getCategories();

    $scope.itemCat = [];

    $scope.newCatName = "";
    $scope.newCatPop;

    $scope.getItems = function() {
      $http.get("/api/items").success(function(items) {
        $scope.items = items;
      })
    }
    $scope.getItems()

    $scope.getItemCats = function(item) {

    }

    filepicker.setKey("ACZTMJqmFR7K1eeuAVsurz");



    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.title = "";
    $scope.image = false;
    $scope.description = "";
    $scope.message = "";
    $scope.categories = [];

    $scope.toggleCat = function(cat) {
      console.log("this cat", cat);
      if ($scope.categories.indexOf(cat._id) === -1) {
        $scope.categories.push(cat._id)
      } else {
        var index = $scope.categories.indexOf(cat);
        $scope.categories.splice(index, 1)
      }
    }

    $scope.addCategory = function() {
      var newCat = {
        name: $scope.newCatName,
        popularity: $scope.newCatPop
      }
      $scope.cat.push(newCat);

      $http.post('/api/categorys/', {
        name: $scope.newCatName,
        popularity: $scope.newCatPop
      })

    };

    // var CategorySchema = new Schema({
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   popularity: Number
    // });


    $scope.pickFile = function (item) {
      if (item) {
        filepicker.pick(
          function(Blob){
            item.image = Blob.url;
            $scope.updateItemDetail(item);

          }
        );
      } else {
        filepicker.pick(
          function(Blob){
            $scope.image = Blob.url;
            $scope.$apply();
          }
        );
      }
    }

    $scope.deleteItem = function(item) {
      $http.delete("/api/items/" + item._id);
      $scope.getItems();
    }

    $scope.submitItem = function() {
      $http.post('api/items', {
        title: $scope.title,
        image: $scope.image,
        description: $scope.description,
        defaultMessage: $scope.message,
        categories: $scope.categories
      }).success(function(err, item) {
        if (err) console.log(err);
      })
    }

    $scope.updateItemDetail = function(item, category) {
      var itemCatArray = []; // This has all the IDs of the categories in the item
      item.categories.forEach(function(catObj) {
        itemCatArray.push(catObj._id);
      });
      item.categories = itemCatArray

      if (category) {
        category = JSON.parse(category.category)._id;
        if (item.categories.indexOf(category) === -1) {
          item.categories.push(category);
        }
      }
      console.log("this is the imte we send", item);
      $http.put("/api/items/" + item._id, item).success(function(item){

        console.log("this is item being sent",item);
        $scope.getItems();

      });
    }

    $scope.deleteCat = function(item, catId) {
      var itemCatArray = []; // This has all the IDs of the categories in the item
      item.categories.forEach(function(category) {
        itemCatArray.push(category._id);
      })
      var index = itemCatArray.indexOf(catId); //this is the index of what we want to remove
      itemCatArray.splice(index, 1);
      item.categories = itemCatArray;
      $scope.updateItemDetail(item);
      $scope.getItems();
    }

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
