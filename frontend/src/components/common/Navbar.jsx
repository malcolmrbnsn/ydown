import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Landing</Link>
                </li>
                <li>
                    <Link to="/library">Library</Link>
                </li>
            </ul>
        </nav>
    )
}