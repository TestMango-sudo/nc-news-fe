

function ArticleControls() { 
    
    
    
    return (
        <div id='article-nav'>
                    <h2>{!currentTopic ? 'Showing all Articles' : `Showing articles on ${currentTopic}`}</h2>
                <p>Filter by</p>
                    <select id="topic-selector" onChange={handleCategory} autoComplete="off"> 
                    <option value="all">Show All</option>    
                        {topics.map((topic) => <option key={topic.slug } name={ topic.slug} value={topic.slug}>{ topic.slug}</option>)}
                    </select>
                <p>Sort by</p>
                    <select id="topic-selector" onChange={getSortColumn} autoComplete="off"> 
                        <option value="created_at">Date</option>    
                        <option value="comment_count">Comment Count</option>
                        <option value="votes">Votes</option>
                    </select>
                    <button onClick={sortBy} value={sortOrder === 'desc' ? 'asc' : 'desc'}>{sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
                </div>

    )
}

export default ArticleControls