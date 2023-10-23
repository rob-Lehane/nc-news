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
                {articles.map((article) => {
                    return (
                        <>
                        <ul key = {article.article_id}>
                        <ArticlesListCard
                        title = {article.title}
                        topic = {article.topic}
                        author = {article.author}
                        image = {article.article_img_url}
                        />

                        </ul>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ArticlesList