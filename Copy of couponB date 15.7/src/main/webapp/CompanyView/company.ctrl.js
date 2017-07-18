(function () {


    var module = angular.module("CouponSystemApp");

// angular.module("CouponSystemApp").directive("myKendall", function() {
//     return {
//         template :'Company: {{company.compName}}<br/>{{company.email}}'


//     };
// });

angular.module("CouponSystemApp").directive("myKendall", function() {
    return {
       template: 'Company: {{company.compName}}<br/>{{company.email}}'

    };
});

    module.controller("CompanyCtrl", CompanyCtrlCtor);

    function CompanyCtrlCtor(companyWebAPIServiceHTTP) {
        this.coupons = [];
        this.coupon = {};
        this.company = {};
        this.company1 = {};
        this.couponsfilteredByID = [];
        this.newCoupon={};


        
        var self = this;

        this.success = false;
        this.failure = false;


    var promise = companyWebAPIServiceHTTP.getCompany();
        promise.then(function (resp) {
            self.company = resp.data;

        }, function (err) {
            console.log(err.data);
        });
        //============ Order2 By Coloumn Name ==============================================================
        this.order = "";
		this.goUp = false;

		this.setOrder = function(category) {
			this.goUp = (this.order != category) ? false : !this.goUp;
			this.order = category;

		}
          //============================= delete Coupon ===========================================
        this.deleteCoup = function (c) {
             sweetAlert({
                title: "Are You Sure?",
                text: "are you sure you want to delete the customer named " + c.title + "?",
                type: "warning",
                showCancelButton: true
            },function(){
            // var flag = confirm("are you sure you want to delete the customer named " + c.title + "?");
            // if (flag) {
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
                    swal("New Coupon Created","","success");
                    // self.coupons = resp.data;
                    // self.Coupon = {};
                    self.success = true;
                    self.failure = false;
                    window.location.href = "http://localhost:8080/couponB/CompanyView/CompanyView.html#/getCompanyCoupons"; 
                   
                },
                function (err) {
                    console.log(err.data);
                    self.success = false;
                    self.failure = true;
                });

        }
        //================== Company Details =========================================
        // var promise = companyWebAPIServiceHTTP.getCompany();
        // promise.then(function (resp) {
        //     self.company = resp.data;

        // }, function (err) {
        //     console.log(err.data);
        // });
        //================== Get all Company Own Coupons =========================================
        var promise = companyWebAPIServiceHTTP.getCompanyOwnCoupons();
        promise.then(
            function (resp) {
                
                self.coupons = resp.data;

            },
            function (err) {
                console.log(err.data);
            });

        //================== Filter by id =========================================
        this.filterById = function () {

            var promise = companyWebAPIServiceHTTP.filterByIdService(this.coupon.id);

            promise.then(function (resp) {
                self.coupons = [resp.data];

            }, function (err) {
                console.log(err.data);
            });
        }
        //=============== Get Company Coupon that will expire until Date  =============================
        this.getUntilDate = function () {

            var promise = companyWebAPIServiceHTTP.getCouponsBeforeExpiredDate(this.coupon.date);

            promise.then(function (resp) {
                self.coupons = resp.data;

            }, function (err) {
                console.log(err.data);
            });
        }

    }






})();