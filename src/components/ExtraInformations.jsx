import { useSelector } from "react-redux"

function ExtraInformations() {

    const movies = useSelector((state) => state.moviesReducer.movies)
    const language = useSelector((state) => state.navigationBarReducer.language)

    let total_rating = 0
    movies.forEach(movie => {
        total_rating += movie.vote_average
    })

    const average_rating = movies.length > 0 ? (total_rating / movies.length) : 0

    return (
        <div className="d-flex gap-3 align-items-center my-3" style={{ color: "#d1d1d1" }}>
            <div>
                <div className="fw-bold">{movies.length}</div>
                <div>{language === "en-US" ? "Items on this list" : "Bu listedeki öğeler"}</div>
            </div>

            <div>
                <div className="fw-bold">{average_rating.toFixed(1)}</div>
                <div>{language === "en-US" ? "Average Rating" : "Ortalama Puan"}</div>
            </div>
        </div>
    )
}

export default ExtraInformations