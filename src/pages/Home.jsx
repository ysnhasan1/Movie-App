import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"

import Movies from "../components/Movies"
import SearchAndQuery from "../components/SearchAndQuery"
import Footer from "../components/Footer"

function Home() {

    const input = useSelector((state) => state.navigationBarReducer.input)

    return (
        <>
            <Helmet>
                <meta name="description" content="Discover your favorite movies. The site provides important details such as the story, director, budget, featured cast, images, recommendations and trailers." />
            </Helmet>
            {input == "" ? <Movies /> : <SearchAndQuery />}
            <Footer />
        </>
    )
}

export default Home