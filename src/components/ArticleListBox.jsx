import { React, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { getCommentsByArticleId, AddVote, getSingleArticle, MinusVote, deleteCommentById } from "../api";
import PostComment from "./PostComment";


const ArticleListBox = ({currentUser}) => {
    const navigate = useNavigate();
    const { article_id } = useParams()
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [commentData, setCommentData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [seen, setSeen] = useState(false)
    
    
    useEffect(() => {
        getSingleArticle(article_id).then((data) => { 
            setSelectedArticle(data.data.article)
        }).catch(err => {
            window.alert(err)
        }).finally(() => {
            setIsLoading(false)
        })  
        getCommentsByArticleId(article_id).then((data) => { 
            setCommentData(data)
        })
        }, [selectedArticle])
    
    const addComment = () => { 
        setSeen(!seen)
    }
    
    const increaseVote = () => {
        AddVote(selectedArticle.article_id).then((data) => { 
            navigate(`/articles/${selectedArticle.article_id}`)
        })
    }

     const decreaseVote = () => {
        MinusVote(selectedArticle.article_id).then((data) => { 
            navigate(`/articles/${selectedArticle.article_id}`)
        })
     }
    
    const deleteMyComment= (event) =>{ 
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
    
    return <div className="single-list-article">
        
        {isLoading ? <div><img src="./src/images/loading.gif" alt="loading comments" /><p>Loading Comments</p></div> :
            <ul className="article-item">
            <h2>{selectedArticle.title}</h2>
            <h3>By {selectedArticle.author}</h3>
            <p>{selectedArticle.body}</p>
            <p>Posted: {selectedArticle.created_at}</p>
                {selectedArticle.votes >= 0 ? <p>Votes: {selectedArticle.votes} 👍</p> : <p>Votes: {selectedArticle.votes} 👎</p>}
            <img id="article-image" src={selectedArticle.article_img_url} />
                </ul>
            }
            <section className="comments">
                 <div id="controls" className="topnav">
                    <a href="/">Back to All Articles</a>
                    <Link onClick={increaseVote}>Up-vote 👍</Link>
                    <Link onClick={decreaseVote}>Down-vote 👎</Link>
                    <Link onClick={addComment}>Add Comment</Link>
            </div>
            {seen ? <PostComment toggle={addComment} article_id={article_id} setSeen={ setSeen} /> : null}
            <h2>Comments Section</h2>
                {!commentData ? <div><img src="./src/images/loading.gif" alt="loading comments" /><p>Loading Comments</p></div> : commentData.map((comment) => {
                    return <ul key={comment.comment_id} id="comment-box">
                        <h3 id="comment-author">posted by {comment.author}</h3>
                        <p>{comment.body}</p>
                        <p>Posted at:{comment.created_at}</p>
                        <p>Votes: {comment.votes} 👍</p> <button> Like Comment</button>
                        {comment.author === currentUser.username ? <button onClick={deleteMyComment} value={comment.comment_id }>Delete Comment</button> : null}
                    </ul>
                })
                }
        </section>
    </div>
}

export default ArticleListBox

