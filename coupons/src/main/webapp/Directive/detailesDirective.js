(function () {


    var module = angular.module("CouponSystemApp");
    /**
      * @memberof CouponSystemApp
      * @ngdoc Details Directive
      * @name detailsDirective
      * @function anonymous 
      * @description This is an angularjs Directive to retrieve Object details in coupon system.
      */
    module.directive('detailsDirective', function () {
        return {
            'templateUrl': '../Directive/detailsDir.html',
            'scope': {
                'userId': '=',
                'nameName': '=',
                'passwordPass': '=',
                'emailEmail': '=',
                'typeType': '@'

            }
        }
    })
})();