import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Summary from "./components/Summary";


function App() {
  const [showName, setShowName] = useState("")
  const [progress, setProgress] = useState(0);

  return (
    <>
      
        <div>
          <Router>
            <Navbar />
            <LoadingBar color="#f11946" progress={progress} height={3} />
            <Routes>
              <Route
                exact
                path="/"
                element={<Movies setShowName={setShowName} setProgress={setProgress} />}
              />
              <Route
                exact
                path="/summary"
                element={<Summary showName={showName} setProgress={setProgress} />}
              />
            </Routes>
          </Router>
        </div>
    </>
  );
}

export default App;
