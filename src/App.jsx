import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Home from "./pages/Home"
import Details from "./pages/Details"
import NotFound from "./pages/NotFound"

import NavigationBar from "./components/NavigationBar"

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