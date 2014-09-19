

var updateUrl = function ( anchor ) {
    if ( history.pushState ) {
      history.pushState( {
        pos: anchor.id
      }, '', window.location.pathname + anchor );
    }
  };


$(function() {

  var fixadent = $("#fixadent"), pos = fixadent.offset();

  $(window).scroll( function() {
    var scroll = $(this).scrollTop();
    
    if (scroll >= 600) {
        $("#site-header").addClass("fixed");
    } else {
        $("#site-header").removeClass("fixed");
    }
  
  });

  $('#site-header .menu-icon').click(function() {
    $('#site-header').toggleClass('active');
  });


  $("a.scroll").click( function(e){

    $('#site-header').removeClass('active').addClass('fixed');

    event.preventDefault();

    var headHeight  = $('#site-header').height();
   
    var this_offset = $(this).offset();
    var that_id     = $(this).attr("href");
    var that_offset = $(that_id).offset();
    var offset_diff = Math.abs(that_offset.top - this_offset.top);
   
    var base_speed  = 300; // Time in ms per 1,000 pixels
    var speed       = (offset_diff * base_speed) / 1000;
    
    updateUrl(that_id)

    $("html,body").animate({
      scrollTop: that_offset.top - headHeight
    }, speed);
  
  });


});
