(function () {
    var module = angular.module("CouponSystemApp");
 
    module.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    // router config
    module.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
         .state("mainWelcome", {
                url: "/mainWelcome",
                templateUrl: "mainWelcome.html",
               
            })
            .state("createCompany", {
                url: "/createCompany",
                templateUrl: "createCompany.html",
                          
            })
            .state("allCompanies", {
                url: "/allCompanies",
                templateUrl: "allCompanies.html",
                
            })
           .state("createCompany1", {
                url: "/createCompany1",
                templateUrl: "createCompany1.html",
                
            })
             .state("createCustomer", {
                url: "/createCustomer",
                templateUrl: "createCustomer.html",
                
            })
             .state("createCustomer1", {
                url: "/createCustomer1",
                templateUrl: "createCustomer1.html",
                
            })
             .state("allCustomers", {
                url: "/allCustomers",
                templateUrl: "allCustomers.html",
                
            })
             .state("404", {
                url: "/404",
                templateUrl: "404.html",
                
            })
           
            ;

        $urlRouterProvider.when("", "/mainWelcome"); // first browsing postfix is empty --> route it to /main
        $urlRouterProvider.otherwise('/404'); // when no switch case matches --> route to /404
    });

})();