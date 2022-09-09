import React from 'react';
import './Navbar.css'

const NavBar = () =>{
    return(
        <div className="navbar">
            <ul>
                <li>
                    <a href="/" className='all-text'>All</a>
                    <a href="/favs"className='faves-text'>My faves</a>
                </li>
            </ul>
        </div>
    );
}
export default NavBar;