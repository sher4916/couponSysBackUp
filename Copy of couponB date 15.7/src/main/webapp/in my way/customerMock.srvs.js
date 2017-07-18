(function () {

	var module = angular.module("CouponSystemApp");

	module.service("mockServiceHTTP", mockServiceHTTPCtor);
	// you should move all the object builders to one service of bob the builder
	function Coupon(id, title, startDate, endDate, amount, message, type,
		price, image) {
		this.id = id;
		this.title = title;
		this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.message = message;
		this.type = type;
		this.price = price;
		this.image = image;
	}

	function Customer(id, cust_name, password) {
		this.id = id;
		this.cust_name = cust_name;
		this.password = password;
	}
	/*function getCustomerName(Customer) {
		return this.cust_name;
	}
	var moshe5 = new Customer(5, "moshe5", "1234");
	var type;
	function getType() {
		return type;
	}*/
	function mockServiceHTTPCtor($q) {
		this.coupons = [
			new Coupon(1, "Cafe cafe", "2017-06-07T00:00:00+03:00",
				"2017-09-07T00:00:00+03:00", 22, "buy one get one",
				"RESTURANTS", 15.99, "image.jpg"),
			new Coupon(2, "Greg", "2017-04-11T00:00:00+03:00",
				"2017-11-04T00:00:00+03:00", 3, "buy one get one2",
				"SPORTS", 44.99, "image2.jpg"),
			new Coupon(3, "fox", "2017-03-12T00:00:00+03:00",
				"2017-10-04T00:00:00+03:00", 12, "buy one get one3",
				"FOOD", 48.22, "image3.jpg"),
			new Coupon(4, "bonita", "2017-02-21T00:00:00+03:00",
				"2017-12-04T00:00:00+03:00", 13, "buy one get one4",
				"ELECTRICITY", 38.74, "image4.jpg")];


		this.customers = [
			new Customer(1, "moshe1", "1234"),
			new Customer(2, "moshe2", "1234"),
			new Customer(3, "moshe3", "1234"),
			new Customer(4, "moshe4", "1234")];

		this.customer = new Customer(5, "moshe5", "1234");
		this.getCustomer=function(){
			var deferred = $q.defer();
			deferred.resolve({
				status: 200,
				data: this.customer
			});
			return deferred.promise;

		}
		this.getCoupons = function () {
			var deferred = $q.defer();
			deferred.resolve({
				status: 200,
				data: this.coupons
			});
			return deferred.promise;

		}


		this.getCouponFailue = function () {
			return $q.reject({
				status: 404,
				data: 'coupon not found'
			});
		}

		this.purchaseCoupon = function (coupon) {
			var deferred = $q.defer();
			deferred.resolve({
				status: 200,
				data: 'Coupon Purchased' + this.coupon
			});
			return deferred.promise;
		}
		this.purchaseCouponFailue = function (coupon) {
			return $q.reject({
				status: 404,
				data: 'can not purchse coupon'
			});
		}

		// in the future
		// return $http.get('URL');
		/*this.getCustomerName() = function() {
			return this.cust_name;
		}*/
		this.filterByPrice = function (maxPrice) {
			var couponsFiltered = [];
			for (var index = 0; index < this.coupons.length; index++) {
				var element = this.coupons[index];
				if (element.price < maxPrice) {
					couponsFiltered.push(element);
				}
			}

			return couponsFiltered

		}


	}

})();