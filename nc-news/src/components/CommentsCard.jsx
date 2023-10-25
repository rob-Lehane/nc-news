import './css/CommentsCard.css'
import { useState } from 'react'

function CommentsCard({id, author, created, body, votes}) {
    const [isAuthor, setIsAuthor] = useState(false)
    return (
        <section className = 'comment_card'>
            <p className = 'author'>{author}</p>
            <p className = 'comment_body'>{body}</p>
            <p className = 'created'><b>Created:</b> {created}</p>
            <p className = 'votes'><b>Votes:</b> {votes}</p>
            <p className = 'delete_comment'><button id="delete_comment_button">🗑️ Delete comment</button></p>
        </section>
    )
}

export default CommentsCard