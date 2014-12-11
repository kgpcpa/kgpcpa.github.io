var splashCount = 6;


function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


function applyPadding() {

  var padding, 
      bodyOffset,
      wHeight = $(window).height(),
      section = $('.site-body .section:last'),
      menu = $('#site-header'),
      push = $('#push');


  if (wHeight > 645) {
    bodyOffset = 645;
  } else {
    bodyOffset = wHeight;
  }

  $('.site-body').css('top', bodyOffset);

  padding = ((wHeight - menu.outerHeight()) - section.outerHeight());

  if (padding > 0) {
    push.css('height', padding + 'px');
  }
};


function updateUrl( anchor ) {
  if ( history.pushState ) {
    history.pushState( {
      pos: anchor.id
    }, '', window.location.pathname + anchor );
  }
};


function activateSection(scrollTop) {
  scrollTop = scrollTop + $('#site-header').height();

  $('a.scroll').each(function () {
    var sectionId = $(this).attr("href");

    if (sectionId === "#") {
      return;
    }
    
    var section = $(sectionId),
        sTop    = section.offset().top;
    
    if (sTop <= scrollTop && sTop + section.outerHeight() > scrollTop) {
      var outstanding = $('a.scroll.active')[0];

      if (outstanding && outstanding !== this) {
        $(outstanding).removeClass("active");
      }
      
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });
}


function scrollToSection(context, section) {
    var headHeight  = $('#site-header').height(),   
        this_offset = $(context).offset(),
        that_offset = $(section).offset(),
        offset_diff = Math.abs(that_offset.top - this_offset.top),
        base_speed  = 300,
        speed       = (offset_diff * base_speed) / 1000;
        
    animateScrollTo(that_offset.top - headHeight, speed)
};


function animateScrollTo(position, speed) {
  $("html,body").animate({
    scrollTop: position
  }, speed);
}


function updateHeader(state) {
  var header = $('#site-header');
  
  if (state === 'fixed') {
    header.removeClass('active').addClass('fixed');
  } else {
    header.removeClass('active').removeClass('fixed');
  }

}




$(function() {
  applyPadding();

  var bgNum = Math.floor(Math.random() * splashCount) + 1;

  $('.site-sub-header').addClass('bg-' + bgNum);

  var fixadent = $("#fixadent"), pos = fixadent.offset();

  $(window).scroll( function() {
    var scroll = $(this).scrollTop();
    
    if (scroll >= 500) {
        $("#site-header").addClass("fixed");
    } else {
        $("#site-header").removeClass("fixed");
    }
    
    activateSection(scroll);

  });

  // var containerElement = document.getElementById('scroll-container');

  // var scroller = new FTScroller(containerElement, {
  //     scrollbars: true,
  //     bouncing: false
  // });



  window.addEventListener('resize', 
    debounce(
      function() {
        applyPadding()
      }, 
      250
    )
  );


  $('#site-header .menu-icon').click(function() {
    $('#site-header').toggleClass('active');
  });


  $("a.scroll").click( function(e){
    e.preventDefault();

    var href = $(this).attr("href");

    updateUrl(href)

    if (href === "#") {
      updateHeader();
      animateScrollTo(0);
    } else {
      updateHeader('fixed');
      scrollToSection(this, href);
    }
  
  });


});
