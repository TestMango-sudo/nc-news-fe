import { Component, useEffect, useState } from "react"
import { getAllArticles, getSingleArticle } from "../api"
import ArticleListBox from "./ArticleListBox"
import { data, Link, useNavigate } from "react-router-dom"


function Articles() { 
    const [singleArticle, setSingleArticle] = useState(null)
    const [articleData, setArticleData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    

    useEffect(() => { 
        getAllArticles().then((data) => { 
            console.log(data.data.articles)
            setArticleData(data.data.articles)
            setIsLoading(false)
        })
    }, [])

    const handleClick = (article) => { 
        const article_id = article.article_id
        getSingleArticle(article_id).then((data) => { 
           
            setSingleArticle(data.data.article)
        })
        console.log(singleArticle, "From CLICK HANDLE")
        //navigate("/article", singleArticle={singleArticle})

    } 

    return (
        <section id="articles-listing">
            <ul>
                {isLoading ? <img src="./src/images/loading.gif" alt="loading articles" /> : !singleArticle ?
                    articleData.map((article) =>
                        <ul onClick={() => handleClick(article)} key={article.article_id}>
                            <h2>{article.title}</h2>
                            <p>By {article.author}</p>
                            <p>{article.body}</p>
                            <p>Posted: {article.created_at}</p>
                            <p>Votes: {article.votes} 👍</p>
                            <img src={article.article_img_url} />
                        </ul>)
                    :
                    <ul><h2>{singleArticle.title}</h2>
                        <p>By {singleArticle.author}</p> 
                        <p>{singleArticle.body}</p>
                        <p>Posted: {singleArticle.created_at}</p>
                        <p>Votes: {singleArticle.votes} 👍</p>
                        <img src={singleArticle.article_img_url} />
                    </ul>
                }
            </ul>
        </section>
    )
}

export default Articles

