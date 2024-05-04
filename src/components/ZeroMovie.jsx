import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function ZeroMovie() {

    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true)
        }, 300)

        return () => clearTimeout(timer)
    }, [])

    const language = useSelector((state) => state.navigationBarReducer.language)

    const customStyle = {
        fontSize: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh"
    }

    return (
        <>
            {showMessage &&
                <>
                    {language === "en-US"
                        ?
                        <h3 style={customStyle} className="text-center text-secondary">There are no movies that matched your query.</h3>
                        :
                        <h3 style={customStyle} className="text-center text-secondary">Sorgunuza uyan herhangi bir film bulunamadı.</h3>
                    }
                </>
            }
        </>
    )
}

export default ZeroMovie