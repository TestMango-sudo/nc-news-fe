
function TopicDisplay() {
    const topic = useParams()
    console.log(topic)
    // const [articleData, setArticleData] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    // const [topics, setTopics] = useState([])
    // const [currentTopic, setCurrentTopic] = useState('')
    const navigate = useNavigate();
    
    return (
        <h3>by Topic</h3>
    )
    
}
export default TopicDisplay


