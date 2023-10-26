import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getArticles, getTopics } from '../utils/api'
import ReactPaginate from 'react-paginate'
import SyncLoader from "react-spinners/SyncLoader"
import ArticlesListCard from './ArticlesListCard'
import Errors from './Errors.jsx'
import './css/ArticlesList.css'

function ArticlesList (topic, sort_by) {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [order, setOrder] = useState('asc')
    const [error, setError] = useState(null)
    const [articleLoading, setArticleLoading] = useState(false)
    const [topicLoading, setTopicLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    let currentTopic = ""
    let buttonEnabled = true

    const itemsPerPage = 5;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = articles.slice(startIndex, endIndex);
    const handlePageChange = (selectedPage) => {
            setCurrentPage(selectedPage.selected);
        };



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
    setArticleLoading(true);
    getArticles({topic}, {sort_by})
    .then((articles) => {
        setArticleLoading(false);
        setArticles(articles)
        setTotalPages(Math.ceil(articles.length / itemsPerPage));
    }).catch((err)=> {
        setArticleLoading(false)
        setError( {err} )
    })
}, [topic, sort_by])

useEffect(()=> {
    setTopicLoading(true);
    getTopics()
    .then((topics)=> {
        setTopicLoading(false)
        setTopics(topics)
    }).catch((err)=> {
        setTopicLoading(false)
        setError( {err} )
    })
}, [])

function getTopicValue(){
    if (location.search.includes('?topic=')){
        const searchSplit = location.search.split('?topic=')
        const valueSplit = searchSplit[1]
        currentTopic = valueSplit.split('&')[0]
        return true;
    }
    else return false
}


    return (
        <>
            <div className = "error" hidden={!error}>
            <Errors message={error}/>
             </div>


            <h2>Articles</h2>
            <ul className = 'topic_filter'>
                Filter by topic:
                <SyncLoader
            loading={topicLoading}
            color="#9fd3c7"
            speedMultiplier={0.6}
            />
                {topics.map((topic) => {
                    const capitalisedSlug = topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
                    return (
                        <li><Link to = {`/articles?topic=${topic.slug}`} className="link"> { capitalisedSlug } </Link></li>
                    )
                })}
            </ul>
            <ul className = 'sort_by_filter'>
                Sort by:
                {!getTopicValue() ? (
                    
                    <>
                <li><Link to = "/articles?sort_by=created_at" className="link">Date</Link></li>
                <li><Link to = "/articles?sort_by=comment_count" className="link">Comment count</Link></li>
                <li><Link to = "/articles?sort_by=votes" className="link">Votes</Link></li>
                </>
                ) : (
                    <>
                    <li><Link to = {`/articles?topic=${currentTopic}&sort_by=created_at`} className="link">Date</Link></li>
                    <li><Link to = {`/articles?topic=${currentTopic}&sort_by=comment_count`} className="link">Comment count</Link></li>
                    <li><Link to = {`/articles?topic=${currentTopic}&sort_by=votes`} className="link">Votes</Link></li>
                    </>
                )}
                <button 
                onClick = {toggleOrder}
                hidden = {buttonEnabled === false}>order: {order === 'asc' ? 'desc' : 'asc'}ending</button>
            </ul>
            <SyncLoader
            loading={articleLoading}
            color="#9fd3c7"
            speedMultiplier={0.6}
            />
                <ul className = 'articles_list'>
                {subset.map((article) => {
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
            <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        containerClassName={"pagination-container"}
        activeClassName={"active-page"}
    />
        </>
    )
}

export default ArticlesList