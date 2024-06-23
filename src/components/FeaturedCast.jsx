import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCredits } from "../redux/features/credits/credits"

import Slider from "react-slick"

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import personPlaceholder from "../assets/images/person.png"

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

    let settings = {
        dots: false,
        infinite: false,
        centerMode: false,
        speed: 1000,
        slidesToShow: 9,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3
                }
            },
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
                    slidesToScroll: 4,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false
                }
            }
        ]
    }

    return (
        <>
            {cast?.length >= 9 &&
                <>
                    {(!loading_credits && !loading_movie) &&
                        <div className="container">
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
                                                    height="auto"
                                                    style={{ color: "white", aspectRatio: 3 / 5 }}
                                                />
                                            </div>

                                            <div className="name">{cast.name}</div>
                                            <div className="character">{cast.character}</div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>}
                        </div>
                    }
                </>
            }
        </>
    )
}

export default FeaturedCast