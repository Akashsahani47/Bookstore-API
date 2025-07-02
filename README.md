Here's your content formatted in Markdown, ready to be added to a README file:

# Bookstore API

A RESTful API for user authentication and book management using Node.js, Express, JWT, and file-based storage (JSON files).

-----

🚀 **Features**

  * ✅ User registration and login
  * 🔐 JWT-based authentication
  * 📘 CRUD operations on books
  * 🔄 Pagination support
  * 🛡️ Only the creator can update/delete their own books
  * 📦 File-based storage using JSON
  * 🧾 Logging and global error handling middleware

-----

🛠️ **Setup Instructions**

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/bookstore-api.git
    cd bookstore-api
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**

    Create a `.env` file in the root directory:

    ```ini
    PORT=3000
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Create Data Files**

    ```bash
    mkdir data
    echo "[]" > data/users.json
    echo "[]" > data/books.json
    ```

5.  **Start the Server**

    ```bash
    npm run dev
    ```

-----

📬 **API Endpoints**

### 🔐 User Routes (`/api/users`)

| Method | Endpoint    | Description          |
| :----- | :---------- | :------------------- |
| `POST` | `/register` | Register a new user  |
| `POST` | `/login`    | Login and get token  |

**📥 Sample User Registration Body**

```json
{
  "name": "Akash Kumar",
  "email": "ak676964@gmail.com",
  "password": "yourpassword"
}
```

### 📚 Book Routes (`/api/books`) – 🔒 Protected (JWT Token Required)

Set Header:
`Authorization: Bearer <your_token_here>`
`Content-Type: application/json`

| Method   | Endpoint      | Description                  |
| :------- | :------------ | :--------------------------- |
| `GET`    | `/showAll`    | Get all books (with pagination) |
| `GET`    | `/add/:id`    | Get a single book by ID      |
| `POST`   | `/create`     | Create a new book            |
| `PUT`    | `/update/:id` | Update a book (Only if owner) |
| `DELETE` | `/delete/:id` | Delete a book (Only if owner) |

**📥 Sample Book Creation Body**

```json
{
  "title": "Book Title",
  "author": "Akash Kumar",
  "genre": "Love",
  "publishedYear": 2023
}
```
