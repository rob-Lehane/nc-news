import ArticlesList from "./ArticlesList"
import { useSearchParams } from 'react-router-dom'

function FilteredArticles () {
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get("topic")
    const sortBy = searchParams.get("sort_by")
    const order = searchParams.get("order")

    return (
    <>
    <ArticlesList topic={topic} sort_by={sortBy} order={order}/>
    </>)
}

export default FilteredArticles