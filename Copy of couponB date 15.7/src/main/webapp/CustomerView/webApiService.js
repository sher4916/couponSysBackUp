(function () {

	var module = angular.module("CouponSystemApp");

	module.service("mockServiceHTTP", mockServiceHTTPCtor);
	
	function mockServiceHTTPCtor($http) {
		var coupon={};
	
//url- customerdetails ======================================================================================
		this.getCustomer = function () {
			return $http.get('http://localhost:8080/couponB/webapi/customer/customerdetails');

		}

//url- couponsforpurchase ======== GET !! =====================================================================
		this.getCouponForPurchase = function () {
			return $http.get('http://localhost:8080/couponB/webapi/customer/couponsforpurchase');

		}

		this.getCoupons = function () {
			return $http.get('http://localhost:8080/couponB/webapi/customer/coupons');

		}

//TODO-i dont know how to return failure yet-need to prepare 404.html file
		/*this.getCouponFailue = function () {
			return $q.reject({
				status: 404,
				data: 'coupon not found'
			});
		}*/
//url-purchasecoupon == PUT !!!  ==================================================================================
		this.purchaseCoupon = function (coupon) {
			return $http.put('http://localhost:8080/couponB/webapi/customer/purchasecoupon',coupon);
		}
//TODO-i dont know how to return failure yet-need to prepare 404.html file
		/*this.purchaseCouponFailue = function (coupon) {
			return $q.reject({
				status: 404,
				data: 'can not purchse coupon'
			});
		}*/

		// in the future
		// return $http.get('URL');
		/*this.getCustomerName() = function() {
			return this.cust_name;
		}*/

//=========== Up To Price =================================================================================
		this.filterByPrice = function (price) {
			console.log(price);
		return $http.get('http://localhost:8080/couponB/webapi/customer/couponprice/'+price);

		}


	}

})();