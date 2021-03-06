var headers = { headers: { 'Filter': 'f03b5f86-8143-11e7-8e40-12dbaf53d968' } }

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMCONTENTLOADED')
})
var cart = {};
var StoreApp = angular.module("StoreApp", ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl:"/App/views/home.html"
            })
            .when("/home", {
                templateUrl: "/App/views/home.html"
            })
            .when("/apparel", {
                templateUrl: "/App/views/apparel.html"
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
            });
    })

    .run(function ($rootScope) {
        var storageCart = localStorage.getItem('cart');
        if (storageCart === null) {
            localStorage.setItem('cart', JSON.stringify([]));
            $rootScope.theCart = [];
        } else {
            $rootScope.theCart = JSON.parse(storageCart);
        }
    });
function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    var y = document.getElementById("Total").innerHTML = (newTotal())
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    var y = document.getElementById("Total").innerHTML = (newTotal())
};

StoreApp.controller('ApparelCtl', function ($http, $scope, $routeParams, $location) {
    var id = $routeParams.id
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=apparel', {
        headers: { 'Filter': 'f03b5f86-8143-11e7-8e40-12dbaf53d968' }
    })
        .then(function (success) {
            $scope.data = success.data.data
            console.log(success.data.data)
        }, function (err) {
            alert('something went wrong')
        })
    $scope.getId = function (id) {
        $location.path('/one/' + id)
    }
});

StoreApp.controller('MiscCtl', function ($http, $scope, $routeParams, $location) {
    var id = $routeParams.id
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/all?category=misc', {
        headers: { 'Filter': 'f03b5f86-8143-11e7-8e40-12dbaf53d968' }
    })
        .then(function (success) {
            $scope.data = success.data.data
            console.log(success.data.data)
        }, function (err) {
            alert('something went wrong')
        })
    $scope.getId = function (id) {
        $location.path('/one/' + id)
    }
});

StoreApp.controller('SingleCtl', function ($http, $scope, $rootScope, $location, $routeParams) {
    var id = $routeParams.id
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/products/one/' + id, {
        headers: { 'Filter': 'f03b5f86-8143-11e7-8e40-12dbaf53d968' }
    })

        .then(function (success) {
            $scope.single = success.data.data
        }, function (err) {
            alert('something went wrong')
        })
    $scope.addProduct = function () {
        var product = {};
        product.image = $scope.single.image;
        product.name = $scope.single.name;
        product.price = $scope.single.price;
        addToCart(product);
    }

    function addToCart(product) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart)
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        $rootScope.theCart.push(product);
        var y = document.getElementById("Total").innerHTML = (newTotal())
    }
});

StoreApp.filter('MakeMoney', function () {
    return function (ammount) {
        var string = ammount.toString()
        return string.slice(0, -2)
    }
});

StoreApp.controller('CartController', function ($http, $scope, $rootScope, $routeParams, $location, $rootScope) {
    $scope.removeFromCart = function (items) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var index = cart.findIndex(function(c) {
            if (c.name === items.name) {
                return true;
            }
        });

        if (index == -1){
            return;
        }
        
        cart.splice(index, 1);
        $rootScope.theCart = cart;
        localStorage.setItem('cart', JSON.stringify(cart));
        var y = document.getElementById("Total").innerHTML = (newTotal())
    }
});
function newTotal() {
    console.log('total')
    var arr = []
    var cart = JSON.parse(localStorage.getItem('cart'))
    var sum = 0
    for (i = 0; i < cart.length; i++) {
        sum = sum + cart[i].price
        // console.log(sum)
    }
    var mon= '$'
    var End = '.00'
    var Sum2 = sum.toString()
    var Sum3 = Sum2.slice(0, -2)
    // return USD
    arr.push(mon)
    arr.push(Sum3)
    arr.push(End)
    var x = arr.join('')
    return x
    
    arr = []

};

function getTotal() {
    console.log('total')
    var arr = []
    var cart = JSON.parse(localStorage.getItem('cart'))
    var sum = 0
    for (i = 0; i < cart.length; i++) {
        sum = sum + cart[i].price
        // console.log(sum)
    }
    var End = '.00'
    var Sum2 = sum.toString()
    var Sum3 = Sum2.slice(0, -2)
    // return USD
    
    arr.push(Sum3)
    arr.push(End)
    var x = arr.join('')
    return parseFloat(x)
    
    arr = []

};

StoreApp.controller('InvoiceCtl', function ($http, $scope, $routeParams, $location) {
    $http.get('http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/all', {
        headers: { 'Filter': 'f03b5f86-8143-11e7-8e40-12dbaf53d968' }
    })
        .then(function (success) {
            $scope.invoices = success.data.data
            console.log($scope.invoices)
        }, function (err) {
            alert('something went wrong')
        })
});


var y = document.getElementById("Total").innerHTML = (newTotal())


StoreApp.controller("CheckOut", function ($scope, $rootScope, $http, myFactory) {

    insertdata = function () {
        var data= {'price':  getTotal()}
        console.log(data)
        console.log('attempting to post')
        $http({
            method: 'POST',
            url: 'http://iambham-store-dev.us-east-1.elasticbeanstalk.com/api/v1/invoices/',
            data: data,
            headers: { 'Filter': 'f03b5f86-8143-11e7-8e40-12dbaf53d968' }
        });
    }
    var Clicked = document.getElementById('exp')
    Clicked.addEventListener('click', function () {
        var CC = cardNum = document.getElementById('cc').value
        console.log(CC)
        myFactory.getCardBrand(CC);
    })
    clearCart= function(){
        var cart = JSON.parse(localStorage.getItem('cart'));
        
        cart = []
        $rootScope.theCart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
StoreApp.factory('myFactory', function () {

    var service = {};
    service.getCardBrand = function (CC) {
        var brand,
            patterns = [
                { name: 'amex', pattern: /^3[47]/ },
                { name: 'discover', pattern: /^(6011|65|64[4-9]|622)/ },
                { name: 'mastercard', pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/ },
                { name: 'visa', pattern: /^4/ }
            ];
        patterns.some(function (p) {
            if (p.pattern.test(CC)) {
                brand = p.name;
                return true;
            }
        });
        if (brand === "discover") {
            var discover = document.getElementById("discover");
            $(discover).addClass('ccbackground');
            console.log("This is a discover");
        } else if (brand === "visa") {
            console.log("this is a visa");
            var visa = document.getElementById("visa");
            $(visa).addClass('ccbackground');
        } else if (brand === "amex") {
            var amex = document.getElementById("amex");
            $(amex).caddClass('ccbackground')
            console.log("this is amex");
        } else if (brand === "mastercard") {
            var mastercard = document.getElementById("mastercard");
            $(mastercard).addClass('ccbackground')
            console.log("this is a mastercard");
        }
    }
    return service;
});
var pay = document.getElementById('pay')
pay.addEventListener('click', function () {
    var discover = document.getElementById("discover");
    $(discover).removeClass('ccbackground');
    var visa = document.getElementById("visa");
    $(visa).removeClass('ccbackground');
    var amex = document.getElementById("amex");
    $(amex).removeClass('ccbackground');
    var mastercard = document.getElementById("mastercard");
    $(mastercard).removeClass('ccbackground');
})
