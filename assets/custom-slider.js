// Initialize the Slick Carousel on the `.slider-recipe-gt` class

 $('.slider-recipe-gt').slick({
  centerMode: false,
      slidesToShow: 3.8,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            arrows: true,
            centerMode: true,
            slidesToShow: 2
          }
        },
        {
          breakpoint: 991,
          settings: {
            arrows: true,
            centerMode: true,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '100px',
            slidesToShow: 1

          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '70px',
            slidesToShow: 1
          }
        }
      ]
    });