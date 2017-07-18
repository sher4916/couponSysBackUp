(function () {
  var module = angular.module("CouponSystemApp");

    module.controller("LoginController", LoginControllerCtor);
      
    
    function LoginControllerCtor(loginServiceHTTP) {
      this.login = function (username,password,usertype) {
            var promise = loginServiceHTTP.loginWeb(username,password,usertype);
            promise.then(function (resp) {

            }, function (err) {
                alert(err);
            });
        }
    }
 
})();