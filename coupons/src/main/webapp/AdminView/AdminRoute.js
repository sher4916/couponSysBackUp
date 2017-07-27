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
             .state("createCustomer", {
                url: "/createCustomer",
                templateUrl: "createCustomer.html",
                
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