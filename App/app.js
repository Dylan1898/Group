var cart = {};
cart.products = [];

localStorage.setItem('cart', JSON.stringify(cart));
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
$scope.addProduct= function(){
var product = {};
product.image = $scope.single.image
product.name = $scope.single.name
product.price = $scope.single.price
console.log(product)
addToCart(product)
// console.log('working')
}
// $scope.addtoCart = function(){
// var cart = {
//  item: $scope.single.name,
//  price: $scope.single.price,
//  image: $scope.single.image
// };
// var jsonStr = JSON.stringify( cart );
// localStorage.setItem("cart", jsonStr)
// // cart.push(localStorage)
// console.log(localStorage)
// // console.log('dero')
// // console.log(cart)
// }
});
StoreApp.filter('MakeMoney', function () {
return function (amount) {
console.log(amount)
var string= amount.toString()
console.log(string)
return string.slice(0,2)
}
});
StoreApp.controller('CartCtl', function($http, $scope,$routeParams, $location){
// var cartValue = localStorage.getItem( 'cart' );
// var cartObj = JSON.parse( cartValue );
var cart = JSON.parse(localStorage.getItem('cart'))
console.log(cart.products)
$scope.theCart=cart.products


})


function addToCart(product) {
// Retrieve the cart object from local storage
if (localStorage && localStorage.getItem('cart')) {
var cart = JSON.parse(localStorage.getItem('cart'));

cart.products.push(product);
console.log(cart.products)
localStorage.setItem('cart', JSON.stringify(cart));
// console.log(cart)

}
}