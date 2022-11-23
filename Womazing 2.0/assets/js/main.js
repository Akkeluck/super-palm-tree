

/* STICKY HEADER and SCROLL-DOWN */

$(window).scroll(function(){
  var sticky = $('.header-sticky'),
      scroll = $(window).scrollTop();

  if (scroll >= 70) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});

$('.btn-next').click(function(event) {
    // Preventing default action of the event
    event.preventDefault();
    // Getting the height of the document
    var n = $(document).height();
    $('html, body').animate({ scrollTop: 850 }, 400);
//                                       |    |
//                                       |    --- duration (milliseconds) 
//                                       ---- distance from the top
});

/* POPUP */

$(document).ready(function($) {
  $('.call-img').click(function() {
    $('.popup-fade').fadeIn();
    return false;
  });   

   $('.close-btn').click(function() {
    $('.popup-fade').fadeOut();
    return false;
  });  
  
  $('.popup-fade').click(function(e) {
    if ($(e.target).closest('.popup').length == 0) {
      $(this).fadeOut();          
    }
  });
  $('.popup-success__btn').click(function() {
    $('.popup-success__fade').fadeOut();
    return false;
  });  
  
  $('.popup-success__fade').click(function(e) {
    if ($(e.target).closest('.popup-info').length == 0) {
      $(this).fadeOut();          
    }
  });
});

/* VALIDATE */

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Функция валидации и вывода сообщений
    function valEl(el) {
        el.validate({
            rules: {
                phoneNumber: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                firstName: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                phoneNumber: {
                    required: 'This field is required',
                    regex: 'Phone number may contain such symbols as + - ()'
                },
                firstName: {
                    required: 'This field is required',
                },
                email: {
                    required: 'This field is required',
                    email: 'Incorrect e-mail form'
                }
            },

            submitHandler: function(form) {
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    case 'form-modal':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                            })
                            .fail(function() {
                                console.log('Fail');
                            })
                           .always(function() {
                                  console.log('Always');
                                  setTimeout(function() {
                                      $form.trigger('reset');
                                      $('.popup-fade').fadeOut();
                                  }, 1100);
                                  setTimeout(function() {
                                      $('.popup-success__fade').fadeIn();
                                  }, 1100);
                            });
                        break;
                        case 'form-cart':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                            })
                            .fail(function() {
                                console.log('Fail');
                                setTimeout(function() {
                                      $('.bag:before').fadeIn();
                                  }, 1000);
                            });
                        break;
                        case 'form-check':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                            })
                            .fail(function() {
                                console.log('Fail');
                                setTimeout(function() {
                                      $('.bag:before').fadeIn();
                                  }, 1000);
                            });
                        break;
                        case 'form-contacts':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                                setTimeout(function() {
                                      $form.trigger('reset');
                                      $('.data-content__success').fadeIn().css("display","inline-block");;
                                  }, 1100);
                            })
                            .fail(function() {
                                console.log('Fail');
                                setTimeout(function() {
                                      $form.trigger('reset');
                                      $('.data-content__fail').fadeIn().css("display","inline-block");;
                                  }, 1100);
                            })
                           .always(function() {
                                  console.log('Always');
                                  setTimeout(function() {
                                      $form.trigger('reset');
                                  }, 1100);
                            });
                        break;
                         case 'form-item':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                            })
                            .fail(function() {
                                console.log('Fail');
                                setTimeout(function() {
                                      $('.bag:before').fadeIn();
                                  }, 1000);
                            });
                        break;
                }
                return false;
            }
        })
    }
    $('.js-form').each(function() {
        valEl($(this));
    }); 
});


/* HAMBURGER */

$('.hamburger').on('click', function(){
    $('.menu').show();
});

$('.menu__close').on('click',function(){
    $('.menu').hide();
});

$('.sub').on('click', function(){
    $('.submenu').toggle();
});

/* TABS */

$('.tab-item').on('click',function(event){
    event.preventDefault();
    var currTab = $(this).index();

    $('.tab-item').removeClass('tab-item_active');
    $(this).addClass('tab-item_active');

    $('.tabs-content').removeClass('tabs-content_active');
    $('.tabs-content').removeClass('tabs-content_active');
    $('.tabs-content').eq(currTab).addClass('tabs-content_active');
    $('.tabs-content').eq(currTab).addClass('tabs-content_active');
})

/* Карта */

ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [50.444229, 30.623325],
            zoom: 16,
            controls: ['zoomControl','geolocationControl']
        });

        var myPlacemark = new ymaps.Placemark([50.444229, 30.623325],{} , {
            iconImageSize : [32, 40]
        })
        myGeoObject = new ymaps.GeoObject({
 
            geometry: {
                type: "Point",
                coordinates: [55.8, 37.8]
            },
        }),
        myMap.geoObjects.add(myPlacemark);
    }


 /* SLIDERS */

 $(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  arrows: false,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
  dotsClass: 'dots-style',
  asNavFor: ".slider-nav"
});
$(".slider-nav").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 500,
  asNavFor: ".slider-for",
  dots: false,
  arrows: false,
  fade: false,
  focusOnSelect: true,
  slide: "div",
});
$(".single-item").slick({
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  prevArrow: '<div class="prev"></div>',
  nextArrow: '<div class="next"></div>',
  slidesToShow: 1,
  dotsClass: 'dots-custom',
  slidesToScroll: 1,
   responsive: [
{
    breakpoint: 992,
       settings: { arrows: false }
  }
]
});