document.getElementById('create-post-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  fetch(`${apiBase}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json'
    },

    /**
     * body: This represents the body of the request, which is the actual data that you're sending to the API.
     * JSON.stringify({ ... }): This converts the JavaScript object (the data you're sending) into a JSON string. This is required because the REST API expects the data in JSON format.
     * title: title, content: content, status: 'publish' }): This is the data you're sending to the API. It includes the title and content of the post, and the status (published in this case). The API will use this data to create a new post.
     * 
     */
    body: JSON.stringify({
      title: title,
      content: content,
      status: 'publish'
    })
  })

  .then(res => {
    if (!res.ok) {
      throw new Error(`Create failed. Status: ${res.status}`);
    }
    return res.json();
  })

  /**
   * .then(res => res.json()): After sending the POST request, we expect a response from the API. This line takes the response (res), and parses it as JSON using the .json() method.
   */
  .then(res => res.json())
  .then(post => {
    alert('Post created successfully!');
    location.reload();
  })
  .catch(err => {
    console.error('Error creating post:', err);
    alert('Failed to create post. Please check your credentials or input.');
  });
});
