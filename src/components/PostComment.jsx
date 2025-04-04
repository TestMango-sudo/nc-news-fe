import { useNavigate } from "react-router"
import { postCommentByArticleId } from "../api"

function PostComment({ article_id },setSeen ) { 
    const navigate = useNavigate()
    
    function handleSumbit(event) { 
        event.preventDefault()
        const formData = new FormData(event.target)
        const formValues = { username: 'grumpy19', body: formData.get('comment'), article_id: article_id}
        console.log(formValues, "<<from submit handler")
        postCommentByArticleId(formValues)
        window.alert("Comment Added Successfully")
        setSeen(false)
        navigate(`/articles/${article_id}`)    
    }

    return (
        <section className="popup">
        <div id="article-container">
        <h2>Add Comment</h2>
            <form onSubmit={handleSumbit}>
                <h3>User: 'grumpy19'</h3>
                <label>Enter your comment: <input inputMode="text" name="comment" required></input></label>
                    <button type="submit" >Submit</button>
            </form>
            </div>
        </section>
)   
}

export default PostComment