import { useParams } from "react-router"

export default function NotFound() {
    const errMessages = useParams()
return (
    <div id="article-container">
        <h2>An Error Occurred: </h2>
        <h4>{errMessage["*"] ? `${errMessage['TypeError']}, page is not found` : null}</h4>
        
    </div>
)

}