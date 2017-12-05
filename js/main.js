(function($){

  'use strict';

  function initNavbar () {
    if (!$('section:first').is('.parallax, #home, .splash')) {
      $('#topnav').addClass('scroll');
      $('body').addClass('top-padding');
    }

    if ($('section:first').is('#home') && $('#home').hasClass('bordered')) {
      $('#topnav').addClass('top-space');
    }

    $(window).scroll(function() {
      
      if($('section:first').is('.parallax, #home, .splash')){
        if ($(window).scrollTop() >= 100 ) {
          $('#topnav').addClass('scroll');
        } else{
          $('#topnav').removeClass('scroll');
        }
      }

      var filters = $('#filters');
      if(filters.length && !filters.hasClass('no-fix')){
        if ($(window).scrollTop() >= $('.page-title:first').height() + 30) {
          filters.addClass('fixed');
        } else{
          filters.removeClass('fixed');
        }
      }

    }).trigger('scroll');

    $('.navbar-toggle').on('click', function(event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
      $('.cart, .search').removeClass('open');
    });

    $('.navigation-menu>li').slice(-2).addClass('last-elements');

    $('.navigation-menu li.has-submenu a[href="#"]').on('click', function(e) {
      if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
      }
    });
  }

  function initHomeSlider() {

    $('#home-slider img').each(function(index, el) {
      var slide = $(this).parent('li');
      var image = $(this).attr('src');

      $(slide).prepend($('<div class="slide-image"></div>').css('background-image', 'url('+image+')'));

      if (navigator.userAgent.indexOf("Firefox") != -1 && $('#home').hasClass('bordered')) {
        $('.slide-image').addClass('ff-fix');
      }

      $(this).remove();
    });

    var options = {
      prevText: '<i class="ti-angle-left"></i>',
      nextText: '<i class="ti-angle-right"></i>',
      keyboard: false,
    };

    if ($('#home-slider .slides > li').length < 2) {
      options.directionNav = false
    }

    if ($('#home-slider').hasClass('kenburn')) {

      options.start = function () {
        $('#home-slider').find(".slides > li.flex-active-slide > .slide-image").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1.2)',
            '-moz-transform': 'scale(1.2)',
            'transform': 'scale(1.2)',
          });
        })
      }

      options.before = function () {
        $('#home-slider').find(".slides > li > .slide-image").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1)',
            '-moz-transform': 'scale(1)',
            'transform': 'scale(1)',
          });
        })
      }

      options.after = function () {
        $('#home-slider').find(".slides > li.flex-active-slide > .slide-image").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1.2)',
            '-moz-transform': 'scale(1.2)',
            'transform': 'scale(1.2)',
          });
        })
      }
    }

    $('#home-slider').flexslider(options);

    $('#text-rotator').flexslider({
      controlNav: false,
      directionNav: false
    })
  }

  function initCarousels () {
    $('.owl-carousel').each(function(index, el) {
      var dataOptions = $(this).data('options') || {};

      var options = {
        items: dataOptions.items || 4,
        loop: dataOptions.loop || true,
        dots: dataOptions.dots || false,
        margin: dataOptions.margin || 10,
        autoplay: dataOptions.autoplay || false,
        responsiveClass: true,
        responsive:{
          0:{
            items: dataOptions.xsItems || 1,
            margin: 25
          },
          768:{
            items: dataOptions.smItems || 2,
          },
          992:{
            items:dataOptions.mdItems || 3,
          },
          1200: {
            items: dataOptions.items || 4
          }
        }
      }

      if (options.autoplay) {
        options.autoplayTimeout = dataOptions.autoplayTimeout || 2000;
        options.autoplayHoverPause = true;
      }


      $(el).owlCarousel(options);
    });
  }

  function initSliders () {
    $('.flexslider').each(function(index, el) {
      var dataOptions = $(this).data('options') || {};

      var options = {
        animation: dataOptions.animation === 'slide' ? 'slide' : 'fade',
        controlNav: dataOptions.controlNav === true ? true : false,
        directionNav: dataOptions.directionNav === true ? true : false,
        prevText: '<i class="ti-arrow-left"></i>',
        nextText: '<i class="ti-arrow-right"></i>',
      };

      $(el).flexslider(options);
    });
  }
  

  function initLoad () {
    $(window).load(function() {

      $("#loader").delay(500).fadeOut();
      $("#mask").delay(1000).fadeOut("slow");

      $("html, body").animate({ scrollTop: 0 }, 10);
    });
  }

  function initContactForm() {

    var requiredInputs = $('#contact-form').find('input[data-required="true"], textarea[data-required="true"]').toArray();

    var isValidForm = function() {
      var toReturn;

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          toReturn = false;
        } else{
          toReturn = true;
        }
      });

      return toReturn;
    }

    $('#contact-form').on('submit', function(event) {

      event.preventDefault();

      var inputq1 = encodeURIComponent($('#input-q1').val());
      var inputq2 = encodeURIComponent($('#input-q2').val());
      var inputq3 = encodeURIComponent($('#input-q3').val());
      var inputq4 = encodeURIComponent($('#input-q4').val());
      var q1ID = "entry.1580655684";
      var q2ID = "entry.814646502";
      var q3ID = "entry.1889262984";
      var q4ID = "entry.71367092";
      var baseURL = 'https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/1FAIpQLSeWjCiZMOCvSe0QcEezsGGVRLdxal_eH6m-oWNGFIO1Btr1xA/formResponse?';
      var submitRef = '&submit=4348788542379803600';
      var submitURL = (baseURL +
        q1ID + "=" + inputq1 + "&" +
        q2ID + "=" + inputq2 + "&" +
        q3ID + "=" + inputq3 + "&" +
        q4ID + "=" + inputq4 + submitRef);
      //console.log(submitURL);

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          $(element).parent('.form-group').addClass('has-error');
        } else{
          $(element).parent('.form-group').removeClass('has-error');
        }
      });

      if (isValidForm()) {
        
        $.ajax({
          url: submitURL,
          type: 'POST'
          // data: $(this).serialize(),
        })
        .done(function() {
          var message = $('#contact-form').data('success-text') || 'Your submission has been sent. We will get back to you shortly!';
          var succesTemplate = '<div role="alert" class="alert alert-success alert-outline">'+ message +'</div>';
          $('#contact-form input, #contact-form textarea, #contact-form button').attr('disabled', 'disabled');
          $('#contact-form .alert').fadeOut(300);
          $(succesTemplate).insertBefore($('#contact-form button'));
        })
        .fail(function() {
          var message = $('#contact-form').data('error-text') || 'There was an error. Try again later.';
          var errorTemplate = '<div role="alert" class="alert alert-danger alert-outline">'+ message +'</div>';
          $('#contact-form .alert').fadeOut(300);
          $(errorTemplate).insertBefore($('#contact-form button'));
        })        
      }

    });

    $('#contact-form input, #contact-form textarea').on('keyup', function(event) {
      event.preventDefault();
      if ($(this).val()) {
        $(this).parent('.form-group').removeClass('has-error');
      }
    });
  }


  function fixScroll() {
    $('#sscr').css('height', 0);
    $('#sscr').css('height', document.documentElement.scrollHeight + 'px');
  }

  function initGeneral () {

    $("a[href='#top']").on('click', function() {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });

    $('a[data-scroll="true"]').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });

    if ($('#navigation').data('onepage')) {
      $('body').scrollspy({
        target: '#navigation'
      });
    }

    $('.bg-img, .thumb-placeholder').each(function(index, el) {
      var image = $(el).attr('src');
      $(el).parent().css('background-image', 'url(' + image + ')');
      $(el).remove();
    });

    var parallaxZIndex = -100;

    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("MSIE ") != -1 || navigator.userAgent.match(/Trident.*rv\:11\./) != null){
      parallaxZIndex = 11;
      $('section.parallax').css('z-index', 20);
    }

    $('.parallax-bg').parallax({
      speed: 0.5,
      zIndex: parallaxZIndex
    });

    $('.boxes [data-bg-color]').each(function(index, el) {
      $(el).css('background-color', $(el).data('bg-color'));  
    });

    $('.progress-bar').appear(function() {
      $(this).css('width', $(this).data('progress') + '%');
      $(this).parents('.skill').find('.skill-perc').css('right', 100 - $(this).data('progress') + '%');
    });

    $('[data-animated=true]').addClass('invisible');

    $('[data-animated=true]').appear(function(){
      var el = $(this);
      if (el.data('delay')) {
        setTimeout(function(){
          el.removeClass('invisible').addClass('fade-in-top');
        }, parseInt(el.data('delay')));
      } else{
        $(this).removeClass('invisible').addClass('fade-in-top');
      }
    }, {accX: 0, accY: 0});

  }

  function initCustom () {
    $("html, body").animate({ scrollTop: 0 }, 10);
  }

  function init () {
    initNavbar();
    initHomeSlider();
    initCarousels();
    initLoad();
    initContactForm();
    initGeneral();
    initCustom();

    $("html, body").animate({ scrollTop: 0 }, 10);
    
  }

  init();

  $("html, body").animate({ scrollTop: 0 }, 10);

})(jQuery)
