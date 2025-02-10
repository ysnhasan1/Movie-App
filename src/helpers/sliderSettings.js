export const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    speed: 1000,
    slidesToShow: 9,
    initialSlide: 0,
    autoplay: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 7,
                infinite: false,
                centerMode: false,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                infinite: false,
                centerMode: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                infinite: false,
                centerMode: false,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                infinite: false,
                centerMode: false,
            }
        }
    ]
}