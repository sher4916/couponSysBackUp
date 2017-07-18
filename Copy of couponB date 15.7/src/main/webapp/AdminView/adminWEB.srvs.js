
(function () {

    var module = angular.module("CouponSystemApp");

    module.service("adminServiceHTTP", adminServiceHTTPCtor);

    function adminServiceHTTPCtor($http) {
        var company={};

        //============ View Alll Companies =========================================================================
        this.getAllCompaniesWeb = function () {
            return $http.get('http://localhost:8080/couponB/webapi/admin/companies');
        }
        //============ View Alll Customers =========================================================================
        this.getAllCustomersWeb = function () {
            return $http.get('http://localhost:8080/couponB/webapi/admin/customers');
        }
        //============ Create Company =========================================================================
        this.createCompanyWeb = function (company) {
            
            return $http.post('http://localhost:8080/couponB/webapi/admin/company',company);
        }
           //============ Create Customer =========================================================================
        this.createCustomerWeb = function (customer) {
            
            return $http.post('http://localhost:8080/couponB/webapi/admin/customer',customer);
        }
        //============  Company By ID =========================================================================
        this.getCompanyByIdWeb = function (id) {
            return $http.get('http://localhost:8080/couponB/webapi/admin/company/'+id);
        }
         //============  Customer By ID =========================================================================
        this.getCustomerByIdWeb = function (id) {
            return $http.get('http://localhost:8080/couponB/webapi/admin/customer/'+id);
        }

         //============  Delete Company =========================================================================
        this.deleteCompany = function (id) {
           
            return $http.delete('http://localhost:8080/couponB/webapi/admin/deletecompany/'+id);
        }
          //============  Delete Customer =========================================================================
        this.deleteCustomerweb = function (customer) {
           
            return $http.put('http://localhost:8080/couponB/webapi/admin/deletecustomer',customer);
        }
           //============  Update Company =========================================================================
        this.updateCompanyweb = function (company) {
           
            return $http.put('http://localhost:8080/couponB/webapi/admin/updatecompany',company);
        }

             //============  Update Customer =========================================================================
        this.updateCustomerweb = function (customer) {
           
            return $http.put('http://localhost:8080/couponB/webapi/admin/updatecustomer',customer);
        }



    }


})();