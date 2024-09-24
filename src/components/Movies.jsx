import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovies } from "../redux/features/movies/moviesSlice"
import { Link } from "react-router-dom"

import Loading from "./Loading"
import ExtraInformations from "./ExtraInformations"
import ZeroMovie from "./ZeroMovie"

import Style from "style-it"

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import posterPlaceholder from "../assets/images/poster.webp"

import "../styles/Movies.css"

import * as Functions from "../localStorage/localStorage"

function Movies() {

    const dispatch = useDispatch()

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
        .filter(movie => movie.poster_path)
        .sort((a, b) => {
            if (sorted_by === "descending") {
                return b.vote_average - a.vote_average
            } else if (sorted_by === "ascending") {
                return a.vote_average - b.vote_average
            } else if (sorted_by === "default") {
                return
            }
        })

    return (
        <div className="bg position-relative">
            <div className="container position-relative">
                {(input.length > 0 && movies.length == 0) && <ZeroMovie />}
                {loading_movies ? <Loading /> :
                    <>
                        {which_movies === "top_rated" && movies.length != 0 ?
                            (language === "en-US" ? <h3 className="which-movies">Top Rated Movies</h3> : <h3 className="which-movies">En Fazla Oy Alan Filmler</h3>) :
                            which_movies === "popular" && movies.length != 0 ?
                                (language === "en-US" ? <h3 className="which-movies">Popular Movies</h3> : <h3 className="which-movies">Popüler Filmler</h3>) :
                                which_movies === "upcoming" && movies.length != 0 ?
                                    (language === "en-US" ? <h3 className="which-movies">Upcoming Movies</h3> : <h3 className="which-movies">Gelecek Filmler</h3>) :
                                    which_movies === "now_playing" && movies.length != 0 &&
                                    (language === "en-US" ? <h3 className="which-movies">Now Playing Movies</h3> : <h3 className="which-movies">Gösterimdeki Filmler</h3>)
                        }

                        {(input == "" && movies.length > 0) && <ExtraInformations />}

                        <div className="movies-container">
                            <div className="row">
                                {movies.map((movie, index) => (
                                    <div key={index} className="movie col-4 col-md-3 col-xl-2">
                                        <Link to={`movie/${movie.id}-${movie.title?.replaceAll(" ", "-").toLowerCase()}`} onClick={() => window.scrollTo(0, 0)}>
                                            <div className="img">
                                                <LazyLoadImage
                                                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                                                    alt={movie.title + " poster image"}
                                                    placeholderSrc={posterPlaceholder}
                                                    effect="blur"
                                                    width="100%"
                                                    height="auto"
                                                    style={{ color: "white", borderRadius: "0.5rem", aspectRatio: 3 / 5 }}
                                                />
                                            </div>
                                        </Link>

                                        {movie.vote_average === 0
                                            ?
                                            <div className="imdb-rating" style={{ color: "#ffffff99" }}>
                                                <i className="bi bi-star-fill bs-star-icon"></i>
                                                <span>NR</span>
                                            </div>
                                            :
                                            <div className="imdb-rating">
                                                <i className="bi bi-star-fill bs-star-icon"></i>
                                                <span>{(movie.vote_average?.toFixed(1))}</span>
                                            </div>
                                        }
                                        <div className="title">{movie.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Movies