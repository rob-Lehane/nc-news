import ArticlesList from "./ArticlesList"
import { useState, useEffect } from 'react' 
import { useSearchParams } from 'react-router-dom'

function ArticlesByTopic () {
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get("topic")

    return (
    <>
    <ArticlesList topic={topic}/>
    </>)
}

export default ArticlesByTopic