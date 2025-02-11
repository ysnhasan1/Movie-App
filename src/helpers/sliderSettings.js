export const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    autoplay: false,
    arrows: false,
    slidesToShow: 9,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 7,
                infinite: false,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                infinite: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                infinite: false,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                infinite: false,
            }
        }
    ]
}