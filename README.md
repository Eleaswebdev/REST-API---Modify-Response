# REST-API-in-WP
REST API in WP
# 📝 WordPress REST API CRUD (HTML + JavaScript)

A simple front-end-only project that connects with your WordPress backend using the REST API and Basic Authentication.

✅ Features:
- Fetch and display all blog posts (Read)
- View single post details (Dynamic page)
- Create new blog posts
- Update existing posts
- Delete posts
- Clean UI using plain HTML, CSS, and JavaScript
- Uses Basic Auth (Base64) — no backend other than WordPress

---

## 🚀 Live Preview

> This project runs on your local environment (example: `http://127.0.0.1:5500/`).

---

## 🔧 Setup Instructions

1. Make sure you have a local WordPress site running (e.g. `http://rest-api.local`)
2. Clone or download this repo.
3. Update `config.js` with your credentials:

```js
const apiBase = 'http://rest-api.local/wp-json/wp/v2';
const username = 'admin';
const password = 'your-application-password-here'; // go to your wordpress user profile and in application password section, generate it and copy and paste here
const token = btoa(`${username}:${password}`);
Open index.html in your browser (e.g. using Live Server).

🛡 Security Note
⚠️ This demo uses Basic Authentication with credentials in the frontend for learning purposes only.

In production:

Never expose real credentials in the frontend.

Use OAuth, JWT, or a secure backend proxy.

❤️ Credits
Made with love for learning WordPress REST API with plain JavaScript.

📄 License
This project is licensed under the MIT License.
