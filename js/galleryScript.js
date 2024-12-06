// 模拟项目数据
const projects = {
  1: {
    title: "Villa Sereno",
    description: "An elegant modern home with stunning architecture and an infinity pool design.",
    images: [
      { url: "images/gallery/img1.jpg", caption: "Infinity pool with breathtaking views" },
      { url: "images/gallery/img7.jpg", caption: "Modern architecture with clean lines" },
      { url: "images/gallery/img8.jpg", caption: "Spacious living room with natural light" }
    ]
  },
  2: {
    title: "Hikari House",
    description: "A Japanese-inspired home featuring natural materials and a serene aesthetic.",
    images: [
      { url: "images/gallery/img2.jpg", caption: "Front view at sunset" },
      { url: "images/gallery/img9.jpg", caption: "Interior with Japanese flair" },
      { url: "images/gallery/img10.jpg", caption: "A harmonious design that blends with nature" },
      { url: "images/gallery/img11.jpg", caption: "Elegant dining and kitchen area" }
    ]
  },
  3: {
      title: "jason House",
      description: "A Japanese-inspired home featuring natural materials and a serene aesthetic.",
      images: [
        { url: "images/gallery/img3.jpg", caption: "Front view at sunset" },
        { url: "images/gallery/img7.jpg", caption: "Interior with Japanese flair" },
        { url: "images/gallery/img8.jpg", caption: "A harmonious design that blends with nature" },
        { url: "images/gallery/img9.jpg", caption: "Elegant dining and kitchen area" }
      ],
    },
  4: {
        title: "jason House",
        description: "A Japanese-inspired home featuring natural materials and a serene aesthetic.",
        images: [
          { url: "images/gallery/img4.jpg", caption: "Front view at sunset" },
          { url: "images/gallery/img5.jpg", caption: "Interior with Japanese flair" },
          { url: "images/gallery/img6.jpg", caption: "A harmonious design that blends with nature" },
        ],
      },
  5: {
          title: "ryan House",
          description: "A Japanese-inspired home featuring natural materials and a serene aesthetic.",
          images: [
            { url: "images/gallery/img5.jpg", caption: "Front view at sunset" },
            { url: "images/gallery/img6.jpg", caption: "Interior with Japanese flair" },
            { url: "images/gallery/img7.jpg", caption: "A harmonious design that blends with nature" },
            { url: "images/gallery/img8.jpg", caption: "Elegant dining and kitchen area" }
          ]
  
  }
  // Add more projects here...
};

$(function() {
  // 设置参数
  var images_height = '560px';
  const projectId = getProjectId();
  if (projectId === "1") {
    images_url = [
        "images/gallery/img1.jpg",
        "images/gallery/img7.jpg",
        "images/gallery/img8.jpg"
    ];
} else if (projectId === "2") {
    images_url = [
      "images/gallery/img2.jpg",
      "images/gallery/img9.jpg",
      "images/gallery/img10.jpg",
        "images/gallery/img11.jpg"
    ];
} else if (projectId === "3") {
    images_url = [
      "images/gallery/img3.jpg",
      "images/gallery/img7.jpg",
      "images/gallery/img8.jpg",
        "images/gallery/img9.jpg"
    ];
}
else if (projectId === "4") {
  images_url = [
    "images/gallery/img4.jpg",
    "images/gallery/img5.jpg",
    "images/gallery/img6.jpg",
     
  ];
} 
else if (projectId === "5") {
  images_url = [
    "images/gallery/img5.jpg",
    "images/gallery/img6.jpg",
    "images/gallery/img7.jpg",
     
  ];
} else {
    // 默认图片或错误提示
    images_url = [
        "images/default/img1.jpg",
        "images/default/img2.jpg"
    ];
}

// 后续轮播图逻辑...
var images_count = images_url.length;

// 创建轮播图节点
$(".gallery-banner ul").empty();
$(".gallery-banner ol").empty();


  // 创建节点
  for (var j = 0; j < images_count + 1; j++) {
      $('.gallery-banner ul').append('<li></li>');
  }
  for (var j = 0; j < images_count; j++) {
      if (j == 0) {
          $('.gallery-banner ol').append('<li class="current"></li>');
      } else {
          $('.gallery-banner ol').append('<li></li>');
      }
  }

  // 载入图片
  $('.gallery-banner ul li').css('background-image', 'url(' + images_url[0] + ')');
  $.each(images_url, function(key, value) {
      $('.gallery-banner ul li').eq(key).css('background-image', 'url(' + value + ')');
  });

  $('.gallery-banner').css('height', images_height);
  $('.gallery-banner ul').css('width', (images_count + 1) * 100 + '%');
  $('.gallery-banner ol').css('width', images_count * 20 + 'px');
  $('.gallery-banner ol').css('margin-left', -images_count * 20 * 0.5 - 10 + 'px');

  var num = 0;
  var timer = null;
  var window_width = $(window).width();

  $(window).resize(function() {
      window_width = $(window).width();
      var current_index = $('.gallery-banner ol .current').index();
      $('.gallery-banner ul').stop().animate({ left: -window_width * current_index }, 300);
      $('.gallery-banner ul li').css({ width: window_width });
  });

  $('.gallery-banner ul li').width(window_width);

  $('.gallery-banner ol li').mouseover(function() {
      $(this).addClass('current').siblings().removeClass('current');
      var i = $(this).index();
      $('.gallery-banner ul').stop().animate({ left: -i * window_width }, 500);
      num = i;
  });

  function prevPlay() {
      num--;
      if (num < 0) {
          $('.gallery-banner ul').css({ left: -window_width * images_count }).stop().animate({ left: -window_width * (images_count - 1) }, 500);
          num = images_count - 1;
      } else {
          $('.gallery-banner ul').stop().animate({ left: -num * window_width }, 500);
      }
      updateCurrentDot();
  }

  function nextPlay() {
      num++;
      if (num > images_count) {
          $('.gallery-banner ul').css({ left: 0 }).stop().animate({ left: -window_width }, 500);
          num = 1;
      } else {
          $('.gallery-banner ul').stop().animate({ left: -num * window_width }, 500);
      }
      updateCurrentDot();
  }

  function updateCurrentDot() {
      if (num == images_count) {
          $('.gallery-banner ol li').eq(0).addClass('current').siblings().removeClass('current');
      } else {
          $('.gallery-banner ol li').eq(num).addClass('current').siblings().removeClass('current');
      }
  }

  timer = setInterval(nextPlay, 2000);

  $('.gallery-banner').mouseenter(function() {
      clearInterval(timer);
      $('.gallery-banner i').fadeIn();
  }).mouseleave(function() {
      timer = setInterval(nextPlay, 2000);
      $('.gallery-banner i').fadeOut();
  });

  $('.gallery-banner .right').click(function() {
      nextPlay();
  });

  $('.gallery-banner .left').click(function() {
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
















// 获取 URL 参数
function getProjectId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id"); // 获取 'id' 参数值
}

// 动态渲染页面内容
function renderProjectPage() {
  const projectId = getProjectId();
  const project = projects[projectId];

  if (!project) {
    document.getElementById("project-page").innerHTML = "<p>Project not found.</p>";
    return;
  }

  // 创建标题和描述
  const title = `<h1 class="project-title">${project.title}</h1>`;
  const description = `<p class="project-description">${project.description}</p>`;

  // 创建轮播图
  let carousel = `<div class="gallery-banner">
  <ul></ul> <!-- 动态添加图片 -->
  <ol></ol> <!-- 动态添加切换圆点 -->

</div>`;


  // 创建图片网格
  let photoGrid = '<div class="photo-grid">';
    project.images.forEach((img, index) => {
      photoGrid += `
        <div class="photo-grid-item">
          <img src="${img.url}" alt="${img.caption}">
          <div class="photo-description">
            <h3>${img.caption}</h3>
            <p>${img.caption} - This is a detailed description for image ${index + 1}.</p>
          </div>
        </div>`;
    });
photoGrid += "</div>";


  // 渲染页面
  document.getElementById("project-page").innerHTML = title + description  + carousel + photoGrid;
}

// 页面加载后渲染
document.addEventListener("DOMContentLoaded", renderProjectPage);
