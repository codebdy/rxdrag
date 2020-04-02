
var $window = $(window);
          
// BEGIN: Layout Go To Top
var LayoutGo2Top = function () {

  var handle = function () {
    var currentWindowPosition = $(window).scrollTop(); // current vertical position
    if (currentWindowPosition > 300) {
      $(".go2top").show();
    } else {
      $(".go2top").hide();
    }
  };

  return {

    //main function to initiate the module
    init: function () {

      handle(); // call headerFix() when the page was loaded

      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        $(window).bind("touchend touchcancel touchleave", function (e) {
          handle();
        });
      } else {
        $(window).scroll(function () {
          handle();
        });
      }

      $(".go2top").on('click', function (e) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        }, 600);
      });
    }

  };
}();
// END: Layout Go To Top

// BEGIN: Layout Header
var LayoutHeader = function () {
  var offset = 80;
  var _handleHeaderOnScroll = function () {
    if ($(window).scrollTop() > offset) {
      $("body").addClass("page-on-scroll");
    } else {
      $("body").removeClass("page-on-scroll");
    }
  }


  return {
    init: function () {

      _handleHeaderOnScroll();

      $(window).scroll(function () {
        _handleHeaderOnScroll();
      });
    }
  };
}();
// END



// Main theme initialization
$(document).ready(function () {
  // init layout handlers
  LayoutGo2Top.init();
  LayoutHeader.init();
});