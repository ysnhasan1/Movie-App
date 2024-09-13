import { useSelector } from "react-redux"

function ZeroMovie() {

    const language = useSelector((state) => state.navigationBarReducer.language)

    const customStyle = {
        fontSize: "20px",
        height: "100vh"
    }

    return (
        <h3 style={customStyle} className="d-flex justify-content-center align-items-center text-center text-secondary">
            {language === "en-US" ? "There are no movies that matched your query." : "Sorgunuza uyan herhangi bir film bulunamadı."}
        </h3>
    )
}

export default ZeroMovie