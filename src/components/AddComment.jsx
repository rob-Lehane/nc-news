import './css/AddComment.css'
import { postNewComment } from '../utils/api.js'
import {useState} from 'react'

function AddComment(id){
    const [confirmation, setConfirmation] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment.trim())

        if (comment.trim() === '') {
            setError('Comment cannot be blank!'); 
            return; 
          }

        postNewComment(id.id, {"username": "jessjelly", "body": comment})
        .then((res)=> {
            if(res){
                setError(null)
                setConfirmation("Comment posted succesfully!")
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
            <p hidden={!error}>{error}</p>
            <p className="confirmation-message" hidden={!confirmation}>{confirmation}</p>
        </form>
        </>
    )
}

export default AddComment;