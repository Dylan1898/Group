 var StoreApp = angular.module("StoreApp", ["ngRoute"]);
StoreApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/list", {
            templateUrl: "views/list.html",
        })
        .when("/one/:id", {
            templateUrl: "views/single.html"
        })
        // .when("/users", {
        //     templateUrl: "views/users.html"
        // })
        // .when("/users/:user", {
        //     templateUrl: "views/user.html"
        // })

});


myApp.controller('getAllProductsController', function ($scope, $http, $location, $routeParams, $route) {
    $http.get("http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all")
        .then(function (response) {
            $scope.allProducts = response.data;
            console.log($scope.allProducts)
        })
        $scope.goToSingle = function (id) {
        $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all')
            .then(function () {
                $location.path('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one//' + id)
                id = ($location.path('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/' + id))
            })
    }
})


myApp.controller('oneProductController', function ($scope, $routeParams, $http, $location) {
    var currentId = $routeParams.id;
    console.log($routeParams.id)
    $http.get("http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/" + currentId)
        .then(function (response) {
            $scope.thisChar = response.data;
            console.log(response.data)
        })
})