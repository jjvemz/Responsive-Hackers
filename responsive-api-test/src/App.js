import HackerNews from "./components/HackerNews/HackerNews";
import HackerFavourites from "./components/HackerFavourites/HackerFavourites";
import RectangleTitle from "./components/RectangleCopy/RectangleTitle";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app">
      <RectangleTitle />
      <Router>
        <HackerNews />
        <HackerFavourites />
      </Router>
    </div>
  );
}

export default App;
