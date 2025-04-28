function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://rest-api.local/wp-json/jwt-auth/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('jwtToken', data.token);
      alert('Login successful');
      window.location.href = 'dashboard.html';
    } else {
      alert('Login failed');
    }
  });
}