// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// React Slick
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Pages
import Home from "./pages/Home"
import Details from "./pages/Details"
import NotFound from "./pages/NotFound"

// Components
import NavigationBar from "./components/NavigationBar"

// CSS
import "./styles/App.css"

function App() {

  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App