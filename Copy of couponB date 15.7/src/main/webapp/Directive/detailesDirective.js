(function () {


    var module = angular.module("CouponSystemApp");
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