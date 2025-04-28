
if (!token) {
  alert('Please login first');
  window.location.href = 'login.html';
}

function logout() {
  localStorage.removeItem('jwtToken');
  alert('Logged out!');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function () {
  fetchPosts();

  document.getElementById('create-post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    createPost();
  });
});

function fetchPosts() {
  fetch(`${apiBase}/posts`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => {
    if (!res.ok) throw new Error("Unauthorized or token expired");
    return res.json();
  })
  .then(posts => {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${post.title.rendered}</h2>
        <div>${post.excerpt.rendered}</div>
        <a href="post-details.html?id=${post.id}">Read More</a>
        <br><button onclick="deletePost(${post.id})">Delete</button>
        <button onclick="updatePost(${post.id})">Update</button>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    alert(err.message);
    logout();
  });
}

function createPost() {
  const title = document.getElementById('new-title').value;
  const content = document.getElementById('new-content').value;

  fetch(`${apiBase}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title, content: content, status: 'publish' })
  })
  .then(res => res.json())
  .then(post => {
    if (post.id) {
      alert('Post created successfully!');
      fetchPosts();
      document.getElementById('create-post-form').reset();
    } else {
      alert('Failed to create post.');
    }
  })
  .catch(err => console.error('Error creating post:', err));
}

function deletePost(id) {
  if (confirm('Are you sure you want to delete this post?')) {
    fetch(`${apiBase}/posts/${id}?force=true`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(response => {
      if (response.deleted) {
        alert('Post deleted successfully!');
        fetchPosts();
      } else {
        alert('Failed to delete post.');
      }
    })
    .catch(err => {
      console.error('Error deleting post:', err);
      alert('Failed to delete post.');
    });
  }
}

function updatePost(id) {
  const newTitle = prompt('Enter new title:');
  const newContent = prompt('Enter new content:');
  if (!newTitle || !newContent) return;

  fetch(`${apiBase}/posts/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: newTitle, content: newContent })
  })
  .then(res => res.json())
  .then(post => {
    if (post.id) {
      alert('Post updated successfully!');
      fetchPosts();
    } else {
      alert('Failed to update post.');
    }
  })
  .catch(err => {
    console.error('Error updating post:', err);
    alert('Failed to update post.');
  });
}
