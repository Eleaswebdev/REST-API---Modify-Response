document.addEventListener('DOMContentLoaded', function () {
  fetch(`${apiBase}/posts`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById('posts-container');
    posts.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>${post.title.rendered}</h2>
        <a href="post-details.html?id=${post.id}">Read More</a>
        <button onclick="deletePost(${post.id})">Delete</button>
        <a href="update.html?id=${post.id}">Edit</a>
      `;
      container.appendChild(div);
    });
  });
});

function deletePost(id) {
  if (confirm('Delete this post?')) {
    fetch(`${apiBase}/posts/${id}?force=true`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    })
    .then(() => {
      alert('Post deleted');
      location.reload();
    })
    .catch(() => alert('Delete failed'));
  }
}