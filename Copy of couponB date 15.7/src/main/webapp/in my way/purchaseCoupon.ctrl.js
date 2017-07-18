(function()
{
 
var module = angular.module("CouponSystemApp");
 
    module.controller("PurchaseCouponCtrl", PurchaseCouponCtor);
 
    // Ctor method for the MainCtrl
    function PurchaseCouponCtor( mockServiceHTTP )
    {
        this.coupons = [];
        var self = this;
            this.getCoupons = function()
            {
                    
                    // To test failure scenario, use: 
                    //  var promise = mockServiceHTTP.getCouponFailue();
 
                    // This will return a success result
                    var promise = mockServiceHTTP.getCoupons();
                    promise.then(
                    function(resp)
                    {
                        //alert(resp.data);
                        self.coupons = resp.data;
 
                        }, 
                    function(err)
                    {
                        alert(err.data);
                        });
 
                    
                } 
    }
 
})();