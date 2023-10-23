import './css/AddComment.css'
import { postNewComment } from '../utils/api.js'
import {useState} from 'react'

function AddComment(id){
    const [confirmation, setConfirmation] = useState(null)
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        postNewComment(id.id, {"username": "jessjelly", "body": comment})
        .then((res)=> {
            if(res){
                setConfirmation(<p>Comment posted succesfully!</p>)
                setComment('')
            }
        })
    }

    const handleReset = () => {
        setConfirmation(null)
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
            required/>
            <button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={confirmation}>Submit comment</button> 
            <button 
            type="reset" 
            onClick={handleReset}>Reset</button>
            {confirmation}
        </form>
        </>
    )
}

export default AddComment;