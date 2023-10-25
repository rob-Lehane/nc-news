const Errors = (error) => {
    return (
        <h2><p className = "error_message">{error.message.err.response.data.msg}</p></h2>
    )
}

export default Errors