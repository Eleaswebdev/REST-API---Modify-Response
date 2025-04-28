document.getElementById('update-post-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('post-id').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  fetch(`${apiBase}/posts/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      content: content,
      status: 'publish'
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Update failed. Status: ${res.status}`);
    }
    return res.json();
  })
  .then(res => res.json())
  .then(post => {
    alert('Post updated successfully!');
  })
  .catch(err => {
    console.error('Error updating post:', err);
    alert('Failed to update post. Please check your credentials or input.');
  });
});
