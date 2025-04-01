import { React, Route } from "react"
import { Link, useLocation } from "react-router"


const ArticleListBox = () => {
    const location = useLocation();
    const data = location.state;
    
    return <div className="single-list-article">
        <ul>
            <h2>{data.title}</h2>
            <p>By {data.author}</p>
            <p>{data.body}</p>
            <p>Posted: {data.created_at}</p>
            <p>Votes: {data.votes} 👍</p>
            <img src={data.article_img_url} />
            <div id="controls" className="topnav">
                <a href="/">Back to All Articles</a>
                <a herf="/myaccount/">Like 👍</a>
                <a href="#">Add Comment</a>
                
            </div>
            
        </ul>
    </div>
}

export default ArticleListBox

