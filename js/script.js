$(function() {
  // 设置参数
  var images_height = '560px';
  var images_url = [
      'images/img04.JPG',
      'images/img02.JPG',
      'images/img03.JPG'
  ];
  var images_count = images_url.length;

  // 创建节点
  for (var j = 0; j < images_count + 1; j++) {
      $('.banner ul').append('<li></li>');
  }
  for (var j = 0; j < images_count; j++) {
      if (j == 0) {
          $('.banner ol').append('<li class="current"></li>');
      } else {
          $('.banner ol').append('<li></li>');
      }
  }

  // 载入图片
  $('.banner ul li').css('background-image', 'url(' + images_url[0] + ')');
  $.each(images_url, function(key, value) {
      $('.banner ul li').eq(key).css('background-image', 'url(' + value + ')');
  });

  $('.banner').css('height', images_height);
  $('.banner ul').css('width', (images_count + 1) * 100 + '%');
  $('.banner ol').css('width', images_count * 20 + 'px');
  $('.banner ol').css('margin-left', -images_count * 20 * 0.5 - 10 + 'px');

  var num = 0;
  var timer = null;
  var window_width = $(window).width();

  $(window).resize(function() {
      window_width = $(window).width();
      var current_index = $('.banner ol .current').index();
      $('.banner ul').stop().animate({ left: -window_width * current_index }, 300);
      $('.banner ul li').css({ width: window_width });
  });

  $('.banner ul li').width(window_width);

  $('.banner ol li').mouseover(function() {
      $(this).addClass('current').siblings().removeClass('current');
      var i = $(this).index();
      $('.banner ul').stop().animate({ left: -i * window_width }, 500);
      num = i;
  });

  function prevPlay() {
      num--;
      if (num < 0) {
          $('.banner ul').css({ left: -window_width * images_count }).stop().animate({ left: -window_width * (images_count - 1) }, 500);
          num = images_count - 1;
      } else {
          $('.banner ul').stop().animate({ left: -num * window_width }, 500);
      }
      updateCurrentDot();
  }

  function nextPlay() {
      num++;
      if (num > images_count) {
          $('.banner ul').css({ left: 0 }).stop().animate({ left: -window_width }, 500);
          num = 1;
      } else {
          $('.banner ul').stop().animate({ left: -num * window_width }, 500);
      }
      updateCurrentDot();
  }

  function updateCurrentDot() {
      if (num == images_count) {
          $('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
      } else {
          $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');
      }
  }

  timer = setInterval(nextPlay, 2000);

  $('.banner').mouseenter(function() {
      clearInterval(timer);
      $('.banner i').fadeIn();
  }).mouseleave(function() {
      timer = setInterval(nextPlay, 2000);
      $('.banner i').fadeOut();
  });

  $('.banner .right').click(function() {
      nextPlay();
  });

  $('.banner .left').click(function() {
      prevPlay();
  });
});


$(document).ready(function() {
    // Function to check if an element is in view
    function isInView(element) {
        var scrollPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var elementTop = $(element).offset().top;

        return (scrollPos + windowHeight > elementTop + 100); // Adjust for a smoother effect
    }

    // On scroll, check the position of each element with class 'fade'
    $(window).on('scroll', function() {
        $('.fade').each(function() {
            if (isInView(this)) {
                $(this).addClass('fade-in');
            }
        });
    });
});
