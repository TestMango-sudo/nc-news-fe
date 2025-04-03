import axios from "axios"

const api = axios.create({ baseURL: "https://nc-news-backend-boh2.onrender.com/api/" })
    

function getAllArticles() { 
    return api.get('/articles').then((data) => {
        return data
    }).catch((err) => { 
        console.error(err);
    })
}
function getSingleArticle(id) { 
    return api.get(`/articles/${id}`).then((data) => {
        return data
    }).catch((err) => { 
        console.error(err);
    })
}

function getCommentsByArticleId(id) {
    return api.get(`articles/${id}/comments`).then((data) => {
        return data.data.comments
    }).catch((err) => { 
        console.error(err);
        
    })

}

function AddVote(id) {
    return api.patch(`articles/${id}`, {inc_votes: 1}).then((response) => {
        return response
    })
}

function MinusVote(id) {
    return api.patch(`articles/${id}`, {inc_votes: -1}).then((response) => {
        return response
    })
}

function postCommentByArticleId({ username, body, article_id }) {
    let newComment = {'username': username, 'body': body}
    return api.post(`articles/${article_id}/comments`, newComment).then((response) => { 
        return response
    })
}

function deleteCommentById(id) { 
    return api.delete(`/comments/${id}`).then((response) => { 
        return response
    })
}

export { getAllArticles, getSingleArticle, getCommentsByArticleId, AddVote, MinusVote, postCommentByArticleId, deleteCommentById}
