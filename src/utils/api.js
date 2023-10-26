import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://nc-news-repo.onrender.com/api'
});

export const getArticles = ({topic, sort_by}) => {
    if (topic) {
    return newsApi.get('/articles/', { params: topic }).then((res) => {
        return res.data.articles;
    })}
    else if (sort_by) {
        return newsApi.get('/articles', { params: sort_by }).then((res) => {
            return res.data.articles;
          });
    }
}

export const getArticleById = (id) => {
    return newsApi.get(`/articles/${id}`).then((res) => {
        return res.data.article;
    })
}

export const getComments = (id) => {
    return newsApi.get(`/articles/${id.id}/comments`).then((res) => {
        return res.data.comments;
    })
}

export const voteOnArticle = (id, vote) => {
    return newsApi.patch(`/articles/${id}`, vote).then((res) => {
        return res.data.votes;
    })
}

export const postNewComment = (id, usernameAndBody) => {
    return newsApi.post(`/articles/${id}/comments`, usernameAndBody).then((res) => {
        return res.data.comment.body;
    })
} 

export const getTopics = () => {
    return newsApi.get('/topics/').then((res) => {
        return res.data.topics;
    })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`).then((res)=> {
        return res.status;
    })
}