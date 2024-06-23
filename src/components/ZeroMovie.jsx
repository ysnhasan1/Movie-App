import { useSelector } from "react-redux"

function ZeroMovie() {

    const language = useSelector((state) => state.navigationBarReducer.language)

    const customStyle = {
        fontSize: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh"
    }

    return (
        <>
            {language === "en-US"
                ?
                <h3 style={customStyle} className="text-center text-secondary">There are no movies that matched your query.</h3>
                :
                <h3 style={customStyle} className="text-center text-secondary">Sorgunuza uyan herhangi bir film bulunamadı.</h3>
            }
        </>
    )
}

export default ZeroMovie