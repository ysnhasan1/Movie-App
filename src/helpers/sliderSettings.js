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
                slidesToShow: 7
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3
            }
        }
    ]
}