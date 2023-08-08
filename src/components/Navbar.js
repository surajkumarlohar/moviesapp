import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                Movies Hunter
            </Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
