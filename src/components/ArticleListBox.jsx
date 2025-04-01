import { React, Route, useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { getCommentsByArticleId } from "../api";


const ArticleListBox = () => {
    const location = useLocation();
    const data = location.state;
    const [commentData, setCommentData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { 
        getCommentsByArticleId(data.article_id).then((data) => { 
            console.log(data.comments)
            setCommentData(data.comments)
            console.log(commentData)
            setIsLoading(false)
        })
    }, [])
    
    return <div className="single-list-article">
        <ul>
            <h2>{data.title}</h2>
            <p>By {data.author}</p>
            <p>{data.body}</p>
            <p>Posted: {data.created_at}</p>
            <p>Votes: {data.votes} 👍</p>
            <img src={data.article_img_url} />
            <section className="comments">
                {isLoading ? <div><img src="./src/images/loading.gif" alt="loading comments" /><p>Loading Comments</p></div> : commentData.map((comment) => {
                    return <ul key={comment.comment_id} id="comment-box">
                        <h3 id="comment-author"></h3>
                        <p>{comment.body}</p>
                        <p>Posted at:{comment.created_at}</p>
                        <p>Votes: {comment.votes } 👍</p> <a> Like Comment</a>
                    </ul>
                })
                }
            </section>
            <div id="controls" className="topnav">
                <a href="/">Back to All Articles</a>
                <a herf="/myaccount/">Like 👍</a>
                <a href="#">Add Comment</a>
            </div>
            
        </ul>
    </div>
}

export default ArticleListBox

