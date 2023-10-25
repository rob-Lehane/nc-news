import './css/ArticlesListCard.css'
import { Link } from 'react-router-dom'


function ArticlesListCard({id, title, topic, author, date, image, comment_count, votes}) {
    
    return (
        <section className = 'ArticlesListCard'>
            <Link to={`/articles/${id}`} className='title'>{title}</Link>
            <p className = 'topic'>{topic}</p>
            <p className = 'author'>Author: {author}</p>
            <p className = 'date'>Created: {date}</p>
            <p className = 'comment_count'>Comment count: {comment_count}</p>
            <p className = 'votes'>Votes: {votes}</p>
            <img className = 'article_img' src={`${image}`} alt={`Article photo for ${title}`}/>
        </section>
    )
}

export default ArticlesListCard