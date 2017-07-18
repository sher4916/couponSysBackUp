
(function () {

    var module = angular.module("CouponSystemApp");

    module.service("companyMockServiceHTTP", companyMockServiceHTTPCtor);
    //you should move all the object builders to one service of bob the builder
    function Coupon(id, title, startDate, endDate, amount, message, type, price, image) {
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
    var createCoupon = function () {
        var couponName = document.getElementById("couponName").value
        var startDate = document.getElementById("startDate").value
        var endDate = document.getElementById("endDate").value
        var amount = document.getElementById("amount").value
        var type = document.getElementById("type").value
        var message = document.getElementById("message").value
        var price = document.getElementById("price").value
        var image = document.getElementById("image").value
        var c1 = new Coupon(id, title, startDate, endDate, amount, message, type, price, image);
        {
            console.log(c1)
        }


    function Company(id, compName, password, email, coupons) {
        this.id = id;
        this.compName = compName;
        this.password = password;
        this.email = email;
        this.coupons = [];
    }

    // function Customer(id, cust_name, password) {
    //     this.id = id;
    //     this.cust_name = cust_name;
    //     this.password = password;
    // }


    function companyMockServiceHTTPCtor($q) {
        this.coupons = [
            new Coupon(1, "Cafe cafe", "2017-06-07T00:00:00+03:00", "2017-09-07T00:00:00+03:00", 22, "buy one get one", "RESTURANTS", 15.99, "image.jpg"),
            new Coupon(2, "Greg", "2017-04-11T00:00:00+03:00", "2017-11-04T00:00:00+03:00", 3, "buy one get one2", "SPORTS", 44.99, "image2.jpg"),
            new Coupon(3, "fox", "2017-03-12T00:00:00+03:00", "2017-10-04T00:00:00+03:00", 12, "buy one get one3", "FOOD", 48.22, "image3.jpg"),
            new Coupon(4, "bonita", "2017-02-21T00:00:00+03:00", "2017-12-04T00:00:00+03:00", 13, "buy one get one4", "ELECTRICITY", 38.74, "image4.jpg")
        ];
        this.getCompanyOwnCoupons = function () {
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: this.coupons
            });
            return deferred.promise;
        }
        this.getCouponFailue = function (err) {
            return $q.reject(
                { status: 404, data: 'coupon not found' }
            );
        }

        // in the future 
        //return $http.get('URL');
        this.company = new Company(5, "moshe5", "1234","a@yahoo.com",[(1, "Cafe cafe", "2017-06-07T00:00:00+03:00",
				"2017-09-07T00:00:00+03:00", 22, "buy one get one",
				"RESTURANTS", 15.99, "image.jpg")]);
		this.getCompany=function(){
			var deferred = $q.defer();
			deferred.resolve({
				status: 200,
				data: this.company
			});
			return deferred.promise;

		}

    }

        this.getCouponsByType = function (type) {
            var couponByType = [];
            for (var index = 0; index < this.coupons.length; index++) {
                var element = this.coupons[index];
                if (element.getType() == this.type) {
                    couponByType.add(element);
                }


            }

            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: couponByType
            });
            return deferred.promise;
        }
        this.getCouponByTypeFailue = function (type) {
            return $q.reject(
                { status: 404, data: 'coupon by type not found' }
            );
        }

    }
    this.newCoupon = function () {
        var deferred = $q.defer();
        deferred.resolve({
            status: 200,
            data: this.c1
        });
        return deferred.promise;
    }
    this.newCouponFailue = function (err) {
        return $q.reject(
            { status: 404, data: 'error: unable to create new coupon' }
        );
    }
    this.addCoupon = function (coupon) {
        this.coupons.push(coupon);
        var deferred = $q.defer();
        deferred.resolve({
            status: 200,
            data: this.coupons
        });
        return deferred.promise;
    }
})();