import './css/ArticlesListCard.css'
import { Link } from 'react-router-dom'
import ArticleById from './ArticleById.jsx'


function ArticlesListCard({id, title, topic, author, date, image}) {
    
    return (
        <section className = 'ArticlesListCard'>
            <Link to={`/articles/${id}`} className='title'>{title}</Link>
            <p className = 'topic'>{topic}</p>
            <p className = 'author'>Author: {author}</p>
            <p className = 'date'>Created: {date}</p>
            <img className = 'article_img' src={`${image}`} alt={`Article photo for ${title}`}/>
        </section>
    )
}

export default ArticlesListCard