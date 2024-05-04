import { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

// Components
import Movie from "../components/Movie"
import Video from "../components/Video"
import FeaturedCast from "../components/FeaturedCast"
import Images from "../components/Images"
import Footer from "../components/Footer"

function Details() {

    const params = useParams()

    const [showVideo, setShowVideo] = useState(false)

    const videoRef = useRef(null)

    function videoClick() {
        videoRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const loading_movie = useSelector((state) => state.movieReducer.loading)

    return (
        <>
            <Movie videoClick={videoClick} id={params.id} showVideo={showVideo} setShowVideo={setShowVideo} />
            <Video ref={videoRef} id={params.id} showVideo={showVideo} setShowVideo={setShowVideo} />
            <FeaturedCast id={params.id} />
            <Images id={params.id} />
            {!loading_movie && <Footer />}
        </>
    )
}

export default Details