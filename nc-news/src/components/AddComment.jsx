import './css/AddComment.css'
import { postNewComment } from '../utils/api.js'
import {useState} from 'react'

function AddComment(id){
    const [confirmation, setConfirmation] = useState(null)
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment.trim() === '') {
            setError('Comment cannot be blank!'); 
            return; 
          }

        postNewComment(id.id, {"username": "jessjelly", "body": comment})
        .then((res)=> {
            if(res){
                setError(null)
                setConfirmation(<p>Comment posted succesfully!</p>)
                setComment('')
            }
        })
    }

    const handleReset = () => {
        setConfirmation(null)
        setError(null)
        setComment(null)
    }

    return (
        <>
        <h2>Add new comment:</h2>
        <form onSubmit={handleSubmit}>
            <input 
            id="comment_box" 
            type="text" 
            name="comment_box" 
            placeholder="Type your comment here" 
            onChange = {(e) => setComment(e.target.value)} 
            disabled = {confirmation}
            required/><br/>
            <button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={confirmation}>Submit comment</button> 
            <button 
            type="reset" 
            onClick={handleReset}>Reset</button>
            {error && <p className="error-message">{error}</p>}
            {confirmation && <p className="confirmation-message">{confirmation}</p>}
        </form>
        </>
    )
}

export default AddComment;