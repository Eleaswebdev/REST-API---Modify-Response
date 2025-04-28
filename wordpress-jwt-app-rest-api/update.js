const postId = new URLSearchParams(window.location.search).get('id');

function updatePost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  fetch(`${apiBase}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content, status: 'publish' })
  })
  .then(res => {
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  })
  .then(() => {
    alert('Post updated');
    window.location.href = 'dashboard.html';
  })
  .catch(() => alert('Failed to update post'));
}