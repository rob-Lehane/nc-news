import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getArticles, getTopics } from '../utils/api'
import ArticlesListCard from './ArticlesListCard'
import './css/ArticlesList.css'

function ArticlesList (topic, sort_by) {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [order, setOrder] = useState('asc')
    const location = useLocation();
    const navigate = useNavigate();


    function toggleOrder() {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        setOrder(newOrder);
        navigate(`${location.pathname}${location.search}&order=${newOrder}`)
    }

useEffect(()=> {
    getArticles({topic}, {sort_by})
    .then((articles) => {
        setArticles(articles)
    })
}, [topic, sort_by])

useEffect(()=> {
    getTopics()
    .then((topics)=> {
        setTopics(topics)
    })
})

    return (
        <>
            <h2>Articles</h2>
            <ul className = 'topic_filter'>
                Filter by topic:
                {topics.map((topic) => {
                    return (
                        <li><Link to = {`/articles?topic=${topic.slug}`}> {topic.slug} </Link></li>
                    )
                })}
            </ul>
            <ul className = 'sort_by_filter'>
                Sort by:
                <li><Link to = "/articles?sort_by=created_at">Date</Link></li>
                <li><Link to = "/articles?sort_by=comment_count">Comment count</Link></li>
                <li><Link to = "/articles?sort_by=votes">Votes</Link></li>
                <button onClick = {toggleOrder}>Toggle order</button>
            </ul>
            <div className = 'scrolling_articles_list'>
                <ul className = 'articles_list'>
                {articles.map((article) => {
                    return (
                        <>
                            <li key = {article.article_id}>
                        <ArticlesListCard
                        id = {article.article_id}
                        title = {article.title}
                        topic = {article.topic}
                        author = {article.author}
                        date = {article.created_at}
                        image = {article.article_img_url}
                        comment_count = {article.comment_count}
                        votes = {article.votes}
                        />
                        </li>
                        </>
                    )
                })}
                </ul>
            </div>
        </>
    )
}

export default ArticlesList