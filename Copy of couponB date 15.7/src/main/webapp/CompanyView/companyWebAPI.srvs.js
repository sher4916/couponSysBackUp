
(function () {

    var module = angular.module("CouponSystemApp");

    module.service("companyWebAPIServiceHTTP", companyWebAPIServiceHTTPCtor);

    function companyWebAPIServiceHTTPCtor($http) {

        /*   this.getCompanyOwnCoupons = function () {
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
           }*/

   //============  Delete Coupon =========================================================================
        this.deleteCouponweb = function (coupon) {
           
            return $http.put('http://localhost:8080/couponB/webapi/company/deletecoupon',coupon);
        }
           //============  Update Coupon =========================================================================
        this.updateCouponyweb = function (coupon) {
           
            return $http.put('http://localhost:8080/couponB/webapi/company/updatecoupon',coupon);
        }
//===============   Company Details =============================================================
        this.getCompany = function () {
            return $http.get('http://localhost:8080/couponB/webapi/company/companydetails');

        }
//=============== Get All  Company Coupons =============================================================
        this.getCompanyOwnCoupons = function () {
            return $http.get('http://localhost:8080/couponB/webapi/company/coupons');
        }
//=============== Get  Company Coupon By ID =============================================================
        this.filterByIdService = function (id) {
            console.log(id);
             return $http.get('http://localhost:8080/couponB/webapi/company/coupon/'+id);
        }
//=============== Get Company Coupon that will expire until Date  =============================================================
         this.getCouponsBeforeExpiredDate = function (date) {
            console.log(date);
             return $http.get('http://localhost:8080/couponB/webapi/company/couponsbydate/'+date);
        }
        //     console.log(this.coupon.id);
        //     for (var index = 0; index < this.coupons.length; index++) {
        //         var element = this.coupons[index];
        //         if (element.id == this.coupon.id) {
        //             this.coupons.push(element)

        //         }


        //     }
        //     return this.coupons;
        // }



        //     this.getCouponsByType = function (type) {
        //         var couponByType = [];
        //         for (var index = 0; index < this.coupons.length; index++) {
        //             var element = this.coupons[index];
        //             if (element.getType() == this.type) {
        //                 couponByType.add(element);
        //             }


        //         }
        //     }
        //     var deferred = $q.defer();
        //     deferred.resolve({
        //         status: 200,
        //         data: couponByType
        //     });
        //     return deferred.promise;
        // }
        // this.getCouponByTypeFailue = function (type) {
        //     return $q.reject(
        //         { status: 404, data: 'coupon by type not found' }
        //     );
        // }


        // this.newCoupon = function () {
        //     var deferred = $q.defer();
        //     deferred.resolve({
        //         status: 200,
        //         data: this.c1
        //     });
        //     return deferred.promise;
        // }
        // this.newCouponFailue = function (err) {
        //     return $q.reject(
        //         { status: 404, data: 'error: unable to create new coupon' }
        //     );
        // }
//=============== Create Coupon  ==============================================
        this.postCoupon = function (coupon) {
            console.log(coupon);
            return $http.post('http://localhost:8080/couponB/webapi/company/coupon', coupon);
        }
    }
})();