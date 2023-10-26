const Errors = (error) => {
    if(error.message)
    console.log(error.message)
    return (
        <h2><p className = "error_message">{error.message}</p></h2>
    )
}

export default Errors