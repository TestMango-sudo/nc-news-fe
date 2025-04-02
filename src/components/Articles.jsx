import { Component, useEffect, useState } from "react"
import { getAllArticles, getSingleArticle } from "../api"
import ArticleListBox from "./ArticleListBox"
import { data, Link, useNavigate } from "react-router"


function Articles() { 
    const [singleArticle, setSingleArticle] = useState(null)
    const [articleData, setArticleData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    

    useEffect(() => { 
        getAllArticles().then((data) => { 
            setArticleData(data.data.articles)
            setIsLoading(false)
        })
    }, [])

    const handleClick = (article) => { 
        const article_id = article.article_id
        // getSingleArticle(article_id).then((data) => { 
        //     const article = {...data.data.article}
        //     setSingleArticle(article)
        // })
        navigate(`/article/${article_id}`) //, { state: article})

    } 
    const goBack = () => { 
        setSingleArticle(null)
    }

    return (
        <section id="articles-listing">
            <ul id="article-container">
                <h2>All Articles</h2>
                {isLoading ? <div><img src="./src/images/loading.gif" alt="loading articles" /><p>Loading Articles</p></div> : 
                       articleData.map((article) =>
                        <ul onClick={() => handleClick(article)} key={article.article_id} className="article-item">
                            <h2>{article.title}</h2>
                            <p>By {article.author}</p>
                            <p>Posted: {article.created_at}</p>
                            <p>Votes: {article.votes} 👍</p>
                            <img src={article.article_img_url} />
                            
                        </ul>)
                }
            </ul>
        </section>
    )
}

export default Articles


