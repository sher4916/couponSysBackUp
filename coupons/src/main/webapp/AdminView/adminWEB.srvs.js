(function () {

    var module = angular.module("CouponSystemApp");

    module.service("adminServiceHTTP", adminServiceHTTPCtor);
/**
      * @memberof CouponSystemApp
      * @ngdoc web Service
      * @name adminServiceHTTP
      * @param {object} $http {@link http://docs.angularjs.org/api/ng.$http}
      * @external Promise
      * @function adminServiceHTTPCtor
      * @description This is an angularjs web service for admin user in coupon system.
      */
    function adminServiceHTTPCtor($http) {
        var company={};

        //============ View Alll Companies =========================================================================
         /**
       * returns an array of all Companies
       * @memberof CouponSystemApp
       * @function getAllCompaniesWeb
       * @return {Array} of all Companies
       */
        this.getAllCompaniesWeb = function () {
            return $http.get('http://localhost:8080/coupons/webapi/admin/companies');
        }
        //============ View Alll Customers =========================================================================
          /**
       * returns an array of all customers
       * @memberof CouponSystemApp
       * @function getAllCustomersWeb
       * @return {Array} of all customers
       */
        this.getAllCustomersWeb = function () {
            return $http.get('http://localhost:8080/coupons/webapi/admin/customers');
        }
        //============ Create Company =========================================================================
           /**
       * Create a new Company in DB
       * @memberof CouponSystemApp
       * @function createCompanyWeb
       *  @param {object} company to create
       */
        this.createCompanyWeb = function (company) {
            
            return $http.post('http://localhost:8080/coupons/webapi/admin/company',company);
        }
           //============ Create Customer =========================================================================
       /**
       * Create a new Customer in DB
       * @memberof CouponSystemApp
       * @function createCustomerWeb
       *  @param {object} customer to create
       */
        this.createCustomerWeb = function (customer) {
            
            return $http.post('http://localhost:8080/coupons/webapi/admin/customer',customer);
        }
        //============  Company By ID =========================================================================
         /**
       * returns a Company of the given id
       * @memberof CouponSystemApp
       * @function getCompanyByIdWeb
       *  @param {String} id of the Company
       * @return {Object} Company of the given id
       */
        this.getCompanyByIdWeb = function (id) {
            return $http.get('http://localhost:8080/coupons/webapi/admin/company/'+id);
        }
         //============  Customer By ID =========================================================================
        /**
       * returns a Customer of the given id
       * @memberof CouponSystemApp
       * @function getCustomerByIdWeb
       *  @param {String} id of the Customer
       * @return {Object} Customer of the given id
       */
        this.getCustomerByIdWeb = function (id) {
            return $http.get('http://localhost:8080/coupons/webapi/admin/customer/'+id);
        }

         //============  Delete Company =========================================================================
         /**
       * Delete Company from DB
       * @memberof CouponSystemApp
       * @function deleteCompany
       *  @param {object} Company to Delete
       */
        this.deleteCompany = function (id) {
           
            return $http.delete('http://localhost:8080/coupons/webapi/admin/deletecompany/'+id);
        }
          //============  Delete Customer =========================================================================
          /**
       * Delete Customer from DB
       * @memberof CouponSystemApp
       * @function deleteCustomerweb
       *  @param {object} Customer to Delete
       */
        this.deleteCustomerweb = function (customer) {
           
            return $http.put('http://localhost:8080/coupons/webapi/admin/deletecustomer',customer);
        }
           //============  Update Company =========================================================================
           /**
       * Update Company in DB
       * @memberof CouponSystemApp
       * @function updateCompanyweb
       *  @param {object} Company to Update
       */
        this.updateCompanyweb = function (company) {
           
            return $http.put('http://localhost:8080/coupons/webapi/admin/updatecompany',company);
        }

             //============  Update Customer =========================================================================
           /**
       * Update Customer in DB
       * @memberof CouponSystemApp
       * @function updateCustomerweb
       *  @param {object} Customer to Update
       */
        this.updateCustomerweb = function (customer) {
           
            return $http.put('http://localhost:8080/coupons/webapi/admin/updatecustomer',customer);
        }



    }


})();