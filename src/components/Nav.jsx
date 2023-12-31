import './css/Nav.css'
import {Route, Routes, Link} from 'react-router-dom'

const Nav = () => {
    return (
        <>
        <nav>
            <ul className = 'navigation'>
                <li><Link to = "/" className="nav_link">Home </Link></li>
                <li><Link to = "/articles" className="nav_link">Articles</Link></li>
                <li><Link to = "/users" className="nav_link">Users</Link></li>
            </ul>
        </nav>
        <p className = 'user'>User: jessjelly</p>
        </>
    )
}

export default Nav;