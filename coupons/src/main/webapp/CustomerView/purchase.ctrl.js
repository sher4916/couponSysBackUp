(function () {

    var module = angular.module("CouponSystemApp");

    module.controller("PurchaseCtrl", PurchaseCtrlCtor);

    /**
      * @memberof CouponSystemApp
      * @ngdoc controller
      * @name PurchaseCtrl
      * @param mockServiceHTTP {service} Company web service (not mock)
      * @external Promise
      * @function PurchaseCtrlCtor
      * @description This is an angularjs controller for customer user in coupon system.
      */
    function PurchaseCtrlCtor(mockServiceHTTP) {
        this.coupons = [];
        this.couponsForPurchase = [];
        this.coupon = {};
        this.couponsFiltered = [];
        this.couponsByPrice = [];
        this.customer = {};


        var self = this;


        // angular.module("CouponSystemApp", []).directive("myKendall", function () {
        //     return {
        //         template: "<img src='../CSS/images/giphy (1).gif' style='width:1350px'></img>"
        //     };
        // });
        //============ Order2 By Coloumn Name ==============================================================
        this.order = "";
        this.goUp = false;
/** sort table by the given category
         *  @param {string} category - The table coulmn header to sort by.
         * @memberof CouponSystemApp
         * @function setOrder
         */
        this.setOrder = function (category) {
            this.goUp = (this.order != category) ? false : !this.goUp;
            this.order = category;

        }
        //============================= get owned by customer coupons ===========================================
         /** return an array of coupons owned by the loggod in customer
         * @memberof CouponSystemApp
         * @return {external:Promise}  On success the promise will be resolved with 
       * an array of coupons owned by the loggod in customer.<br>
       * On error the promise will be rejected with an {@link Error}.
         */
        var promise = mockServiceHTTP.getCoupons();
        promise.then(function (resp) {
            self.coupons = resp.data;

        }, function (err) {
            console.log(err.data);
        });
        //============================= get available for purchase ===========================================
        /** return an array of coupons available for purchase for the loggod in customer
         * @memberof CouponSystemApp
         * @return {external:Promise}  On success the promise will be resolved with 
       * an array of coupons available for purchase for the loggod in customer.<br>
       * On error the promise will be rejected with an {@link Error}.
         */
        var promise = mockServiceHTTP.getCouponForPurchase();
        promise.then(function (resp) {
            self.couponsForPurchase = resp.data;

        }, function (err) {
            console.log(err.data);
        });
       //============================= buy function ===========================================
 /**
       * buy a Coupon Object
       * @memberof CouponSystemApp
       * @function buy
       * @param {Object} coupon is the Coupon Object to buy
       * @return {external:Promise}  On success the promise will be resolved with 
       * commiting purchase of Coupon property in DB.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.buy = function (coupon) {
            sweetAlert({
                title: "Are You Sure?",
                text: "please confirm your purchase of coupon " + coupon.title,
                type: "success",
                confirmButtonColor: '#3f51b5',
                showCancelButton: true
            },function(){
                var promise = mockServiceHTTP.purchaseCoupon(coupon);
                promise.then(function (resp) {

                    self.couponsForPurchase = resp.data;
                    console.log(coupon.title + 'coupon purchased');
                    location.reload();



                }, function (err) {
                    console.log(err.data);
                });
            });
        }
            //=============================
        var filter = { 'field': 'value' };
        //=============================
		
        //=============================Filter By Price ======================================================
         /**
       * returns an array of Coupons with price below the given price (in the inner service function)
       * @memberof CouponSystemApp
       * @function filterByPrice
       * @return {external:Promise}  On success the promise will be resolved with 
       * an array of Coupons with price below the given price.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.filterByPrice = function () {
            console.log(this.coupon.price)
            var promise = mockServiceHTTP.filterByPrice(this.coupon.price);
            promise.then(function (resp) {
                self.coupons = resp.data;

            }, function (err) {
                console.log(err.data);
            });
        }

        //============================= refresh to view all Coupons ===========================================
        /**
       * return an array of coupons owned by the loggod in customer
       * @memberof CouponSystemApp
       * @function refresh
       * @return {external:Promise}  On success the promise will be resolved with 
       * an array of Coupons owned by the loggod in customer.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.refresh = function () {
            var promise = mockServiceHTTP.getCoupons();
            promise.then(function (resp) {
                self.coupons = resp.data;

            }, function (err) {
                console.log(err.data);
            });
        }

        //============================= Customer Details ======================================================
        /**
       * @return {external:Promise}  On success the promise will be resolved with 
       * the Customer Object who is logged in.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        var promise = mockServiceHTTP.getCustomer();
        promise.then(function (resp) {

            self.customer = resp.data;

        }, function (err) {
            console.log(err.data);
        });

    }
})();