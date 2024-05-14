import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getRecommendations } from "./../redux/features/recommendations/recommendationsSlice"

// React Bootstrap
import Container from "react-bootstrap/Container"

// Lazy Loading
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import posterPlaceholder from "../assets/images/poster.webp"

// CSS
import "../styles/Recommendations.css"

function Recommendations(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const language = useSelector((state) => state.navigationBarReducer.language)

    useEffect(() => {
        dispatch((getRecommendations(props.id)))
    }, [dispatch, props.id])

    const recommendations = useSelector((state) => state.recommendationsReducer.recommendations)

    const loading_recommendations = useSelector((state) => state.recommendationsReducer.loading)
    const loading_images = useSelector((state) => state.imagesReducer.loading)
    const loading_credits = useSelector((state) => state.creditsReducer.loading)
    const loading_movie = useSelector((state) => state.movieReducer.loading)

    function navigateDetails(id) {
        navigate(`/movie/${id}`)
        window.scrollTo(0, 0)
        props.setShowVideo(false)
    }

    return (
        <>
            <Container fluid style={{ width: "94%" }}>
                {(!loading_recommendations && !loading_images && !loading_credits && !loading_movie) &&
                    <>
                        {recommendations.length > 0 &&
                            <div className="recommendations-container">
                                {language === "en-US" ? <h3>Recommendations</h3> : <h3>Tavsiyeler</h3>}

                                <div className="row">
                                    {recommendations.map((recommendation, index) => (
                                        <div key={index} className="col-6 mb-3">
                                            <LazyLoadImage
                                                className="img"
                                                onClick={() => navigateDetails(recommendation.id)}
                                                src={`https://image.tmdb.org/t/p/original/${recommendation.backdrop_path}`}
                                                alt={recommendation.title + " background image"}
                                                placeholderSrc={posterPlaceholder}
                                                effect="blur"
                                                width="100%"
                                                height="100%"
                                                style={{ color: "white" }}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        }
                    </>
                }
            </Container>
        </>
    )
}

export default Recommendations