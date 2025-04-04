import axios from "axios"


const api = axios.create({ baseURL: "https://nc-news-backend-boh2.onrender.com/api/" })

function getTopics(){ 
    return api.get('topics').then((data) => { 
        return data.data.topics
    }).catch((error) => { 
        console.error('Topics not found', error)
    })
}

function getArticlesbyTopic(topic) {
    return api.get(`/articles/topics/${topic}`).then((data) => {
        return data.data
    }).catch(({ error }) => {
        return(error)
    })
}


function getAllArticles() {
    return api.get('/articles').then((data) => {
        return data
    }).catch((error) => {
        console.error('Articles not found', error)
    })
}

function getSingleArticle(id) { 
    return api.get(`/articles/${id}`).then((data) => {
        return data
    }).catch((error) => {
        if (error.response) {
            return response.data
        } else if (error.request) {
            return error.request
        } else 
            // Something happened in setting up the request that triggered an Error
            return ('Article not found', error.message);
    })
}

function getCommentsByArticleId(id) {
    return api.get(`articles/${id}/comments`).then((data) => {
        return data.data.comments
    }).catch((error) => { 
        return ('Article not found', error)
    })

}

function AddVote(id) {
    return api.patch(`articles/${id}`, {inc_votes: 1}).then((response) => {
        return response
    }).catch((error) => { 
        console.error('failed to add vote', error)
    })
}

function MinusVote(id) {
    return api.patch(`articles/${id}`, {inc_votes: -1}).then((response) => {
        return response
    }).catch((error) => { 
        console.error('failed to subtract vote', error)
    })
}

function postCommentByArticleId({ username, body, article_id }) {
    let newComment = {'username': username, 'body': body}
    return api.post(`articles/${article_id}/comments`, newComment).then((response) => { 
        return response
    }).catch((error) => { 
        console.error('failed to add comment', error)
    })
}

function deleteCommentById(id) { 
    return api.delete(`/comments/${id}`).then((response) => { 
        return response
    })
}

export { getAllArticles, getSingleArticle, getCommentsByArticleId, AddVote, MinusVote, postCommentByArticleId, deleteCommentById, getTopics, getArticlesbyTopic}
