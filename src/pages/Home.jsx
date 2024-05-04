import { useSelector } from "react-redux"

// Components
import Movies from "../components/Movies"
import Footer from "../components/Footer"

function Home() {

    const loading_movies = useSelector((state) => state.moviesReducer.loading)

    return (
        <>
            <Movies />
            {!loading_movies && <Footer />}
        </>
    )
}

export default Home