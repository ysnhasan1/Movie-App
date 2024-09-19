import { Helmet } from "react-helmet"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovie } from "../redux/features/movie/movieSlice"
import { getVideo } from "./../redux/features/video/videoSlice"

import Loading from "./Loading"

import Style from "style-it"

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import posterPlaceholder from "../assets/images/poster.webp"

import "../styles/Movie.css"

function Movie(props) {

    const dispatch = useDispatch()
    const language = useSelector((state) => state.navigationBarReducer.language)

    useEffect(() => {
        dispatch(getMovie({ id: props.id, language: language }))
        if (props.showVideo) {
            dispatch(getVideo({ id: props.id, language: language }))
        }

    }, [dispatch, props.id, language, props.showVideo])

    const movie = useSelector((state) => state.movieReducer.movie)
    const loading_movie = useSelector((state) => state.movieReducer.loading)

    useEffect(() => {
        if (!loading_movie && movie?.title) {
            document.title = `${movie.title} | Movnite`
        }
        return () => {
            document.title = "Movnite | Homepage"
        }
    }, [loading_movie, movie])

    let { crew } = useSelector((state) => state.creditsReducer.credits)
    let director = crew?.find((crew) => crew.department == "Directing" && crew.job == "Director")
    let novel = crew?.find((crew) => crew.department == "Writing" && crew.job == "Novel")

    function formatRuntime(runtime) {
        const hours = Math.floor(runtime / 60)
        const minutes = runtime % 60
        return language === "en-US" ? `${hours}h ${minutes}m` : `${hours}s ${minutes}d`
    }

    function aClick() {
        props.setShowVideo(true)
        props.videoClick()
    }

    return (
        <>
            <Helmet>
                <meta name="description" content={movie?.overview ? movie.overview : `Learn more about ${movie?.title} by visiting our website.`} />
            </Helmet>
            {(loading_movie || crew == undefined) ? <Loading /> :
                <>
                    <Style>
                        {`
                        .movie-container::before {
                            content: "";
                            background-image: url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}");
                            background-size: cover;
                            background-repeat: no-repeat;
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            opacity: 0.35;
                            filter: blur(3px);
                    `}
                    </Style>

                    <div className="movie-container">
                        <div className="react-bs-container container px-md-3">
                            <div className="flex-item">
                                <div className="img">
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt={movie.title + " poster image"}
                                        placeholderSrc={posterPlaceholder}
                                        effect="blur"
                                        width="100%"
                                        height="100%"
                                        style={{ color: "white", borderRadius: "0.75rem" }}
                                    />
                                </div>
                            </div>

                            <div className="flex-item second">
                                <div className="title-and-release-date-container">
                                    <span className="title">{movie.title}</span>
                                    <span className="release-date">({movie.release_date?.slice(0, 4)})</span>
                                </div>

                                <div className="genres-and-runtime">
                                    {movie.genres && movie.genres.length !== 0 &&
                                        <>
                                            <span>• </span>
                                            {movie.genres?.map((genre, index) => (
                                                <span key={index}>{genre.name}{index !== movie.genres.length - 1 && <span>, </span>} </span>

                                            ))}
                                        </>
                                    }
                                    {movie.runtime !== 0 && <span className="runtime">• {formatRuntime(movie.runtime)}</span>}
                                </div>

                                <div className="rating-and-video-container">
                                    {movie.vote_average === 0 ?
                                        <span className="imdb-rating" style={{ color: "#ffffff99" }}>
                                            <i className="bi bi-star-fill bs-star-icon"></i>
                                            <span>NR</span>
                                        </span>
                                        :
                                        <span className="imdb-rating">
                                            <i className="bi bi-star-fill bs-star-icon"></i>
                                            <span>{(movie.vote_average?.toFixed(1))}</span>
                                        </span>
                                    }

                                    <span className="watch-video">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886" /></svg>
                                        <a onClick={aClick}>{language === "en-US" ? "Play Video" : "Video Oynat"}</a>
                                    </span>
                                </div>

                                {movie.tagline !== "" &&
                                    <div className="tagline">
                                        <p>{movie.tagline}</p>
                                    </div>
                                }

                                <div className="summary">
                                    <p>{language === "en-US" ? "Overview" : "Özet"}</p>
                                </div>

                                <div className="overview">
                                    {movie.overview !== "" ?
                                        <p>{movie.overview}</p>
                                        :
                                        <p>
                                            {language === "en-US" ?
                                                "We don't have an overview translated in English."
                                                :
                                                "Türkçe'ye çevrilmiş bir özet henüz bulunmuyor."
                                            }
                                        </p>
                                    }
                                </div>

                                <div className="d-flex gap-2 gap-md-4 flex-wrap">
                                    {director &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Director" : "Yönetmen"}</div>
                                            <div className="bottom">{director.name}</div>
                                        </div>
                                    }

                                    {novel &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Novel" : "Roman"}</div>
                                            <div className="bottom">{novel.name}</div>
                                        </div>
                                    }

                                    {movie.budget !== 0 &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Budget" : "Bütçe"}</div>
                                            <div className="bottom">{"$" + (movie.budget)?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                        </div>
                                    }

                                    {movie.revenue !== 0 &&
                                        <div>
                                            <div className="top">{language === "en-US" ? "Revenue" : "Kazanç"}</div>
                                            <div className="bottom">{"$" + (movie.revenue)?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Movie