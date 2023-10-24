import './css/BodyContainer.css'
import {Router, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Articles from './ArticlesList.jsx'
import ArticleById from './ArticleById.jsx'
import Users from './UsersList.jsx'
import ArticlesByTopic from './ArticlesByTopic.jsx'

const Header = () => {
    return (
        <main>
            <Routes>
                <Route path ='/' element ={<Home />}/>
                <Route path ='/articles' element ={<ArticlesByTopic />}/>
                <Route path ='/users' element={<Users />}/>
                <Route path ='/articles/:id' element ={<ArticleById />}/>
                <Route path ='/articles?topic=:topic' element ={<ArticlesByTopic />}/>
            </Routes>
        </main>
    )
}

export default Header;