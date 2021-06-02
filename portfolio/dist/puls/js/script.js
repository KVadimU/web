//слик сллайдер
// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1500,
//         adaptiveHeight: true,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         prevArrow: '<button type="button" class="slick-prev"><img src="../img/arrowLeft.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="../img/arrowRight.png"></button>',
//         responsive:[
//             {
//                 breakpoint: 992,
//                 settings: {
//                 dots: true,
//                 arrows: false
//                 }
//               }
//         ]
//     });
//   });
//слик сллайдер
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    speed: 1200,
    controls: false,
    navPosition: 'bottom',
    responsive: {
        640: {
          edgePadding: 20,
          gutter: 20,
          items: 2
        },
        700: {
          gutter: 30
        },
        900: {
          items: 1
        }
      }
   
  });
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});  

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});  