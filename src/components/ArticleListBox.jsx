import { React, Route, useEffect, useState } from "react"
import { Link, useLocation, useParams, useNavigate, data } from "react-router"
import { getCommentsByArticleId, AddVote, getSingleArticle, MinusVote, deleteCommentById } from "../api";
import PostComment from "./PostComment";


const ArticleListBox = ({ currentUser }) => {
    const navigate = useNavigate();
    const { article_id } = useParams()
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [commentData, setCommentData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [seen, setSeen] = useState(false)
    const [newError, setNewError] = useState(null)
    
    
    
    useEffect(() => {
        getSingleArticle(article_id).then((data) => {
            setSelectedArticle(data.data.article)
        }).catch((error) => {
            console.log(error)
            setNewError('Article not found, please try another article.')
            console.log(newError)
        }).finally(() => {
            setIsLoading(false)
        })
        getCommentsByArticleId(article_id).then((data) => {
            setCommentData(data)
        })
    }, [selectedArticle])
    
    const addComment = () => {
        if (!currentUser){
            alert("Please log in to add a comment")
        } else
        setSeen(!seen)
    }
    
    const increaseVote = () => {
        if (currentUser.hasVoted[selectedArticle.article_id] === true){
            console.log("already voted")
    } else{
        AddVote(selectedArticle.article_id).then((data) => {
            currentUser.hasVoted[selectedArticle.article_id] = true;
            navigate(`/articles/${selectedArticle.article_id}`)
        })
        
    } 
    }

    const decreaseVote = () => {
        if (currentUser.hasVoted[selectedArticle.article_id]){
            MinusVote(selectedArticle.article_id).then((data) => {
                delete currentUser.hasVoted[selectedArticle.article_id]
                navigate(`/articles/${selectedArticle.article_id}`)
            })
        } else {
            console.log("Downvote")
        }
    }
    const deleteMyComment = (event) => {
        event.preventDefault()
        const comment_id = event.target.value
        if (window.confirm("Are you sure you want to delete this comment?")) {
            deleteCommentById(comment_id).then((data) => {
            })
        }
        else {
            navigate(`/articles/${selectedArticle.article_id}`)
        }
        
    }
    if (newError){
        return <div className="single-list-article"><ul className="article-item"><h3>{newError}</h3></ul></div>
    } else
    return (
        <section>  
        <div className="single-list-article">    
            {isLoading ? <div><img src="loading.gif" alt="loading comments" /><p>Loading Comments</p></div> :
                <ul className="article-item">
                    <h2>{selectedArticle.title}</h2>
                    <h3>By {selectedArticle.author}</h3>
                    <img id="article-image" src={selectedArticle.article_img_url} />
                    <p>{selectedArticle.body}</p>
                    <p>Posted: {selectedArticle.created_at}</p>
                    {selectedArticle.votes >= 0 ? <p>Votes: {selectedArticle.votes} 👍</p> : <p>Votes: {selectedArticle.votes} 👎</p>}
                </ul>
            }
            
            <section className="comments">
                <div id="controls" className="bottom-nav">
                    <a href="/">Go Back</a>
                    <Link onClick={increaseVote}>Up-vote 👍</Link>
                    <Link onClick={decreaseVote}>Down-vote 👎</Link>
                    <Link onClick={addComment}>Add Comment</Link>
                </div>
                {seen ? <PostComment toggle={addComment} article_id={article_id} setSeen={setSeen} /> : null}
                <div id="article-container">
                <div id="article-item">
                    <h2>Comments Section</h2>
                    {!commentData ? <div><img src="./src/images/loading.gif" alt="loading comments" /><p>Loading Comments</p></div> : commentData.map((comment) => {
                        return <ul key={comment.comment_id} id="comment-box">
                            <h3 id="comment-author">posted by {comment.author}</h3>
                            <p>{comment.body}</p>
                            <p>Posted at:{comment.created_at}</p>
                            <p>Votes: {comment.votes} 👍</p> {comment.author !== currentUser.username ? <button id="like-button">Like Comment</button> : null}
                            {comment.author === currentUser.username ? <button onClick={deleteMyComment} value={comment.comment_id} id="delete-button">Delete Comment</button> : null}
                        </ul>
                    })
                    }
                </div>
                </div>
          </section>

            </div>

            </section>
      )

}



export default ArticleListBox

