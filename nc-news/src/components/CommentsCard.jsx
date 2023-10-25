import './css/CommentsCard.css'
import { useState, useEffect } from 'react'
import { deleteComment } from '../utils/api'

function CommentsCard({ id, author, created, body, votes }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setIsLoading(true);

    deleteComment(id).then((status) => {
      if (status === 204) {
        setIsLoading(false);
        setDeletedSuccessfully(true);
      }
    });
  }

  useEffect(() => {
    if (author === 'jessjelly') {
      setIsAuthor(true);
    }
  }, [author]);


  

  return (
    <>
    <div hidden={deletedSuccessfully}>
    <section className="comment_card">
      <p className="author">{author}</p>
      <p className="comment_body">{body}</p>
      <p className="created">
        <b>Created:</b> {created}
      </p>
      <p className="votes">
        <b>Votes:</b> {votes}
      </p>
        <form onSubmit={handleDelete}>
          <button
            id="delete_comment_button"
            hidden={!isAuthor}
            disabled = {isLoading || deletedSuccessfully}
          >
            🗑️ Delete comment
          </button>
        </form>
        <p className = "loading_msg" hidden={!isLoading}>Loading...</p>
    </section>
    </div>
    <p className = "success_msg" hidden={!deletedSuccessfully}>Comment deleted!</p>
    
    </>
  );
  }

export default CommentsCard;
