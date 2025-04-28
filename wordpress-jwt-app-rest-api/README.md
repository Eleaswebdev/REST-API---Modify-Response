📝 WordPress REST API App (JWT Auth)
This is a simple frontend application using plain HTML + JavaScript that connects to a WordPress backend via the REST API using JWT Authentication.

📦 Features
🔐 Login / Logout using JWT

📃 View all posts

🆕 Create a post

✏️ Update a post

❌ Delete a post

🔍 Post details page

✅ Protected API access with JWT

📁 Project Structure
pgsql
Copy
Edit
wordpress-jwt-app/
│
├── config.js             # API base and token setup
├── login.html            # Login page
├── login.js              # Login logic
├── logout.js             # Logout logic
├── dashboard.html        # Show all posts with Edit/Delete
├── dashboard.js          # Logic to fetch and delete posts
├── create.html           # Create new post
├── create.js             # Create post logic
├── update.html           # Update post page
├── update.js             # Update logic
├── post-details.html     # View full post content
🧪 Requirements
WordPress installed locally (e.g. http://rest-api.local)

JWT Auth Plugin installed and activated

.htaccess updated to support Authorization header

apacheconf
Copy
Edit
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
Add these lines to wp-config.php:

php
Copy
Edit
define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key');
define('JWT_AUTH_CORS_ENABLE', true);
🚀 Getting Started
Clone or download the project.

Replace the apiBase URL in config.js with your WordPress site URL.

Open login.html in the browser.

Log in with your WordPress admin username and password.

After login, explore the dashboard and other features.

🔐 Security Notes
The JWT token is stored in localStorage and used for all API calls.

Make sure your site uses HTTPS in production to avoid token interception.

For enhanced security, consider using WordPress Nonce or Cookie auth on private systems.

🧹 Future Improvements
Form validations

Rich text editor (e.g. TinyMCE)

Image upload support

Pagination and search

🙌 Made with love for learning WordPress REST API + JWT ❤️
Let me know if you want this as a .md file added to your ZIP too!