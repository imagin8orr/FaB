/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";
const toggleForm = () => {
  const container = document.querySelector('.container');
  container.classList.toggle('active');
};

$(document).ready(function () {
  var readURL = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".file-upload").on('change', function () {
    readURL(this);
  });

  $(".upload-button").on('click', function () {
    $(".file-upload").click();
  });

  $('.carousel').carousel({
    interval: false,
  });


  const slider = document.querySelector('.card-container');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });



  var $hs = $('.deck-container');;
  var $sLeft = 0;
  var $hsw = $hs.outerWidth(true);

  $(window).resize(function () {
    $hsw = $hs.outerWidth(true);
  });

  function scrollMap($sLeft) {
    $hs.scrollLeft($sLeft);
    //$('.js-scroll').animate( { scrollLeft: $sLeft }, 10); // animate
  }

  $hs.on('mousewheel', function (e) {

    var $max = $hsw * 2 + (-e.originalEvent.wheelDeltaY);

    if ($sLeft > -1) {
      $sLeft = $sLeft + (-e.originalEvent.wheelDeltaY);
    } else {
      $sLeft = 0;
    }
    //
    if ($sLeft > $max) {
      $sLeft = $max;
    }

    if (($sLeft > 0) && ($sLeft < $max)) {
      e.preventDefault();
      e.stopPropagation();
    }
    scrollMap($sLeft);
  });

   var $hs = $('.deck-container');;
  var $sLeft = 0;
  var $hsw = $hs.outerWidth(true);

  $(window).resize(function () {
    $hsw = $hs.outerWidth(true);
  });

  function scrollMap($sLeft) {
    $hs.scrollLeft($sLeft);
    //$('.js-scroll').animate( { scrollLeft: $sLeft }, 10); // animate
  }

  $hs.on('mousewheel', function (e) {

    var $max = $hsw * 2 + (-e.originalEvent.wheelDeltaY);

    if ($sLeft > -1) {
      $sLeft = $sLeft + (-e.originalEvent.wheelDeltaY);
    } else {
      $sLeft = 0;
    }
    //
    if ($sLeft > $max) {
      $sLeft = $max;
    }

    if (($sLeft > 0) && ($sLeft < $max)) {
      e.preventDefault();
      e.stopPropagation();
    }
    scrollMap($sLeft);
  });






  var $hs1 = $('.all-card-container');
  var $sLeft1 = 0;
  var $hsw1 = $hs1.outerWidth(true);

  $(window).resize(function () {
    $hsw1 = $hs1.outerWidth(true);
  });

  function scrollMap($sLeft1) {
    $hs1.scrollLeft($sLeft1);
    //$('.js-scroll').animate( { scrollLeft: $sLeft }, 10); // animate
  }

  $hs1.on('mousewheel', function (e) {

    var $max = $hsw1 * 2 + (-e.originalEvent.wheelDeltaY);

    if ($sLeft1 > -1) {
      $sLeft1 = $sLeft1 + (-e.originalEvent.wheelDeltaY);
    } else {
      $sLeft1 = 0;
    }
    //
    if ($sLeft1 > $max) {
      $sLeft1 = $max;
    }

    if (($sLeft1 > 0) && ($sLeft1 < $max)) {
      e.preventDefault();
      e.stopPropagation();
    }
    scrollMap($sLeft1);
  });
});

