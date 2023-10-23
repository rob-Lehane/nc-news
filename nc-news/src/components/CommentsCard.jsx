import './css/CommentsCard.css'

function CommentsCard({id, author, created, body, votes}) {
    return (
        <section className = 'comment_card'>
            <p className = 'author'>{author}</p>
            <p className = 'comment_body'>{body}</p>
            <p className = 'created'><b>Created:</b> {created}</p>
            <p className = 'votes'><b>Votes:</b> {votes}</p>
        </section>
    )
}

export default CommentsCard