import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://nc-news-repo.onrender.com/api'
});

export const getArticles = () => {
    return newsApi.get('/articles/').then((res) => {
        return res.data.articles;
    })
}

export const getArticleById = (articleId) => {
    return newsApi.get(`/articles/${articleId}`).then((res) => {
        return res.data.articles;
    })
}