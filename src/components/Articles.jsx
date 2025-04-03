import { useEffect, useState } from "react"
import { getAllArticles, getTopics} from "../api"
import { data, Link, useNavigate } from "react-router"


function Articles({ }) { 
    const [articleData, setArticleData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const [currentTopic, setCurrentTopic] = useState(null)
    const navigate = useNavigate();
    const [articlesbyTopic, setArticlesByTopic] = useState([])

    useEffect(() => { 
        getAllArticles().then((data) => { 
            setArticleData(data.data.articles)
            
        })
        getTopics().then((data) => {
            setTopics(data)
        }).finally(
            setIsLoading(false)
        )
    }, [currentTopic])

    const handleClick = (article) => { 
        const article_id = article.article_id
        navigate(`/articles/${article_id}`) 

    } 
    const handleCategory = (event) => {
        event.preventDefault()
        if (event.target.value === 'all') { setCurrentTopic(null) }
        else {
            const newTopic = event.target.value
            setCurrentTopic(newTopic)
            setArticlesByTopic(articleData.filter((article) => { if (article.topic === event.target.value) { return article } }))     
        }
    }


    return (
        <section id="articles-listing">
            <ul id="article-container">
                <h2>{!currentTopic ? 'Showing all Articles' : `Showing articles on ${currentTopic}`}</h2>
                <div>
                <p>Sort By</p>
                    <select id="topic-selector" onChange={handleCategory} autoComplete="off"> 
                    <option value="all">Show All</option>    
                        {topics.map((topic) => <option key={topic.slug } name={ topic.slug} value={topic.slug}>{ topic.slug}</option>)}
                    </select>
                </div>
                {isLoading ? <div><img src="./src/images/loading.gif" alt="loading articles" /><p>Loading Articles</p></div> :
                    currentTopic ? articlesbyTopic.map((article) => {
                           return <ul onClick={() => handleClick(article)} key={article.article_id} className="article-item">
                                <h2>{article.title}</h2>
                                <p>By {article.author}</p>
                                <p>Posted: {article.created_at}</p>
                                <p>Votes: {article.votes} 👍</p>
                                <img src={article.article_img_url} />
                            </ul>
                    })
                        : articleData.map((article) =>
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


