import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://nc-news-repo.onrender.com/api'
});

export const getArticles = () => {
    return newsApi.get('/articles').then((res) => {
        return res.data.articles;
    })
}