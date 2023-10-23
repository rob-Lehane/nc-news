import './css/CommentsList.css'
import { useState, useEffect } from 'react'
import { getComments } from '../utils/api'
import CommentsCard from './CommentsCard'

function CommentsList(id) {
    const [comments, setComments] = useState([])

useEffect(()=> {
    getComments(id)
    .then((comments) => {
        setComments(comments)
    })
}, [id])

return (
    <>
        <h2>Comments</h2>
        <div className = 'scrolling_comments_list'>
            <ul className = 'comments_list'>
                {comments.map((comment) => {
                    return (
                        <>
                        <li key = {comment.comment_id}>
                            <CommentsCard
                            id = {comment.comment_id}
                            author = {comment.author}
                            created = {comment.created_at}
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