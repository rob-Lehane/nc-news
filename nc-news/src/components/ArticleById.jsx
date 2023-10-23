import { useParams } from 'react-router-dom';
import { getArticleById } from '../utils/api';
import { useState, useEffect } from 'react'
import './css/ArticleById.css'

function ArticleById() {
    const [article, setArticle] = useState([])
    const { id } = useParams();

useEffect(()=> {
    getArticleById(id)
    .then((fetchedArticle) => {
        setArticle(fetchedArticle)
    })
}, [])

  return (
    <>
   <h2>{article.title}</h2>
   <img className = 'article_img' src={`${article.article_img_url}`}/>
   <p className = 'author'><b>Author:</b> {article.author}</p>
   <p>Topic: {article.topic}</p>
   <p className = 'date'><b>Created at:</b> {article.created_at}</p>
   <p className = 'article_body'>{article.body}</p>
   <p className = 'vote_count'><b>Votes:</b> {article.votes}</p>
   <p className = 'comment_count'><b>Comment count:</b> {article.comment_count}</p>
    </>
  );
}

export default ArticleById;