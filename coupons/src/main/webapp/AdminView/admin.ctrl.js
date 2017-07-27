(function () {

    var module = angular.module("CouponSystemApp");

    module.controller("adminCtrl", adminCtrlCtor);
    /**
      * @memberof CouponSystemApp
      * @ngdoc controller
      * @name adminCtrl
      * @param adminServiceHTTP {service} admin web service
      * @external Promise
      * @function adminCtrlCtor
      * @description This is an angularjs controller for admin user in coupon system.
      */
    function adminCtrlCtor(adminServiceHTTP) {
        this.coupons = [];
        this.companies = [];
        this.customers = [];
        this.couponsForPurchase = [];
        this.coupon = {};
        this.couponsFiltered = [];
        this.couponsByPrice = [];
        this.customer = {};
        this.company = {};
        this.formMain = {};


        var self = this;
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


        //============ View All Companies =========================================================================
        /**
       * @return {external:Promise}  On success the promise will be resolved with 
       * an array of all Companies.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        var promise = adminServiceHTTP.getAllCompaniesWeb();
        promise.then(function (resp) {
            self.companies = resp.data;


        }, function (err) {
            console.log(err.data);
        });

        //============ Company By ID =========================================================================
        /**
       * returns a Company Object by the given ID (in the inner service function)
       * @memberof CouponSystemApp
       * @function getCompanyById
       * @return {external:Promise}  On success the promise will be resolved with 
       * a Company property with the given Company ID.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.getCompanyById = function () {
            var promise = adminServiceHTTP.getCompanyByIdWeb(this.company.id);
            promise.then(function (resp) {

                self.companies = [resp.data];

            }, function (err) {
                console.log(err);
            });
        }




        //============ View All Customers =========================================================================
 /**
       * @return {external:Promise}  On success the promise will be resolved with 
       * an array of all Companies.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        var promise = adminServiceHTTP.getAllCustomersWeb();
        promise.then(function (resp) {
            self.customers = resp.data;


        }, function (err) {
            console.log(err.data);
        });
        //============ Customer By ID =========================================================================
         /**
       * returns a Customer Object by the given ID (in the inner service function)
       * @memberof CouponSystemApp
       * @function getCustomerById
       * @return {external:Promise}  On success the promise will be resolved with 
       * a Customer property with the given Customer ID.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.getCustomerById = function () {
            var promise = adminServiceHTTP.getCustomerByIdWeb(this.customer.id);
            promise.then(function (resp) {

                self.customers = [resp.data];

            }, function (err) {
                console.log(err);
            });
        }

        //============ Create Company =========================================================================
        this.success = false;
        this.failure = false;
   /**
       * Create a new Company Object
       * @memberof CouponSystemApp
       * @function createCompany
       * @return {external:Promise}  On success the promise will be resolved with 
       * a new Company Object.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.createCompany = function () {
            console.log(this.company);
            if (this.company == undefined || this.company.compName == undefined
                || this.company.password == undefined || this.company.email == undefined) {
                this.success = false;
                this.failure = true;
                return;
            }
            this.success = false;
            this.failure = false;


            var promisePost = adminServiceHTTP.createCompanyWeb(this.company);
            promise.then(function (resp) {
                swal({
                title:"New Company Created",
                confirmButtonColor: '#009688'            
        });

                self.success = true;
                self.failure = false;
                window.location.href = "http://localhost:8080/coupons/AdminView/AdminView.html#/allCompanies";

            }, function (err) {
                swal(err.data);
                self.success = false;
                self.failure = true;
            });


        }

        //============ Create Company1 =========================================================================
        this.success = false;
        this.failure = false;
   /**
       * Create a new Company Object
       * @memberof CouponSystemApp
       * @function createCompany1
       * @param {State} valid checks whether to run function or not
       * @return {external:Promise}  On success the promise will be resolved with 
       *  a new Company Object.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.createCompany1 = function (valid) {
            console.log(this.formMain);
            if (this.formMain == undefined || this.formMain.compName == undefined
                || this.formMain.password == undefined || this.formMain.email == undefined) {
                this.success = false;
                this.failure = true;
                return;
            }
            this.success = false;
            this.failure = false;
            if (valid) {


                var promisePost = adminServiceHTTP.createCompanyWeb(this.formMain);
                promise.then(function (resp) {
                   swal({
                title:"New Company Created",
                confirmButtonColor: '#009688'            
        });

                    self.success = true;
                    self.failure = false;
                    setTimeout(function () {
                        window.location.href = "http://localhost:8080/coupons/AdminView/AdminView.html#/allCompanies";
                    }
                        , (2 * 1000));

                }, function (err) {
                    swal(err.data);
                    self.success = false;
                    self.failure = true;
                });
            }


        }


        //============ Create Customer =========================================================================
        this.success1 = false;
        this.failure1 = false;
   /**
       * Create a new Customer Object
       * @memberof CouponSystemApp
       * @function createCustomer
       * @return {external:Promise}  On success the promise will be resolved with 
       *  a new Customer Object.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.createCustomer = function () {
            console.log(this.customer);
            if (this.customer == undefined || this.customer.custName == undefined
                || this.customer.password == undefined) {
                this.success1 = false;
                this.failure1 = true;
                return;
            }
            this.success1 = false;
            this.failure1 = false;


            var promisePost = adminServiceHTTP.createCustomerWeb(this.customer);
            promise.then(function (resp) {
                swal({
                title:"New customer Created",
                confirmButtonColor: '#009688'            
        });
                self.success1 = true;
                self.failure1 = false;
                window.location.href = "http://localhost:8080/coupons/AdminView/AdminView.html#/allCustomers";

            }, function (err) {
                swal(err.data);
                self.success1 = false;
                self.failure1 = true;
            });


        }
        //============ Create Customer1 =========================================================================
        this.success1 = false;
        this.failure1 = false;
        // function loadAfterCreate(){
        //     window.location.href="http://localhost:8080/coupons/AdminView/AdminView.html#/allCustomers"; }
           /**
       * Create a new Customer Object
       * @memberof CouponSystemApp
       * @function createCustomer1
       * @param {State} valid checks whether to run function or not
       * @return {external:Promise}  On success the promise will be resolved with 
       * a new Customer Object.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.createCustomer1 = function (valid) {
            console.log(this.formMain);
            if (this.formMain == undefined || this.formMain.custName == undefined
                || this.formMain.password == undefined) {
                this.success1 = false;
                this.failure1 = true;
                return;
            }
            this.success1 = false;
            this.failure1 = false;

            if (valid) {
                var promisePost = adminServiceHTTP.createCustomerWeb(this.formMain);
                promise.then(function (resp) {
                    swal({
                title:"New customer Created",
                confirmButtonColor: '#009688'            
        });
                    self.success1 = true;
                    self.failure1 = false;
                    setTimeout(function () {
                        window.location.href = "http://localhost:8080/coupons/AdminView/AdminView.html#/allCustomers";
                    }, (2 * 1000));


                }, function (err) {
                    swal(err.data);
                    self.success1 = false;
                    self.failure1 = true;
                });
            }
            else {
                console.log("I'm not valid!");
            }


        }
        //============================= refresh to view all Companies ===========================================
           /**
       * returns an array of all Companies
       * @memberof CouponSystemApp
       * @function refresh
       * @return {external:Promise}  On success the promise will be resolved with 
       * an array of all Companies.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.refresh = function () {
            var promise = adminServiceHTTP.getAllCompaniesWeb();
            promise.then(function (resp) {
                self.companies = resp.data;


            }, function (err) {
                console.log(err.data);
            });
        }
        //============================= refresh to view all Customers ===========================================
           /**
       * returns an array of all Companies
       * @memberof CouponSystemApp
       * @function refreshCustomers
       * @return {external:Promise}  On success the promise will be resolved with 
       * returns an array of all Companies.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.refreshCustomers = function () {
            var promise = adminServiceHTTP.getAllCustomersWeb();
            promise.then(function (resp) {
                self.customers = resp.data;


            }, function (err) {
                console.log(err.data);
            });
        }

        //============================= delete company ===========================================
           /**
       * Delete a Company Object by the Company
       * @memberof CouponSystemApp
       * @function delete
       * @param {Object} c is the Company Object to delete
       * @return {external:Promise}  On success the promise will be resolved with 
       * removing Company property from DB by the given Company.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.delete = function (c) {
            
            sweetAlert({
                title: "Are You Sure?",
                text: "are you sure you want to delete  " + c.compName + " company?",
                type: "warning",
                confirmButtonColor: '#009688',
                showCancelButton: true
            }, function () {
                // var flag = confirm("are you sure you want to delete  " + c.compName + " company?");
                // if (flag) {
                var promise = adminServiceHTTP.deleteCompany(c.id);
                promise.then(function (resp) {

                    //self.company.id = resp.data;
                    console.log(c.compName + ' deleted');
                    swal({title:c.compName + " deleted",
                    confirmButtonColor: '#009688'})
                    location.reload();




                }, function (err) {
                    console.log(err.data);
                });
            });
        }
        //============================= delete Customer ===========================================
           /**
       * Delete a Customer Object by the given Customer
       * @memberof CouponSystemApp
       * @function deleteCust
       * @param {Object} c is the Customer Object to delete
       * @return {external:Promise}  On success the promise will be resolved with 
       * removing Customer property from DB by the given Customer.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.deleteCust = function (c) {
            sweetAlert({
                title: "Are You Sure?",
                text: "are you sure you want to delete the customer named " + c.custName + "?",
                type: "warning",
                confirmButtonColor: '#009688',
                showCancelButton: true
            },
             function () {
                // var flag = confirm("are you sure you want to delete the customer named " + c.custName + "?");
                // if (flag) {
                var promise = adminServiceHTTP.deleteCustomerweb(c);
                promise.then(function (resp) {

                    //self.company.id = resp.data;
                    console.log(c.custName + ' deleted');
                    swal({title:c.custName + " deleted",
                    confirmButtonColor: '#009688'});
                    location.reload();

                }, function (err) {
                    console.log(err.data);
                });
            });
        }
        //============  Update Company =========================================================================
           /**
       * Update a Company Object by the given Company
       * @memberof CouponSystemApp
       * @function updateCompany
       * @param {Object} c is the Company Object to update
       * @return {external:Promise}  On success the promise will be resolved with 
       * updating a Company property in DB by the given Company.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.updateCompany = function (c) {
            console.log(c);
            var promise = adminServiceHTTP.updateCompanyweb(c);
            promise.then(function (resp) {
                console.log(c.compName + ' updated');

            }, function (err) {
                console.log(err.data);
            });

        }
        //============  Update Customer =========================================================================
           /**
       * Update a Customer Object by the given Customer
       * @memberof CouponSystemApp
       * @function updateCustomer
       * @param {Object} c is the Company Object to update
       * @return {external:Promise}  On success the promise will be resolved with 
       * updating a Customer property in DB by the given Customer.<br>
       * On error the promise will be rejected with an {@link Error}.
       */
        this.updateCustomer = function (c) {
            console.log(c);
            var promise = adminServiceHTTP.updateCustomerweb(c);
            promise.then(function (resp) {
                console.log(c.custName + ' updated');

            }, function (err) {
                console.log(err.data);
            });

        }
    }
})();