// $(document).ready(function () {
//   // Function to initialize Slick Slider
//   function initializeSlick() {
//     $(".slick-slider").slick({
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 3,
//       dots: true,
//       arrows: true,
//       responsive: [
//         {
//           breakpoint: 1024,
//           settings: {
//             slidesToShow: 2,
//             slidesToScroll: 2,
//           },
//         },
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: 1,
//             slidesToScroll: 1,
//           },
//         },
//       ],
//     });
//   }

//   // Initial Slick Slider Initialization
//   initializeSlick();

//   // Reinitialize Slick Slider after 3 seconds (if needed)
//   setTimeout(function () {
//     if ($(".slick-slider").hasClass("slick-initialized")) {
//       $(".slick-slider").slick("unslick"); // Destroy existing instance
//     }

//     // Reinitialize the Slick Slider
//     initializeSlick();
//     console.log("Slider reinitialized");
//   }, 3000);
// });
