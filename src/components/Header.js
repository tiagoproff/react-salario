import React from 'react';
import logofile from '../logo.svg';

function Header() {
    return (
        <nav>
            <div class="nav-wrapper">
                <a href="#">
                    <img src={logofile} class="App-logo" alt="logo" />
                </a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
