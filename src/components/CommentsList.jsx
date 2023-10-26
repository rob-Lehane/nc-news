import './css/CommentsList.css'
import { useState, useEffect } from 'react'
import { getComments } from '../utils/api'
import CommentsCard from './CommentsCard'
import Errors from './Errors.jsx'

function CommentsList(id) {
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)

useEffect(()=> {
    getComments(id)
    .then((comments) => {
        setComments(comments)
    }).catch((err)=> {
        setError( {err} )
    })
}, [id])



return (
    <>
    <div className = "error" hidden={!error}>
        <Errors message={error}/>
    </div>
        <h2>Comments</h2>
        <div className = 'scrolling_comments_list'>
            <ul className = 'comments_list'>
                {comments.map((comment) => {
                    const newDateInput = new Date(comment.created_at)
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
                        <li key = {comment.comment_id}>
                            <CommentsCard
                            id = {comment.comment_id}
                            author = {comment.author}
                            created = {newDateInput.toLocaleString(undefined, dateOptions)}
                            body = {comment.body}
                            votes = {comment.votes}
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

export default CommentsList