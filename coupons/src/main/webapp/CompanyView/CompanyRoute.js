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
              
            })
            .state("createCoupon", {
                url: "/createCoupon",
                templateUrl: "createCoupon.html",
                
            })
             .state("createCoupon1", {
                url: "/createCoupon1",
                templateUrl: "createCoupon1.html",
                
            })
             .state("newCoupon", {
                url: "/newCoupon",
                templateUrl: "newCoupon.html",
               
            })
            .state("getCompanyCoupons", {
                url: "/getCompanyCoupons",
                templateUrl: "getCompanyOwnCoupons.html",
               
            })
              .state("companyDetails", {
                url: "/companydetails",
                templateUrl: "companyDetails.html",
                
                
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