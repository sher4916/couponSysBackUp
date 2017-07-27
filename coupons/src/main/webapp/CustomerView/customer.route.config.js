(function () {
    var module = angular.module("CouponSystemApp");
    module.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

     /**
    * Configures ui-router's states.
    * @memberof CouponSystemApp
    * @ngdoc config
    * @name config
    * @param {Service} $urlRouterProvider Watches $location and provides interface to default state
    * @param {Service} $stateProvider defers between different states
    */
    module.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
         .state("main", {
                url: "/main",
                templateUrl: "mainWelcome.html",
                controller: ""
            })
            // .state("top5", {
            //     url: "/top5",
            //     templateUrl: "top5.html",
               
            // })
            .state("getCoupons", {
                url: "/getAllPurchasedCoupons",
                templateUrl: "viewCoupons.html",
               
            })
            .state("couponsforpurchase", {
                url: "/couponsforpurchase",
                templateUrl: "purchaeCoupon.html",
                
            })
             .state("couponPurchased", {
                url: "/couponPurchased",
                templateUrl: "couponPurchased.html",
                
            })
            .state("viewCouponsByPrice", {
                url: "/viewCouponsByPrice",
                templateUrl: "viewCouponsByPrice.html",
                
            })
             .state("accountDetails", {
                url: "/accountDetails",
                templateUrl: "accountDetails.html",
            })
             .state("404", {
                url: "/404",
                templateUrl: "404.html",
                
            })
            ;

        $urlRouterProvider.when("", "/main"); // first browsing postfix is empty --> route it to /main
        $urlRouterProvider.otherwise('/404'); // when no switch case matches --> route to /404
    });

})();


