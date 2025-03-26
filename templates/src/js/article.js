// Function to get query parameters from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch and display the article based on the article ID
async function fetchArticle() {
    const articleId = getQueryParam('id');
    if (!articleId) {
        console.error('No article ID provided');
        return;
    }

    try {
        const response = await fetch(`https://api.bellyone.co.ke/blog/api/v1/posts/${articleId}/`);
        if (!response.ok) {
            throw new Error('Article not found');
        }

        const article = await response.json();
        console.log('Fetched article:', article);

        // Display article details
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-author').textContent = `By ${article.author}`;
        document.getElementById('article-date').textContent = new Date(article.created_at).toLocaleDateString();
        document.getElementById('article-body').textContent = article.body;
    } catch (error) {
        console.error('Error fetching article:', error);
        document.getElementById('article-title').textContent = 'Article not found';
    }
}

// Load the article when the page loads
window.onload = fetchArticle;