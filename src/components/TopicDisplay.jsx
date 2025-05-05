import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { getArticlesbyTopic, getTopics } from "../api"
import { sortArrayByColumn } from "../utils"

function TopicDisplay() {
    let { topic } = useParams()
    const [selectedTopic, setSelectedTopic] = useState(topic)
    const [articlesByTopic, setArticlesByTopic] = useState([])
    const [topics, setTopics] = useState([])
    const [Loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('descending')
    const [sortColumn, setSortColumn] = useState('date')
    const [newError, setNewError] = useState(null)
    
    useEffect(() => { 
        getArticlesbyTopic(topic).then((data) => { 
            setArticlesByTopic(data.articles)
        }).catch(error => {
            console.log(topic, newError)
            setNewError('Topic not Found, please try again.')
        })
        getTopics().then((data) => {
           data.push ({slug: 'Show All'})
            setTopics(data)
        }).finally(
            setLoading(false)
        )
    }, [])

     const handleClick = (article) => { 
        const article_id = article.article_id
        navigate(`/articles/${article_id}`) 
    } 
    
    const handleCategory = (event) => {
        if (event.target.value === "Show All"){
            navigate("/")
        } else{ 
        navigate(`/articles/topics/${event.target.value}`)
        window.location.reload()
        }
     }
     
    const sortBy = (event) => { 
        let sort_order= event.target.value
        setSortOrder(sort_order)
        let newArray = sortArrayByColumn(articlesByTopic, sortColumn, event.target.value)
        console.log(newArray)
        setArticlesByTopic(newArray)
        window.location.reload()
    }

    const getSortColumn = (event) => {
        const col = event.target.value
        setSortColumn(col)
        let newArray = sortArrayByColumn(articlesByTopic, event.target.value, sortOrder)
        setArticlesByTopic(newArray)
        window.location.reload()
    }
    if (newError) {
        return <div className="single-list-article"><ul className="article-item"><h3>{newError}</h3></ul></div>
    } else
        return (
        <section id="articles-listing">
            <ul id="article-container">
                 <h2>{`Showing articles on ${topic}`}</h2>
                <div id='article-nav'>
                <label>Choose a topic
                    <select id="topic-selector" onChange={handleCategory}>
                    <option disabled>Choose a topic</option>  
                        {topics.map((topic) => <option key={topic.slug } name={ topic.slug} value={topic.slug}>{ topic.slug}</option>)}
                            </select>
                </label>
                <label>Sort by
                    <select id="column-selector" onChange={getSortColumn} autoComplete="off"> 
                        <option value="created_at">Date</option>    
                        <option value="comment_count">Comment Count</option>
                        <option value="votes">Votes</option>
                    </select>
                </label>
                <label>Select Order
                    <select id="order-selector" onChange={sortBy} autoComplete="off"> 
                        <option disabled>choose</option>    
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </label>
                </div>
                <div>{Loading ?<ul><img src="./src/images/loading.gif" alt="loading articles" /><p>Loading Articles</p></ul>: articlesByTopic.map((article) => {
                           return <ul onClick={() => handleClick(article)} key={article.article_id} className="article-item">
                                <h2>{article.title}</h2>
                                <p>By {article.author}</p>
                                <p>Posted: {article.created_at}</p>
                                <p>Votes: {article.votes} 👍</p>
                                <img src={article.article_img_url} />
                            </ul>
                    })
                 } </div> 
            </ul>
        </section>
    )
}
    
export default TopicDisplay


