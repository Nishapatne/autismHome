
var scrolled=0;
var prev = 0;
var jsheight = $('.feature').height();




(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);


$(document).ready(function(){
    // $('.main-block').on('scroll', function() {
 //        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
 //            $('.read-more-btn').fadeOut();
 //        }
 //        else{
 //            $('.read-more-btn').fadeIn();
 //        }

 //    })
        
 //    $(".btn-orange").on("click" ,function(){
    //  var jsheight = $('.feature').height();
    //  $('.feature').css('height',jsheight);
 //                scrolled=scrolled+300;
    //          $('.main-block').animate({
    //              scrollTop:scrolled},
 //        1500);
    //  });

 //    $('.test-popup-link').magnificPopup({
    //   type: 'image'
    //   // other options
    // });
    if($(".main-block").hasScrollBar() == true){
        $('.read-more-btn').css('display','block');
      $('.main-block').on("scroll", function() {
      if($('.main-block').scrollTop() > 50) {
          $(".read-more-btn").fadeOut();
      } else {
         $(".read-more-btn").fadeIn();
      }
    });
   }
   
  });
