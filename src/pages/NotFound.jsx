import { Helmet } from "react-helmet"
import { useEffect } from "react"
import Footer from "../components/Footer"

function NotFound() {

    useEffect(() => {
        document.title = `404 Error | Movnite`
        return () => {
            document.title = "Movnite | Homepage"
        }
    }, [])

    return (
        <>
            <Helmet>
                <meta name="description" content="404 Error! We can't find the page you're looking for." />
            </Helmet>
            <div className="container">
                <p className="text-secondary mt-5 pt-5">Oops! We can't find the page you're looking for</p>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "75vh" }}>
                    <p style={{ fontSize: "50px" }} className="text-secondary">404</p>
                    <p style={{ fontSize: "50px" }} className="text-secondary">ERROR</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default NotFound