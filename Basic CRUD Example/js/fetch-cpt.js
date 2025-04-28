document.addEventListener('DOMContentLoaded', function () {
    fetch(`${apiBase}/book`, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
    .then(response => response.json())
    .then(books => {
      const container = document.getElementById('posts-container');
      books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h2>${book.title?.rendered}</h2>
          <div>${book.excerpt?.rendered}</div>
          <a href="post-details.html?id=${book.id}" target="_blank">Read More</a>
          <br><button onclick="deletePost(${book.id})">Delete</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching CPT posts:', error);
    });
  });
  