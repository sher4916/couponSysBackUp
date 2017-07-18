(function () {

	var module = angular.module("CouponSystemApp");

	module.controller("GetCouponsCtrl", GetCouponsCtrlCtor);

	function GetCouponsCtrlCtor(mockServiceHTTP) {
		this.coupons = [];
		this.couponsFiltered = [];
		
		var self = this;

		var promise = mockServiceHTTP.getCoupons();
		promise.then(function (resp) {
			// alert(resp.data);
			self.coupons = resp.data;

		}, function (err) {
			alert(err.data);
		});

		var filter = { 'field': 'value' };

		/*this.getCouponsByPrice = function (maxPrice) {
			this.coupons = mockServiceHTTP.getCouponsByPrice(maxPrice);
		}*/
		this.getCouponsByPrice = function (maxPrice) {
			this.coupons = mockServiceHTTP.filterByPrice(maxPrice);
		}
		var promise = mockServiceHTTP.getCustomer();
		promise.then(function (resp) {
			// alert(resp.data);
			self.customer = resp.data;

		}, function (err) {
			alert(err.data);
		});
		
		
	}
})();