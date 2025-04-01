import axios from "axios"

const api = axios.create({ baseURL: "https://nc-news-backend-boh2.onrender.com/api/" })
    

function getAllArticles() { 
    return api.get('/articles').then((data) => {
        return data
    }).catch((err) => { 
        window.alert(err)
    })
}
function getSingleArticle(id) { 
    console.log(id, "FROM API")
    return api.get(`/articles/${id}`).then((data) => {
        return data
    }).catch((err) => { 
        window.alert(err)
    })
}

export { getAllArticles, getSingleArticle }
