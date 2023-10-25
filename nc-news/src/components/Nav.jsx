import './css/Nav.css'
import {Route, Routes, Link} from 'react-router-dom'

const Nav = () => {
    return (
        <>
        <nav>
            <ul className = 'navigation'>
                <li><Link to = "/">Home </Link></li>
                <li><Link to = "/articles">Articles</Link></li>
                <li><Link to = "/users">Users</Link></li>
            </ul>
        </nav>
        <p className = 'user'>User: jessjelly</p>
        </>
    )
}

export default Nav;