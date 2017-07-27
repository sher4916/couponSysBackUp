(function () {

	var module = angular.module("CouponSystemApp");

	module.service("mockServiceHTTP", mockServiceHTTPCtor);
	/**
      * @memberof CouponSystemApp
      * @ngdoc web Service
      * @name mockServiceHTTP
      * @param {object} $http {@link http://docs.angularjs.org/api/ng.$http}
      * @external Promise
      * @function mockServiceHTTPCtor
      * @description This is an angularjs web service for Customer user in coupon system.
      */
	function mockServiceHTTPCtor($http) {
		var coupon={};
	
//url- customerdetails ======================================================================================
		/** returns the Customer Object who is logged in
       * @memberof CouponSystemApp
       * @return {Object}  Customer who is logged in
       * @function getCustomer
        */
		this.getCustomer = function () {
			return $http.get('http://localhost:8080/coupons/webapi/customer/customerdetails');

		}

//========================= getCouponForPurchase=====================================================================
		 /**
       * return an array of coupons available for purchase for the loggod in customer
       * @memberof CouponSystemApp
       * @function getCouponForPurchase
       * @return {Array} coupons available for purchase for the loggod in customer
       */
		this.getCouponForPurchase = function () {
			return $http.get('http://localhost:8080/coupons/webapi/customer/couponsforpurchase');

		}
//========================= getCoupons=====================================================================
		 /**
       * return an array of coupons owned by the loggod in customer
       * @memberof CouponSystemApp
       * @function getCompanyOwnCoupons
       * @return {Array} coupons owned by the loggod in customer
       */
		this.getCoupons = function () {
			return $http.get('http://localhost:8080/coupons/webapi/customer/coupons');

		}
//====================purchaseCoupon==================================================================================
		  /**
       * purchas coupon and update ownership in DB
       * @memberof CouponSystemApp
       * @function purchaseCoupon
       *  @param {object} coupon to purchase
       */
		this.purchaseCoupon = function (coupon) {
			return $http.put('http://localhost:8080/coupons/webapi/customer/purchasecoupon',coupon);
		}

//=========== Up To Price =================================================================================
		/**
       * returns an array of Coupons with price below the given price
       * @memberof CouponSystemApp
       * @function filterByPrice
       *  @param {String} price is the max price
       * @return {Array} Coupons with price below the given price
       */
		this.filterByPrice = function (price) {
			console.log(price);
		return $http.get('http://localhost:8080/coupons/webapi/customer/couponprice/'+price);

		}


	}

})();