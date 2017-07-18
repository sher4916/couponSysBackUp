
// this.customers = [];
// var cust_name;
// var promise1 = mockServiceHTTP.getCustomerName(moshe5);
// 		promise1.then(function(resp) {
// 			self.cust_name = resp.data;
// 		}, function(err) {
// 			alert(err.data);
// 		});
(function () {

    var module = angular.module("CouponSystemApp");

    module.controller("CustomerViewCtrl", CustomerViewCtrlCtor);

    function CustomerViewCtrlCtor(mockServiceHTTP) {
        this.coupons = [];

        var self = this;


        var promise = mockServiceHTTP.getCoupons();
        promise.then(function (resp) {
            // alert(resp.data);
            self.coupons = resp.data;

        }, function (err) {
            alert(err.data);
        });

    }

})();