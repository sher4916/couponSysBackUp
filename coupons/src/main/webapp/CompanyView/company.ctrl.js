(function () {


    var module = angular.module("CouponSystemApp");

   
    // angular.module("CouponSystemApp").directive("myKendall", function () {
    //     return {
    //         template: 'Company: {{company.compName}}<br/>{{company.email}}'

    //     };
    // });

    module.controller("CompanyCtrl", CompanyCtrlCtor);
/**
      * @memberof CouponSystemApp
      * @ngdoc controller
      * @name CompanyCtrl
      * @param CompanyCtrlCtor {service} Company web service
      * @external Promise
      * @function CompanyCtrlCtor
      * @description This is an angularjs controller for company user in coupon system.
      */
    function CompanyCtrlCtor(companyWebAPIServiceHTTP) {
        this.coupons = [];
        this.coupon = {};
        this.company = {};
        this.company1 = {};
        this.couponsfilteredByID = [];
        this.newCoupon = {};



        var self = this;

        this.success = false;
        this.failure = false;
//================== Company Details =========================================
   /**
       * @return {external:Promise}  On success the promise will be resolved with 
       * the Company Object who is logged in.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        var promise = companyWebAPIServiceHTTP.getCompany();
        promise.then(function (resp) {
            self.company = resp.data;

        }, function (err) {
            console.log(err.data);
        });
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
        //============================= delete Coupon ===========================================
           /**
       * Delete a Coupon Object
       * @memberof CouponSystemApp
       * @function deleteCoup
       * @param {Object} c is the Coupon Object to delete
       * @return {external:Promise}  On success the promise will be resolved with 
       * removing Coupon property from DB by the given Coupon.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.deleteCoup = function (c) {
            sweetAlert({
                title: "Are You Sure?",
                text: "are you sure you want to delete the customer named " + c.title + "?",
                type: "warning",
                confirmButtonColor: '#3f51b5',
                showCancelButton: true
            }, function () {
                var promise = companyWebAPIServiceHTTP.deleteCouponweb(c);
                promise.then(function (resp) {
                    console.log(c.custName + ' deleted');
                    location.reload();
                }, function (err) {
                    console.log(err.data);
                });
            });
        }
        //============  Update Coupon =========================================================================
        /**
       * Update a Coupon Object
       * @memberof CouponSystemApp
       * @function updateCoup
       * @param {Object} c is the Coupon Object to update
       * @return {external:Promise}  On success the promise will be resolved with 
       * updating a Coupon property in DB.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.updateCoup = function (c) {
            console.log(c);
            var promise = companyWebAPIServiceHTTP.updateCouponyweb(c);
            promise.then(function (resp) {
                console.log(c.title + ' updated');

            }, function (err) {
                console.log(err.data);
            });

        }
        //================== Create Coupon =========================================
        /**
       * Create a new Coupon Object
       * @memberof CouponSystemApp
       * @function createCoupon
       * @return {external:Promise}  On success the promise will be resolved with 
       * a new Coupon Object.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.createCoupon = function () {

            console.log(this.Coupon);
            if (this.Coupon == undefined || this.Coupon.amount == undefined ||
                this.Coupon.title == undefined) {
                this.success = false;
                this.failure = true;

                return;
            }
            this.success = false;
            this.failure = false;

            var promisePost = companyWebAPIServiceHTTP.postCoupon(this.Coupon);

            promisePost.then(
                function (resp) {
                    sweetAlert({
                title: "New Coupon Created",               
                type: "success",
                confirmButtonColor: '#3f51b5'
            })
                    self.success = true;
                    self.failure = false;
                    window.location.href = "http://localhost:8080/coupons/CompanyView/CompanyView.html#/getCompanyCoupons";

                },
                function (err) {
                    console.log(err.data);
                    self.success = false;
                    self.failure = true;
                });

        }
        //================== Create Coupon1 =========================================
       /**
       * Create a new Coupon Object
       * @memberof CouponSystemApp
       * @function createCoupon1
       * @param {State} valid checks whether to run function or not
       * @return {external:Promise}  On success the promise will be resolved with 
       *  a new Coupon Object.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.createCoupon1 = function (valid) {

            console.log(this.formMain);
            if (this.formMain == undefined || this.formMain.amount == undefined ||
                this.formMain.title == undefined) {
                this.success = false;
                this.failure = true;

                return;
            }
            this.success = false;
            this.failure = false;
            if (valid) {
                var promisePost = companyWebAPIServiceHTTP.postCoupon(this.formMain);

                promisePost.then(
                    function (resp) {
                        sweetAlert({
                title: "New Coupon Created",               
                type: "success",
                confirmButtonColor: '#3f51b5'
            });
                        // self.coupons = resp.data;
                        // self.Coupon = {};
                        self.success = true;
                        self.failure = false;
                        setTimeout(function () {
                            window.location.href = "http://localhost:8080/coupons/CompanyView/CompanyView.html#/getCompanyCoupons";
                        }
                            , (2 * 1000));

                    },
                    function (err) {
                        console.log(err.data);
                        self.success = false;
                        self.failure = true;
                    });
            }

        }
        //================== Get all Company Own Coupons =========================================
         /** return an array of coupons created by the loggod in company
         * @memberof CouponSystemApp
         * @return {external:Promise}  On success the promise will be resolved with 
       * an array of coupons created by the loggod in company.<br>
       * On error the promise will be rejected with an {@link Error}.
         */
        var promise = companyWebAPIServiceHTTP.getCompanyOwnCoupons();
        promise.then(
            function (resp) {

                self.coupons = resp.data;

            },
            function (err) {
                console.log(err.data);
            });

        //================== Filter by id =========================================
          /**
       * returns a Coupon Object by the given ID (in the inner service function)
       * @memberof CouponSystemApp
       * @function filterById
       * @return {external:Promise}  On success the promise will be resolved with 
       * a Coupon property with the given Coupon ID.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.filterById = function () {

            var promise = companyWebAPIServiceHTTP.filterByIdService(this.coupon.id);

            promise.then(function (resp) {
                self.coupons = [resp.data];

            }, function (err) {
                console.log(err.data);
                sweetAlert({
                title: "OOOPS... ",
                text: "Coupon ID should be a number",
                confirmButtonColor: '#3f51b5'
            });
            });
        }
        //=============== Get Company Coupon that will expire until Date  =============================
         /**
       * returns an array of Coupons that will expire up to the given date (in the inner service function)
       * @memberof CouponSystemApp
       * @function getUntilDate
       * @return {external:Promise}  On success the promise will be resolved with 
       * an array of Coupons that will expire up to the given date.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.getUntilDate = function () {

            var promise = companyWebAPIServiceHTTP.getCouponsBeforeExpiredDate(this.coupon.date);

            promise.then(function (resp) {
                self.coupons = resp.data;

            }, function (err) {
                console.log(err.data);
                sweetAlert({
                title: "please fix your date format",
                text: "example:  2017-12-31",
                confirmButtonColor: '#3f51b5'
            });
            });
        }

        //================== Refresh Company Own Coupons =========================================
         /** return an array of coupons created by the loggod in company
         * @memberof CouponSystemApp
         * @return {external:Promise}  On success the promise will be resolved with 
       * an array of coupons created by the loggod in company.<br>
       * On error the promise will be rejected with an {@link Error}.
         */
        this.refresh = function () {
        var promise = companyWebAPIServiceHTTP.getCompanyOwnCoupons();
        promise.then(
            function (resp) {

                self.coupons = resp.data;

            },
            function (err) {
                console.log(err.data);
            });
        }

    }






})();