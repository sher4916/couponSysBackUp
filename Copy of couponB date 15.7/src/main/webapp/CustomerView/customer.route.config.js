(function () {
    var module = angular.module("CouponSystemApp");
    //module.controller("GetCouponsCtrl", GetCouponsCtrlCtor);
    //  app.controller("PurchaseCouponCtrl", PurchaseCouponCtor);
    //  app.controller("ChocolateCtrl", ChocolateCtrlCtor);
    //  app.controller("FooterCtrl", FooterCtrlCtor);

    // http://stackoverflow.com/questions/41211875/angularjs-1-6-0-latest-now-routes-not-working
    module.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    // router config
    module.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
         .state("main", {
                url: "/main",
                templateUrl: "mainWelcome.html",
                controller: ""
            })
            .state("top5", {
                url: "/top5",
                templateUrl: "top5.html",
               
            })
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


