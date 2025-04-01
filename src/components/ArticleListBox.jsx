import React from "react"

const ArticleListBox = ({ props }) => {
    console.log(props)
    return <div className="single-list-article">

        <h2>{props.title }</h2>
    </div>
}

export default ArticleListBox

