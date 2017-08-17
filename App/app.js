// var StoreApp = angular.module("StoreApp", ['ngRoute'])

// StoreApp.config(function($routeProvider){
//     $routeProvider
//     .when("/home", {
//         templateUrl: "/App/views/home.html"
//     })
//     .when("/appearl", {
//         templateUrl: "/App/views/appearl.html"
//     })
//     .when("/checkout", {
//         templateUrl: "/App/views/checkout.html"
//     })
//     .when("/misc", {
//         templateUrl: "/App/views/misc.html"
//     })
//     .when("/invoice", {
//         templateUrl: "/App/views/invoice.html"
//     })
//     .when("/one/:id", {
//         templateUrl: "/App/views/single.html"
//     })
// });
// function openNav() {
//     document.getElementById("mySidenav").style.width = "350px";
//       }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0px";
//       }

// StoreApp.controller('AppearlCtl',  function($http, $scope,$routeParams, $location){
//     var id = $routeParams.id
//     $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=apparel', {
//     headers: {'Filter':'f03b5f86-8143-11e7-8e40-12dbaf53d968'}
// } )
//        .then(function(success){
//         $scope.data=success.data.data
//         console.log(success.data.data)
//     },  function(err) {
//         alert('something went wrong')
//     })
//     $scope.getId=function(id){
//         $location.path('/one/' + id)
//     }
// });
// StoreApp.controller('MiscCtl',  function($http, $scope,$routeParams, $location){
//     var id = $routeParams.id
//     $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=misc', {
//     headers: {'Filter':'f03b5f86-8143-11e7-8e40-12dbaf53d968'}
// } )
//        .then(function(success){
//         $scope.data=success.data.data
//         console.log(success.data.data)
//     },  function(err) {
//         alert('something went wrong')
//     })
//     $scope.getId=function(id){
//         $location.path('/one/' + id)
//     }
//     $scope.addtoCart=function(){
//         localStorage.setItem("ItemName", "this.name")
//         console.log(localStorage.getItem("ItemName"))
//     }
// });

// StoreApp.controller('SingleCtl',  function($http, $scope, $location, $routeParams){
//     var id = $routeParams.id
//     $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/' + id, {
//     headers: {'Filter':'f03b5f86-8143-11e7-8e40-12dbaf53d968'}
// } )
//        .then(function(success){
//         $scope.single=success.data.data
//     }, function(err){
//         alert('something went wrong')
//     })
// });
// StoreApp.filter('MakeMoney', function () {
//    return function (amount) {
//        console.log(amount)
//          var string= amount.toString()
//          console.log(string)
//        return string.slice(0,2)  
//    }
// });
// // USE ANGULAR CURRENCY PIPE

// document.addEventListener('DOMContentLoaded',function(){
// console.log('dom')
// })

var cart=[]
var StoreApp = angular.module("StoreApp", ['ngRoute'])

StoreApp.config(function($routeProvider){
$routeProvider
.when("/home", {
templateUrl: "/App/views/home.html"
})
.when("/appearl", {
templateUrl: "/App/views/appearl.html"
})
.when("/checkout", {
templateUrl: "/App/views/checkout.html"
})
.when("/misc", {
templateUrl: "/App/views/misc.html"
})
.when("/invoice", {
templateUrl: "/App/views/invoice.html"
})
.when("/one/:id", {
templateUrl: "/App/views/single.html"
})
});
function openNav() {
document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
document.getElementById("mySidenav").style.width = "0px";
}

StoreApp.controller('AppearlCtl', function($http, $scope,$routeParams, $location){
var id = $routeParams.id
$http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=apparel', {
headers: {'Filter':'f03b5f86-8143-11e7-8e40-12dbaf53d968'}
} )
.then(function(success){
$scope.data=success.data.data
console.log(success.data.data)
}, function(err) {
alert('something went wrong')
})
$scope.getId=function(id){
$location.path('/one/' + id)
}
});
StoreApp.controller('MiscCtl', function($http, $scope,$routeParams, $location){
var id = $routeParams.id
$http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=misc', {
headers: {'Filter':'f03b5f86-8143-11e7-8e40-12dbaf53d968'}
} )
.then(function(success){
$scope.data=success.data.data
console.log(success.data.data)
}, function(err) {
alert('something went wrong')
})
$scope.getId=function(id){
$location.path('/one/' + id)
}
});

StoreApp.controller('SingleCtl', function($http, $scope, $location, $routeParams){
var id = $routeParams.id
$http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/' + id, {
headers: {'Filter':'f03b5f86-8143-11e7-8e40-12dbaf53d968'}
} )
.then(function(success){
$scope.single=success.data.data
}, function(err){
alert('something went wrong')
})
$scope.addtoCart = function(){
    var cart = {
	item: $scope.name,
	price: $scope.price,
	image: $scope.image
};
var jsonStr = JSON.stringify( cart );
localStorage.setItem("cart", jsonStr)
// cart.push(localStorage)
console.log(localStorage)
// console.log('dero')
// console.log(cart)
}
});
StoreApp.filter('MakeMoney', function () {
return function (amount) {
console.log(amount)
var string= amount.toString()
console.log(string)
return string.slice(0,2)
}
});
// USE ANGULAR CURRENCY PIPE

// function addtoCart (){
// console.log(
// 'ldsakfjaldskjfdlas'
// )
// localStorage.setItem("ItemName", "this.name")
// console.log(localStorage.getItem("ItemName"))
// }
StoreApp.controller('CartCtl', function($http, $scope,$routeParams, $location){
var cartValue = sessionStorage.getItem( "cart" );
var cartObj = JSON.parse( cartValue );
$scope.theCart=cartObj
console.log(cartObj)
})