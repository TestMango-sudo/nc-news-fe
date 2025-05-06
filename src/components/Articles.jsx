import { useEffect, useState } from "react"
import { getAllArticles, getTopics} from "../api"
import { useNavigate } from "react-router"
import { sortArrayByColumn } from "../utils"


function Articles({ }) { 
    const [articleData, setArticleData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('descending')
    const [sortColumn, setSortColumn] = useState('date')


    useEffect(() => { 
        getAllArticles().then((data) => { 
            setArticleData(data.data.articles)
            
        })
        getTopics().then((data) => {
            setTopics(data)
        }).finally(
            setIsLoading(false)
        )
    }, [])

    const handleClick = (article) => { 
        const article_id = article.article_id
        navigate(`/articles/${article_id}`) 
    } 

    const handleCategory = (event) => {
        if (event.target.value === 'all') { 
            navigate("/")
        }
        else {
        navigate(`/articles/topics/${event.target.value}`)
        }
    }

   const sortBy = (event) => { 
        let sort_order= event.target.value
        setSortOrder(event.target.value)
        let newArray = sortArrayByColumn(articleData, sortColumn, event.target.value)
        console.log(newArray)
        setArticleData(newArray)
        indow.location.reload()
    }

    const getSortColumn = (event) => {
        const col = event.target.value
        setSortColumn(col)
        let newArray = sortArrayByColumn(articleData, event.target.value, sortOrder)
        console.log(newArray)
        setArticleData(newArray)
        window.location.reload()
    }
    
    return (
        <section id="articles-listing">
            <ul id="article-container">
                    <h2>Showing all Articles</h2>
                <div id='article-nav'>
                <label>Choose a topic
                    <select id="topic-selector" onChange={handleCategory}>
                    <option disabled>Choose a topic</option>
                    <option value="all">Show All</option>    
                        {topics.map((topic) => <option key={topic.slug} name={topic.slug} value={topic.slug}>{topic.slug}</option>)}
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
                <div>
                {isLoading ? <div><img src="/loading.gif" alt="loading comments" /><p>Loading Comments</p></div>:<ul><p></p></ul> }
                { articleData.map((article) =>
                        <ul onClick={() => handleClick(article)} key={article.article_id} className="article-item">
                            <h2>{article.title}</h2>
                            <p>By {article.author}</p>
                            <p>Posted: {article.created_at}</p>
                            <p>Votes: {article.votes} 👍</p>
                            <img src={article.article_img_url} />
                            
                        </ul>)
                }
                </div> 
            </ul>
        </section>
    )
}

export default Articles


