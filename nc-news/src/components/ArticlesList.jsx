import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getArticles, getTopics } from '../utils/api'
import ArticlesListCard from './ArticlesListCard'
import Errors from './Errors.jsx'
import './css/ArticlesList.css'

function ArticlesList (topic, sort_by) {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [order, setOrder] = useState('asc')
    const [error, setError] = useState(null)
    const location = useLocation();
    const navigate = useNavigate();
    let currentTopic = ""
    let buttonEnabled = true

    if (!(location.search.includes('sort_by') || location.search.includes('order'))) {
        buttonEnabled = false;
      }


    function toggleOrder() {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        setOrder(newOrder);
        if((location.pathname+location.search).includes('&order')){
            const splitUrl = (location.pathname+location.search).split('&order')
            const newUrl = splitUrl[0]
            navigate(`${newUrl}&order=${newOrder}`)
        }
        else
        navigate(`${location.pathname}${location.search}&order=${newOrder}`)
    }

useEffect(()=> {
    getArticles({topic}, {sort_by})
    .then((articles) => {
        setArticles(articles)
    }).catch((err)=> {
        setError( {err} )
    })
}, [topic, sort_by])

useEffect(()=> {
    getTopics()
    .then((topics)=> {
        setTopics(topics)
    })
})

function getTopicValue(){
    if (location.search.includes('?topic=')){
        const searchSplit = location.search.split('?topic=')
        const valueSplit = searchSplit[1]
        currentTopic = valueSplit.split('&')[0]
        return true;
    }
    else return false
}

if(error){
    return <Errors message={error}/>
  }

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
                {!getTopicValue() ? (
                    
                    <>
                <li><Link to = "/articles?sort_by=created_at">Date</Link></li>
                <li><Link to = "/articles?sort_by=comment_count">Comment count</Link></li>
                <li><Link to = "/articles?sort_by=votes">Votes</Link></li>
                </>
                ) : (
                    <>
                    <li><Link to = {`/articles?topic=${currentTopic}&sort_by=created_at`}>Date</Link></li>
                    <li><Link to = {`/articles?topic=${currentTopic}&sort_by=comment_count`}>Comment count</Link></li>
                    <li><Link to = {`/articles?topic=${currentTopic}&sort_by=votes`}>Votes</Link></li>
                    </>
                )}
                <button 
                onClick = {toggleOrder}
                hidden = {buttonEnabled === false}>order: {order === 'asc' ? 'desc' : 'asc'}ending</button>
            </ul>
            <div className = 'scrolling_articles_list'>
                <ul className = 'articles_list'>
                {articles.map((article) => {
                    const newDateInput = new Date(article.created_at)
                    const dateOptions = {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                        timeZoneName: "short",
                      }
                      
                    return (
                        <>
                            <li key = {article.article_id}>
                        <ArticlesListCard
                        id = {article.article_id}
                        title = {article.title}
                        topic = {article.topic}
                        author = {article.author}
                        date = {newDateInput.toLocaleString(undefined, dateOptions)}
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