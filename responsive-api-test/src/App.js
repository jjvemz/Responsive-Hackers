import HackerNews from "./components/HackerNews/HackerNews";
import HackerFavourites from "./components/HackerFavourites/HackerFavourites";
import RectangleTitle from "./components/RectangleCopy/RectangleTitle";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="app">
      <div className="title">
        <RectangleTitle />
        </div>
      
      <div>
        <NavBar />
        <Router>
          <Routes>
            <Route element ={<HackerNews/>} path="/"/>
            <Route element ={<HackerFavourites/>} path="/favs"/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
