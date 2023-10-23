import './css/ArticlesListCard.css'


function ArticlesListCard({title, topic, author, date, image}) {
    
    return (
        <section className = 'ArticlesListCard'>
            <h2 className = 'title'>{title}</h2>
            <p className = 'topic'>{topic}</p>
            <p className = 'author'>Author: {author}</p>
            <p className = 'date'>Created: {date}</p>
            <img className = 'article_img' src={`${image}`} alt={`Article photo for ${title}`}/>
        </section>
    )
}

export default ArticlesListCard