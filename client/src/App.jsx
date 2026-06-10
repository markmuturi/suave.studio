import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Nav from "./components/NavBar";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
      </Routes>

    </BrowserRouter>
    </>
  )
}
