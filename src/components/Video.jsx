import { forwardRef } from "react"
import { useSelector } from "react-redux"

import "../styles/Video.css"

function Video(props, ref) {

    const loading_video = useSelector((state) => state.videoReducer.loading)
    const language = useSelector((state) => state.navigationBarReducer.language)
    const video = useSelector((state) => state.videoReducer.video)

    let video_type_to_print = video?.type

    if (video?.type == "Trailer") {
        if (language === "tr-TR") {
            video_type_to_print = "Fragman"
        }
    }
    else if (video?.type == "Teaser") {
        if (language === "tr-TR") {
            video_type_to_print = "Tanıtım"
        }
    }
    else if (video?.type == "Featurette") {
        if (language === "tr-TR") {
            video_type_to_print = "Film Hakkında"
        }
    }
    else if (video?.type == "Clip") {
        if (language === "tr-TR") {
            video_type_to_print = "Kısa Video"
        }
    }
    else if (video?.type == "Behind the Scenes") {
        if (language === "tr-TR") {
            video_type_to_print = "Kamera Arkası"
        }
    }

    return (
        <>
            {!loading_video &&
                <div className="container" ref={ref}>
                    <div id="video" className="video-container">
                        {props.showVideo &&
                            <>
                                <div className="flex-container">
                                    {video_type_to_print ? <div className="flex-item left">{video_type_to_print}</div> : <div className="flex-item left"></div>}
                                    <div className="flex-item right">
                                        <svg onClick={() => props.setShowVideo(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#DC3545" d="M3 16.74L7.76 12L3 7.26L7.26 3L12 7.76L16.74 3L21 7.26L16.24 12L21 16.74L16.74 21L12 16.24L7.26 21zm9-3.33l4.74 4.75l1.42-1.42L13.41 12l4.75-4.74l-1.42-1.42L12 10.59L7.26 5.84L5.84 7.26L10.59 12l-4.75 4.74l1.42 1.42z" /></svg>
                                    </div>
                                </div>
                                {video ?
                                    <div className="ratio ratio-21x9" style={{ maxHeight: "80vh" }}>
                                        <iframe src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&rel=0`} title="YouTube video" allowFullScreen allow="autoplay"></iframe>
                                    </div>
                                    :
                                    <div className="text-center text-white">{language === "en-US" ? "There is no video." : "Video yok."}</div>
                                }
                            </>}
                    </div>
                </div>
            }
        </>
    )
}

export default forwardRef(Video)