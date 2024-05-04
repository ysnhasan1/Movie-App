// React Bootstrap
import { Container } from "react-bootstrap"

// Components
import Footer from "../components/Footer"

function NotFound() {

    return (
        <>
            <Container fluid style={{ width: "94%" }}>
                <p className="text-secondary mt-5 pt-5">Oops! We can't find the page you're looking for</p>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "75vh" }}>
                    <p style={{ fontSize: "50px" }} className="text-secondary">404</p>
                    <p style={{ fontSize: "50px" }} className="text-secondary">ERROR</p>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default NotFound