const url = 'https://api.bellyone.co.ke/blog/api/v1/posts';  // Ensure this is set correctly
const articlesContainer = document.getElementById('articles-container');

async function fetchArticles() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();
        console.log('Fetched articles:', data);

        renderArticles(data);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

function renderArticles(articles) {
    if (!articles || articles.length === 0) {
        console.log('No articles to display');
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('bg-gray-100', 'rounded-lg', 'p-4', 'hover:shadow-md', 'transition-shadow');

        // Construct the article element
        articleElement.innerHTML = `
            <a href="article.html?id=${article.id}" class="block text-xl font-semibold text-gray-900 hover:text-blue-500 p-4">
                ${article.title}
                <p class="text-gray-600 mt-2">${article.excerpt || "Explore more about this topic."}</p>
            </a>
        `;

        articlesContainer.appendChild(articleElement);
    });
}

// Load all articles once
fetchArticles();

document.getElementById('newsletter-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent page reload

    const form = event.target;
    const email = document.getElementById('email').value;
    const messageEl = document.getElementById('message');

    try {
        const response = await fetch('http://127.0.0.1:8000/blog/api/v1/posts/subscriptions/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        messageEl.textContent = data.message || "Email has been submitted successfully! Thanks for being part of us!";
        messageEl.classList.add(response.ok ? "text-green-600" : "text-red-600");

        if (response.ok) {
            form.reset(); // Clears the form inputs only on success
        }
    } catch (error) {
        messageEl.textContent = "Error submitting email! Please try again!";
        console.log(error);
        messageEl.classList.add("text-red-600");
    }
});


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