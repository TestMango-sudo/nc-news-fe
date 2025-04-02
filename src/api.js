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
    return api.get(`/articles/${id}`).then((data) => {
        return data
    }).catch((err) => { 
        window.alert(err)
    })
}

function getCommentsByArticleId(id) {
    return api.get(`articles/${id}/comments`).then((data) => {
        return data.data.comments
    }).catch((err) => { 
        window.alert(err)
    })

}

function AddVote(id) {
    return api.patch(`articles/${id}`, {inc_votes: 1}).then((response) => {
        return response
    })
}

function MinusVote(id) {
    return api.patch(`articles/${id}`, {inc_votes: -1}).then((response) => {
        console.log(response.data)
        return response
    })
}

export { getAllArticles, getSingleArticle, getCommentsByArticleId, AddVote, MinusVote}
