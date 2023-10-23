import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://nc-news-repo.onrender.com/api'
});

export const getArticles = () => {
    return newsApi.get('/articles/').then((res) => {
        return res.data.articles;
    })
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
    }
    )
}