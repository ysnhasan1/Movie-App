import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getImages } from "../redux/features/images/imagesSlice"

import Carousel from "react-bootstrap/Carousel"

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import posterPlaceholder from "../assets/images/poster.webp"

import "../styles/Images.css"

function Images(props) {

    const dispatch = useDispatch()
    const language = useSelector((state) => state.navigationBarReducer.language)

    useEffect(() => {
        dispatch((getImages(props.id)))
    }, [dispatch, props.id])

    const file_paths = useSelector((state) => state.imagesReducer.file_paths)
    const loading_images = useSelector((state) => state.imagesReducer.loading)
    const loading_credits = useSelector((state) => state.creditsReducer.loading)
    const loading_movie = useSelector((state) => state.movieReducer.loading)

    return (
        <>
            {(!loading_images && !loading_credits && !loading_movie) &&
                <>
                    {file_paths.length > 0 ? <div className="images-container">
                        {language === "en-US" ?
                            <h3>Backgrounds <span style={{ color: "#ffffff99" }}>({file_paths.length})</span></h3>
                            :
                            <h3>Arka Planlar <span style={{ color: "#ffffff99" }}>({file_paths.length})</span></h3>
                        }
                        <Carousel indicators={false}>
                            {file_paths.map((path, index) => (
                                <Carousel.Item key={index} interval={4000}>
                                    <div className="img">
                                        <LazyLoadImage
                                            src={`https://image.tmdb.org/t/p/original/${path}`}
                                            alt={`Slide ${index + 1}`}
                                            placeholderSrc={posterPlaceholder}
                                            effect="blur"
                                            width="100%"
                                            height="auto"
                                            style={{ color: "white", aspectRatio: 3 / 2 }}
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                        :
                        <div className="images-container">
                            {language === "en-US" ? <h3>Backgrounds</h3> : <h3>Arka Planlar</h3>}
                            <div className="text-secondary">
                                {language === "en-US" ?
                                    <p>There are no background images for this movie.</p>
                                    :
                                    <p>Bu film için arka plan resmi yok.</p>
                                }
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Images