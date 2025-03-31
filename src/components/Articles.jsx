import { useEffect, useState } from "react"
import { getAllArticles } from "../api"
import ArticleListBox from "./ArticleListBox"
import { data, Link, useNavigate } from "react-router-dom"


function Articles() { 

    const [articleData, setArticleData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [clickedArticle, setClickedArticle] = useState(null)
    const navigate = useNavigate();
    

    useEffect(() => { 
        getAllArticles().then((data) => { 
            console.log(data.data.articles)
            setArticleData(data.data.articles)
            setIsLoading(false)
        })
    }, [])

    const handleClick = (event) => { 
        console.log(event.target, "<<1.handle.lcik")
        setClickedArticle(event.target)
        console.log(clickedArticle)
        return ArticleListBox(clickedArticle)
        navigate("/article")
        
    }
    return (
        <section id="articles-listing">
            <div>
                {!articleData ? <p>Loading Articles...</p> : articleData.map((article) => 
                    <button onClick={handleClick} value={article.data} key={article.article_id}>
                        <ul className="article-item" >
                            <h2>{article.title}</h2>
                            <p>By {article.author}</p>
                            <p>{article.body}</p>
                            <p>Posted: {article.created_at}</p>
                            <p>Votes: {article.votes} 👍</p>
                            <img src={article.article_img_url}/>
                        </ul>
                    </button>
            )}
            </div>
        </section>
    )
}

export default Articles

//  title: "Running a Node App",
//     topic: "coding",
//     author: "jessjelly",
//     body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
//     created_at: 1604728980000,
//     votes: 0,
//     article_img_url:
//       "https://im