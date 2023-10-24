import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticles, getTopics } from '../utils/api'
import ArticlesListCard from './ArticlesListCard'
import './css/ArticlesList.css'

function ArticlesList (topic) {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])

useEffect(()=> {
    getArticles(topic)
    .then((articles) => {
        setArticles(articles)
    })
}, [topic])

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