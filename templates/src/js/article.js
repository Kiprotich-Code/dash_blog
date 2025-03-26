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
        document.getElementById('article-date').textContent = timeAgo(article.created_at);
        document.getElementById('article-body').textContent = article.body;
    } catch (error) {
        console.error('Error fetching article:', error);
        document.getElementById('article-title').textContent = 'Article not found';
    }
}

// Load the article when the page loads
window.onload = fetchArticle;


function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 0) {
            return `Posted ${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}


const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle mobile menu on and off
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close the mobile menu when close button is clicked
closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});
