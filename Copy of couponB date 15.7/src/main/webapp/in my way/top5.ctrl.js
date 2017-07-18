(function () {


    var module = angular.module("CouponSystemApp");

    module.controller("top5Ctrl", top5CtrlCtor);

    function top5CtrlCtor() {
        var slideIndex = 1;
        showDivs(slideIndex);
        this.plusDivs = function (n) {
            showDivs(slideIndex += n)
        }
        // function plusDivs(n) {
        //     showDivs(slideIndex += n);
        // }

        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlides");
            if (n > x.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = x.length }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex - 1].style.display = "block";
        }
    }

})();