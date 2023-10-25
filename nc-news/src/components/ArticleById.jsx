import { useParams } from 'react-router-dom';
import { getArticleById, voteOnArticle } from '../utils/api';
import { useState, useEffect } from 'react'
import './css/ArticleById.css'
import CommentsList  from './CommentsList'
import AddComment from './AddComment'
import Errors from './Errors.jsx'

function ArticleById() {
    const [article, setArticle] = useState([])
    const { id } = useParams();
    const [userVote, setUserVote] = useState(0)
    const [error, setError] = useState(null)
    const [voteError, setVoteError] = useState(null)
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
    }).catch((err)=> {
      setError({ err })
    }
    ) 
}, [id])

useEffect(()=> {
  voteOnArticle(id, {"inc_votes": userVote})
.catch((err)=> {
  article.votes - userVote;
  setVoteError('Vote failed. Please refresh and try again.')
})}, [userVote])

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


if(error){
  return <Errors message={error}/>
}

  return (
    <>
   <h2>{article.title}</h2>
   <img className = 'article_img' src={`${article.article_img_url}`}/>
   <p className = 'author'><b>Author:</b> {article.author}</p>
   <p>Topic: {article.topic}</p>
   <p className = 'date'><b>Created at:</b> {newDateInput.toLocaleString(undefined, dateOptions)}</p>
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

    <p className = 'comment_count'><b>Comment count:</b> {article.comment_count}</p>

    <p className="error-message" hidden={!voteError}>{voteError}</p>

   <button id="show_comments" onClick={() => setShowComments(!showComments)}>
  {showComments ? 'Hide Comments' : 'Show Comments'}
</button>

{showComments && (
  <div id="comments_list">
    <CommentsList id={id} />
  </div>
)}
    
<AddComment id={id}/>

    </>
  )
  
;
}

export default ArticleById;