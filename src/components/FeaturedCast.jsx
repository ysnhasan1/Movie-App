import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCredits } from "../redux/features/credits/credits"

// React Slick
import Slider from "react-slick"

// React Bootstrap
import Container from "react-bootstrap/Container"

// Lazy Loading
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import personPlaceholder from "../assets/images/person.jpg"

// CSS
import "../styles/FeaturedCast.css"

function FeaturedCast(props) {

    const dispatch = useDispatch()
    const language = useSelector((state) => state.navigationBarReducer.language)

    useEffect(() => {
        dispatch(getCredits(props.id))
    }, [dispatch, props.id])

    const { cast } = useSelector((state) => state.creditsReducer.credits)
    const loading_credits = useSelector((state) => state.creditsReducer.loading)
    const loading_movie = useSelector((state) => state.movieReducer.loading)

    // React Slick
    let settings = {
        dots: false,
        infinite: false,
        centerMode: false,
        speed: 1000,
        slidesToShow: 7,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]
    };

    return (
        <>
            {cast?.length >= 7 &&
                <Container fluid style={{ width: "94%" }}>
                    {(!loading_credits && !loading_movie) &&
                        <>
                            {<div className="featured-cast-container">
                                {language === "en-US" ?
                                    <h3>Featured Cast <span style={{ color: "#ffffff99" }}>({cast.length})</span></h3>
                                    :
                                    <h3>Öne Çıkan Oyuncular <span style={{ color: "#ffffff99" }}>({cast.length})</span></h3>
                                }
                                <Slider {...settings}>
                                    {cast.map((cast, index) => (
                                        <div className="cast" key={index}>
                                            <div className="img">
                                                <LazyLoadImage
                                                    src={cast.profile_path ? `https://image.tmdb.org/t/p/w300/${cast.profile_path}` : personPlaceholder}
                                                    alt={cast.name + " image"}
                                                    placeholderSrc={personPlaceholder}
                                                    effect="blur"
                                                    width="100%"
                                                    height="100%"
                                                    style={{ color: "white" }}
                                                />
                                            </div>

                                            <div className="name">{cast.name}</div>
                                            <div className="character">{cast.character}</div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>}
                        </>
                    }
                </Container>
            }
        </>
    )
}

export default FeaturedCast