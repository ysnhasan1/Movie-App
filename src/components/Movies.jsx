import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovies } from "../redux/features/movies/moviesSlice"
import { useNavigate } from "react-router-dom"

// Components
import Loading from "./Loading"
import ExtraInformations from "./ExtraInformations"
import ZeroMovie from "./ZeroMovie"

// React Bootstrap
import Container from "react-bootstrap/Container"

// Lazy Loading
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import posterPlaceholder from "../assets/images/poster.webp"

// CSS
import "../styles/Movies.css"

import * as Functions from "../localStorage/localStorage"

function Movies() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const which_movies = useSelector((state) => state.navigationBarReducer.which_movies)
    const language = useSelector((state) => state.navigationBarReducer.language)

    let movies = useSelector((state) => state.moviesReducer.movies)

    const [prevWhichMovies, setPrevWhichMovies] = useState(Functions.fetchWhichMovies());
    const [prevLanguage, setPrevLanguage] = useState(Functions.fetchLanguage());

    useEffect(() => {
        if (prevWhichMovies !== which_movies || prevLanguage !== language || (movies.length == 0)) {
            dispatch(getMovies({ endpoint: which_movies, language }))
            setPrevWhichMovies(which_movies)
            setPrevLanguage(language)
        }
    }, [dispatch, which_movies, language, prevWhichMovies, prevLanguage])

    const loading_movies = useSelector((state) => state.moviesReducer.loading)
    const sorted_by = useSelector((state) => state.navigationBarReducer.sorted_by)
    const input = useSelector((state) => state.navigationBarReducer.input)

    movies = movies
        .filter(movie =>
            movie.title.toLowerCase().includes(input.toLowerCase()) && movie.poster_path
        )
        .sort((a, b) => {
            if (sorted_by === "descending") {
                return b.vote_average - a.vote_average
            } else if (sorted_by === "ascending") {
                return a.vote_average - b.vote_average
            }
        })

    function navigateDetails(id) {
        navigate(`movie/${id}`)
        window.scrollTo(0, 0)
    }

    return (
        <>
            <Container fluid style={{ width: "94%" }}>
                {(input.length > 0 && movies.length == 0) && <ZeroMovie />}
                {loading_movies ? <Loading /> :
                    <>
                        {which_movies === "top_rated" && movies.length != 0 ?
                            (language === "en-US" ? <h3>Top Rated Movies</h3> : <h3>En Fazla Oy Alan Filmler</h3>) :
                            which_movies === "popular" && movies.length != 0 ?
                                (language === "en-US" ? <h3>Popular Movies</h3> : <h3>Popüler Filmler</h3>) :
                                which_movies === "upcoming" && movies.length != 0 ?
                                    (language === "en-US" ? <h3>Upcoming Movies</h3> : <h3>Gelecek Filmler</h3>) :
                                    which_movies === "now_playing" && movies.length != 0 &&
                                    (language === "en-US" ? <h3>Now Playing Movies</h3> : <h3>Gösterimdeki Filmler</h3>)
                        }

                        {(input == "" && movies.length > 0) && <ExtraInformations />}

                        <div className="movies-container">
                            <div className="row">
                                {movies.map((movie, index) => (
                                    <div key={index} className="movie col-4 col-md-3 col-xl-2">
                                        <div className="img">
                                            <LazyLoadImage
                                                onClick={() => navigateDetails(movie.id)}
                                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                                alt={movie.title + " poster image"}
                                                placeholderSrc={posterPlaceholder}
                                                effect="blur"
                                                width="100%"
                                                height="100%"
                                                style={{ color: "white", borderRadius: "0.75rem" }}
                                            />
                                        </div>
                                        {movie.vote_average === 0
                                            ?
                                            <div className="imdb-rating" style={{ color: "#ffffff99" }}>
                                                <i class="bi bi-star-fill bs-star-icon"></i>
                                                <span>NR</span>
                                            </div>
                                            :
                                            <div className="imdb-rating">
                                                <i class="bi bi-star-fill bs-star-icon"></i>
                                                <span>{(movie.vote_average?.toFixed(1))}</span>
                                            </div>
                                        }

                                        <div onClick={() => navigateDetails(movie.id)} className="title">{movie.title}</div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </Container>
        </>
    )
}

export default Movies
