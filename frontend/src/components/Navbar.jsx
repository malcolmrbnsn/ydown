import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Library</Link>
                </li>
            </ul>
        </nav>
    )
}