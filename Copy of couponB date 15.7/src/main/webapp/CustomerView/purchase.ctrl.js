(function () {

    var module = angular.module("CouponSystemApp");

    module.controller("PurchaseCtrl", PurchaseCtrlCtor);

    function PurchaseCtrlCtor(mockServiceHTTP) {
        this.coupons = [];
        this.couponsForPurchase = [];
        this.coupon = {};
        this.couponsFiltered = [];
        this.couponsByPrice = [];
        this.customer = {};


        var self = this;


        angular.module("CouponSystemApp", []).directive("myKendall", function () {
            return {
                template: "<img src='../CSS/images/giphy (1).gif' style='width:1350px'></img>"
            };
        });
        //============ Order2 By Coloumn Name ==============================================================
        this.order = "";
        this.goUp = false;

        this.setOrder = function (category) {
            this.goUp = (this.order != category) ? false : !this.goUp;
            this.order = category;

        }
        //============================= get owned by customer coupons ===========================================
        var promise = mockServiceHTTP.getCoupons();
        promise.then(function (resp) {
            self.coupons = resp.data;

        }, function (err) {
            console.log(err.data);
        });
        //============================= get available for purchase ===========================================
        var promise = mockServiceHTTP.getCouponForPurchase();
        promise.then(function (resp) {
            self.couponsForPurchase = resp.data;

        }, function (err) {
            console.log(err.data);
        });


        //============================= buy function ===========================================
        // this.buy = function (coupon) {
        //     sweetAlert({
        //         title: "Are You Sure?",
        //         text: "please confirm your purchase of coupon " + coupon.title,
        //         type: "success",
        //         showCancelButton: true
        //     },function(){
        //     // var flag = confirm("please confirm your purchase of coupon " + coupon.title);
        //     // if (flag) {
        //         var promise = mockServiceHTTP.purchaseCoupon(coupon);
        //         promise.then(function (resp) {

        //             self.couponsForPurchase = resp.data;
        //             console.log(coupon.title + 'coupon purchased');
        //             location.reload();



        //         }, function (err) {
        //             console.log(err.data);
        //         });
        //     });
       //============================= buy2 function ===========================================

        this.buy = function (coupon) {
            sweetAlert({
                title: "Are You Sure?",
                text: "please confirm your purchase of coupon " + coupon.title,
                type: "success",
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
        this.refresh = function () {
            var promise = mockServiceHTTP.getCoupons();
            promise.then(function (resp) {
                self.coupons = resp.data;

            }, function (err) {
                console.log(err.data);
            });
        }

        /*this.getCouponsByPrice = function (maxPrice) {
            this.couponsByPrice = mockServiceHTTP.filterByPrice(maxPrice);
        }*/

        //============================= Customer Details ======================================================
        var promise = mockServiceHTTP.getCustomer();
        promise.then(function (resp) {

            self.customer = resp.data;

        }, function (err) {
            console.log(err.data);
        });

    }
})();