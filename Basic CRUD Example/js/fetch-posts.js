document.addEventListener('DOMContentLoaded', function () {
  fetch(`${apiBase}/posts`, {
    headers: {
      'Authorization': `Basic ${token}`
    }
  })
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts-container');
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${post.title.rendered}</h2>
        <div>${post.excerpt.rendered}</div>
        <a href="post-details.html?id=${post.id}" target="_blank">Read More</a>
        <br><button onclick="deletePost(${post.id})">Delete</button>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
  });
});
