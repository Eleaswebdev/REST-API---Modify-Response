function deletePost(id) {
  if (confirm('Are you sure you want to delete this post?')) {
    fetch(`${apiBase}/posts/${id}?force=true`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(response => {
      alert('Post deleted successfully!');
      location.reload();
    })
    .catch(err => {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please check your token or try again.');
    });
  }
}
