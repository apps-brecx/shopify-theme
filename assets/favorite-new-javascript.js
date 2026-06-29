$(document).ready(function () {
  // Tab click functionality
  $(".cst-collection-titles li").click(function () {
    // Add active class to clicked tab and remove from others
    $(".cst-collection-titles li").removeClass("active");
    $(this).addClass("active");

    // Get the index of the clicked tab
    var tabIndex = $(this).index() + 1;

    // Hide all sections
    $(".content section").hide();

    // Show the section corresponding to the clicked tab
    $("#tab-content" + tabIndex).show();

    // Trigger slick to resize and adjust width correctly on tab switch
    $(".product-grid-section").slick("setPosition");
  });

  $(".product-grid-section").slick({
    centerMode: false,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          arrows: true,
          centerMode: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          arrows: true,
          centerMode: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "70px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "70px",
          slidesToShow: 1,
        },
      },
    ],
  });
  $(".content section").hide();
  $("#tab-content1").show();
});
