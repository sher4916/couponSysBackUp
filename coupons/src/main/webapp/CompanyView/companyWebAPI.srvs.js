
(function () {

    var module = angular.module("CouponSystemApp");

    module.service("companyWebAPIServiceHTTP", companyWebAPIServiceHTTPCtor);
/**
      * @memberof CouponSystemApp
      * @ngdoc web Service
      * @name companyWebAPIServiceHTTP
      * @param {object} $http {@link http://docs.angularjs.org/api/ng.$http}
      * @external Promise
      * @function companyWebAPIServiceHTTPCtor
      * @description This is an angularjs web service for Company user in coupon system.
      */
    function companyWebAPIServiceHTTPCtor($http) {

   //============  Delete Coupon =========================================================================
         /**
       * Delete Coupon from DB
       * @memberof CouponSystemApp
       * @function deleteCouponweb
       *  @param {object} Coupon to Delete
       */
        this.deleteCouponweb = function (coupon) {
           
            return $http.put('http://localhost:8080/coupons/webapi/company/deletecoupon',coupon);
        }
           //============  Update Coupon =========================================================================
        /**
       * Update coupon in DB
       * @memberof CouponSystemApp
       * @function updateCouponyweb
       *  @param {object} coupon to Update
       */
        this.updateCouponyweb = function (coupon) {
           
            return $http.put('http://localhost:8080/coupons/webapi/company/updatecoupon',coupon);
        }
//===============   Company Details =============================================================
       /** returns the Company Object who is logged in
       * @memberof CouponSystemApp
       * @return {Object}  Company who is logged in
       * @function getCompany
        */
        this.getCompany = function () {
            return $http.get('http://localhost:8080/coupons/webapi/company/companydetails');

        }
//=============== Get All  Company Coupons =============================================================
        /**
       * return an array of coupons created by the loggod in company
       * @memberof CouponSystemApp
       * @function getCompanyOwnCoupons
       * @return {Array} coupons created by the loggod in company
       */
        this.getCompanyOwnCoupons = function () {
            return $http.get('http://localhost:8080/coupons/webapi/company/coupons');
        }
//=============== Get  Company Coupon By ID =============================================================
         /**
       * returns a Coupon of the given id
       * @memberof CouponSystemApp
       * @function filterByIdService
       *  @param {String} id of the Coupon
       * @return {Object} Coupon of the given id
       */
        this.filterByIdService = function (id) {
            console.log(id);
             return $http.get('http://localhost:8080/coupons/webapi/company/coupon/'+id);
        }
//=============== Get Company Coupon that will expire until Date  =============================================================
          /**
       * returns an array of Coupons that will expire up to the given date
       * @memberof CouponSystemApp
       * @function getCouponsBeforeExpiredDate
       *  @param {String} date is the Expired Date of coupon
       * @return {Array} Coupons that will expire up to the given date
       */
         this.getCouponsBeforeExpiredDate = function (date) {
            console.log(date);
             return $http.get('http://localhost:8080/coupons/webapi/company/couponsbydate/'+date);
        }
      
//=============== Create Coupon  ==============================================
             /**
       * Create a new coupon in DB
       * @memberof CouponSystemApp
       * @function postCoupon
       *  @param {object} coupon to create
       */
        this.postCoupon = function (coupon) {
            console.log(coupon);
            return $http.post('http://localhost:8080/coupons/webapi/company/coupon', coupon);
        }
    }
})();