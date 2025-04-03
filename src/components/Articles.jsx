import { useEffect, useState } from "react"
import { getAllArticles} from "../api"
import { data, Link, useNavigate } from "react-router"


function Articles() { 
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
        navigate(`/articles/${article_id}`) 

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


