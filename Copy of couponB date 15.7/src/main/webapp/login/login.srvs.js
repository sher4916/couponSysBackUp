(function () {

    var module = angular.module("CouponSystemApp");

    module.service("loginServiceHTTP", loginServiceHTTPCtor);

    function loginServiceHTTPCtor($http) {

        this.loginWeb = function (username,password,usertype) {

            return $http.post('http://localhost:8080/couponB/webapi/login', username,password,usertype);
        }

    }


})();