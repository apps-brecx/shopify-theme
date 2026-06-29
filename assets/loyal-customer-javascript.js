$(document).ready(function(){
$('.cst-custom-home-loyal-customer .cst-collection-titles li').click(function(){
// Add active class to clicked tab and remove from others
$('.cst-custom-home-loyal-customer .cst-collection-titles li').removeClass('active');
$(this).addClass('active');

// Get the index of the clicked tab
var tabIndex = $(this).index() + 1;

// Hide all sections
$('.cst-custom-home-loyal-customer .content section').hide();

// Show the section corresponding to the clicked tab
$('.cst-custom-home-loyal-customer #loyaltab-content' + tabIndex).show();

// Trigger slick to resize and adjust width correctly on tab switch
$('.cst-custom-home-loyal-customer .product-grid-section-2').slick('setPosition');
});

// Initially hide all sections and show the first one
$('.cst-custom-home-loyal-customer .content section').hide();
$('#loyaltab-content1').show();


$('.cst-custom-home-loyal-customer .product-grid-section-2').slick({
centerPadding: '200px',
slidesToShow: 4,
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
function setSlideVisibility() {
var visibleSlides = $carousel.find('.product-card[aria-hidden="false"]');
$(visibleSlides).each(function() {
$(this).css('opacity', 1);
});
}

// Initialize slick and set slide visibility
$carousel.slick(settings);
$carousel.slick('slickGoTo', 1);
setSlideVisibility();

$carousel.on('afterChange', function() {
setSlideVisibility();
});
});