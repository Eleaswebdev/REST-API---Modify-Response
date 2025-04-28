function createPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  fetch(`${apiBase}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content, status: 'publish' })
  })
  .then(res => {
    if (!res.ok) throw new Error('Creation failed');
    return res.json();
  })
  .then(() => {
    alert('Post created');
    window.location.href = 'dashboard.html';
  })
  .catch(() => alert('Failed to create post'));
}