import { useState, useEffect } from 'react'
import { getArticles } from '../utils/api'
import ArticlesListCard from './ArticlesListCard'
import './css/ArticlesList.css'

function ArticlesList () {
    const [articles, setArticles] = useState([])

useEffect(()=> {
    getArticles()
    .then((articles) => {
        setArticles(articles)
    })
}, [])


    return (
        <>
            <h2>Articles</h2>
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