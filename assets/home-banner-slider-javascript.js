 $('.home-new-slider').slick({
  slidesToShow: 1,
  infinite: true,
  arrows: false,
  dots: true,
  speed: 500,
  fade: true,
  cssEase: 'linear',
  autoplay: false,
  autoplaySpeed: 5000
  });

  $(document).ready(function () {
function toggleSliderClass() {
  const slider = $('.home-new-slider');
  const firstDot = $('.slick-dots li:first-child'); // Select the first dot
  const secondDot = $('.slick-dots li:nth-child(2)'); // Select the second dot
  const thirdDot = $('.slick-dots li:nth-child(3)'); // Select the third dot

  // Check if the first dot is active
  if (firstDot.hasClass('slick-active')) {
    slider.addClass('first-active');
  } else {
    slider.removeClass('first-active');
  }

  // Check if the second dot is active
  if (secondDot.hasClass('slick-active')) {
    slider.addClass('second-active');
  } else {
    slider.removeClass('second-active');
  }

  // Check if the third dot is active
  if (thirdDot.hasClass('slick-active')) {
    slider.addClass('third-active');
  } else {
    slider.removeClass('third-active');
  }
}



  // Run on page load
  toggleSliderClass();

  // Attach an event listener to detect changes
  $('.slick-dots').on('click', 'li', function () {
  toggleSliderClass();
  });

  // Optional: Run when slick slider changes via swipe or other interactions
  $('.home-new-slider').on('afterChange', function () {
  toggleSliderClass();
  });
  });