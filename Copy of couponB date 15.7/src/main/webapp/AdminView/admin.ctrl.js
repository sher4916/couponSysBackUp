(function () {

    var module = angular.module("CouponSystemApp");

    module.controller("adminCtrl", adminCtrlCtor);

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

        this.setOrder = function (category) {
            this.goUp = (this.order != category) ? false : !this.goUp;
            this.order = category;

        }


        //============ View All Companies =========================================================================

        var promise = adminServiceHTTP.getAllCompaniesWeb();
        promise.then(function (resp) {
            self.companies = resp.data;


        }, function (err) {
            console.log(err.data);
        });
        //============ Company By ID =========================================================================
        this.getCompanyById = function () {
            var promise = adminServiceHTTP.getCompanyByIdWeb(this.company.id);
            promise.then(function (resp) {

                self.companies = [resp.data];

            }, function (err) {
                console.log(err);
            });
        }




        //============ View All Customers =========================================================================

        var promise = adminServiceHTTP.getAllCustomersWeb();
        promise.then(function (resp) {
            self.customers = resp.data;


        }, function (err) {
            console.log(err.data);
        });
        //============ Customer By ID =========================================================================
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
                swal("New Company Created");

                self.success = true;
                self.failure = false;
                window.location.href = "http://localhost:8080/couponB/AdminView/AdminView.html#/allCompanies";

            }, function (err) {
                swal(err.data);
                self.success = false;
                self.failure = true;
            });


        }


        //============ Create Customer =========================================================================
        this.success1 = false;
        this.failure1 = false;

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
                swal("New customer Created");
                self.success1 = true;
                self.failure1 = false;
                window.location.href = "http://localhost:8080/couponB/AdminView/AdminView.html#/allCustomers";

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
        //     window.location.href="http://localhost:8080/couponB/AdminView/AdminView.html#/allCustomers"; }
        this.createCustomer1 = function (valid) {
             console.log(this.formMain);
            // if (this.formMain == undefined || this.formMain.custName == undefined
            //     || this.formMain.password == undefined) {
            //     this.success1 = false;
            //     this.failure1 = true;
            //     return;
            // }
            // this.success1 = false;
            // this.failure1 = false;
          
            if (valid) {
                var promisePost = adminServiceHTTP.createCustomerWeb(this.formMain);
                promise.then(function (resp) {
                    swal("New customer Created");
                    self.success1 = true;
                    self.failure1 = false;
                    setTimeout(function () {
                       window.location.href = "http://localhost:8080/couponB/AdminView/AdminView.html#/allCustomers";
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
        this.refresh = function () {
            var promise = adminServiceHTTP.getAllCompaniesWeb();
            promise.then(function (resp) {
                self.companies = resp.data;


            }, function (err) {
                console.log(err.data);
            });
        }
        //============================= refresh to view all Customers ===========================================
        this.refreshCustomers = function () {
            var promise = adminServiceHTTP.getAllCustomersWeb();
            promise.then(function (resp) {
                self.customers = resp.data;


            }, function (err) {
                console.log(err.data);
            });
        }

        //============================= delete company ===========================================
        this.delete = function (c) {
            sweetAlert({
                title: "Are You Sure?",
                text: "are you sure you want to delete  " + c.compName + " company?",
                type: "warning",
                showCancelButton: true
            }, function () {
                // var flag = confirm("are you sure you want to delete  " + c.compName + " company?");
                // if (flag) {
                var promise = adminServiceHTTP.deleteCompany(c.id);
                promise.then(function (resp) {

                    //self.company.id = resp.data;
                    console.log(c.compName + ' deleted');
                    location.reload();




                }, function (err) {
                    console.log(err.data);
                });
            });
        }
        //============================= delete Customer ===========================================
        this.deleteCust = function (c) {
            sweetAlert({
                title: "Are You Sure?",
                text: "are you sure you want to delete the customer named " + c.custName + "?",
                type: "warning",
                showCancelButton: true
            }, function () {
                // var flag = confirm("are you sure you want to delete the customer named " + c.custName + "?");
                // if (flag) {
                var promise = adminServiceHTTP.deleteCustomerweb(c);
                promise.then(function (resp) {

                    //self.company.id = resp.data;
                    console.log(c.custName + ' deleted');
                    swal(c.custName + " deleted")
                    location.reload();




                }, function (err) {
                    console.log(err.data);
                });
            });
        }
        //============  Update Company =========================================================================
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