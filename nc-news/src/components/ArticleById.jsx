import { useParams } from 'react-router-dom';
import { getArticleById, voteOnArticle } from '../utils/api';
import { useState, useEffect } from 'react'
import './css/ArticleById.css'
import CommentsList  from './CommentsList'

function ArticleById() {
    const [article, setArticle] = useState([])
    const { id } = useParams();
    const [userVote, setUserVote] = useState(0)
    const [error, setError] = useState(null)
    const [showComments, setShowComments] = useState(false);

    const updateVotes = (value) => {
      setUserVote((currentVotes) => {
        return currentVotes + value;
      });
    }


useEffect(()=> {
    getArticleById(id)
    .then((fetchedArticle) => {
        setArticle(fetchedArticle)
    })
}, [id])

useEffect(()=> {
  voteOnArticle(id, {"inc_votes": userVote})
.catch((err)=> {
  article.votes - userVote;
  setError('Vote failed. Please refresh and try again.')
})}, [userVote])

  return (
    <>
   <h2>{article.title}</h2>
   <img className = 'article_img' src={`${article.article_img_url}`}/>
   <p className = 'author'><b>Author:</b> {article.author}</p>
   <p>Topic: {article.topic}</p>
   <p className = 'date'><b>Created at:</b> {article.created_at}</p>
   <p className = 'article_body'>{article.body}</p>
   <p className = 'vote_count'><b>Votes:</b> {article.votes}</p>
   <button 
   id="upvote" 
   disabled={userVote === 1} 
   onClick={() => {
    updateVotes(1)
    article.votes++
   }}>
    👍
    </button> 
    <button 
    id="downvote"
    disabled={userVote === -1} 
    onClick={() => {
      updateVotes(-1)
      article.votes--
    }}>
    👎
    </button>

    {error && <p className="error-message">{error}</p>}

   <p className = 'comment_count'><b>Comment count:</b> {article.comment_count}</p>

   <button id="show_comments" onClick={() => setShowComments(!showComments)}>
  {showComments ? 'Hide Comments' : 'Show Comments'}
</button>

<div id="comments">
{showComments && (
  <div id="comments">
    <CommentsList id={id} />
  </div>
)}
</div>
    
    </>
  )
  
;
}

export default ArticleById;