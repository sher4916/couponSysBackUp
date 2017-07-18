(function () {
    var module = angular.module("CouponSystemApp");
   
    module.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);


    // router config
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