(function () {

    var module = angular.module("CouponSystemApp");

    module.controller("GetCouponsByTypeCtrl", GetCouponsByTypeCtrlCtor);

    function GetCouponsByTypeCtrlCtor(mockServiceHTTP) {
        this.couponByType = [];
        var self = this;
        this.type;
       
        // function selectType(dataPassedFromNgClick) {
        //     var promise = mockServiceHTTP.getCouponsByType(this.type);
        //     promise.then(
        //         function (resp) {
        //             self.couponByType = resp.data;

        //         },
        //         function (err) {
        //             alert(err.data);
        //         });
        //     this.type.show = false;


            this.getByType=function(typeee){
                console.log(typeee)
                 var promise = mockServiceHTTP.getCouponsByType(typeee);
            promise.then(
                function (resp) {
                    self.couponByType = resp.data;

                },
                function (err) {
                    alert(err.data);
                });
            }



    }

})();