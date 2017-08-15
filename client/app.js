var StoreApp = angular.module("StoreApp", ['ngRoute'])

StoreApp.config(function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl: "./views/home.html"
    })
    .when("/appearl", {
        templateUrl: "./views/appearl.html"
    })
    .when("/checkout", {
        templateUrl: "./views/checkout.html"
    })
    .when("/misc", {
        templateUrl: "./views/misc.html"
    })
    .when("/invoice", {
        templateUrl: "./views/invoice.html"
    })
    .when("/one/:id", {
        templateUrl: "./views/single.html"
    })
});

StoreApp.controller('AppearlCtl',  function($http, $scope,$routeParams, $location){
    var id = $routeParams.id
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all', {
    headers: {'Filter':'f03b5f86-8143-11e7-8e40-12dbaf53d968'}
} )
       .then(function(success){
        $scope.data=success.data
    },  function(err) {
        alert('something went wrong')
    })
    $scope.getId=function(id){
        $location.path('/one/' + id)
    }
});

StoreApp.controller('MiscCtl',  function($http, $scope, $routeParams, $location){
        var id = $routeParams.id
        $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/misc')
        .then(function(success){
         $scope.data=success.data
     },  function(err){
         alert('something went wrong')
     })
     $scope.getId=function(id) {
         $location.path('/one/' + id)
     }
});

StoreApp.controller('SingleCtl',  function($http, $scope, $location, $routeParams){
    var id = $routeParams.id
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one' + id)
       .then(function(success){
        $scope.single=success.data
    })
});