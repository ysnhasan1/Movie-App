import { useSelector } from "react-redux"

import Movies from "../components/Movies"
import SearchAndQuery from "../components/SearchAndQuery"
import Footer from "../components/Footer"

function Home() {

    const input = useSelector((state) => state.navigationBarReducer.input)

    return (
        <>
            {input == "" ? <Movies /> : <SearchAndQuery />}
            <Footer />
        </>
    )
}

export default Home