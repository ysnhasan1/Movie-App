export const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    speed: 1000,
    slidesToShow: 9,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 3,
                infinite: false,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                infinite: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
            }
        }
    ]
}