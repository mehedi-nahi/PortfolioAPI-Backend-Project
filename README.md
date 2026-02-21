# Portfolio API

A RESTful backend API built for a personal portfolio website. It handles all the data that a typical portfolio site needs — user authentication, experience, education, skills, services, portfolio projects, blogs, comments, contact messages, and file uploads. Everything is stored in MongoDB Atlas.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Token) stored in HTTP-only cookies
- **Password Hashing:** bcrypt
- **File Upload:** Multer (saved to local `uploads/` folder)
- **Security:** Helmet, express-mongo-sanitize, HPP, CORS, express-rate-limit
- **Environment Variables:** dotenv

---

## Project Structure

```
Portfolio-API/
├── app.js                   # Express app setup, middleware, DB connection
├── index.js                 # Server entry point (port 5002)
├── package.json
├── uploads/                 # Uploaded files are stored here
├── client/                  # Static frontend files (if any)
└── src/
    ├── controllers/         # Route handler logic
    ├── middlewares/         # Auth verification, file upload config
    ├── models/              # Mongoose schemas
    ├── routes/
    │   └── api.js           # All API routes in one place
    └── utility/
        └── tokenutility.js  # JWT encode/decode helpers
```

---

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas cluster (or local MongoDB)
- A `.env` file in the project root

### Environment Variables

Create a `.env` file in the root of the project with the following:

```
DB_URL=your_mongodb_connection_string
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_KEY=your_jwt_secret_key
JWT_Expire_Time=1d
Cookie_expire_Time=86400000
```

### Install Dependencies

```bash
npm install
```

### Run the Server

```bash
npx nodemon index
```

The server will start on **port 5002**.

```
Server is running on port 5002
```

---

## Authentication

- Register and login return a JWT token set as an HTTP-only cookie named `token`.
- Protected routes require this cookie to be present.
- The `authVerification` middleware decodes the token and attaches the user's email and ID to the request headers for use in controllers.

---

## API Endpoints

All routes are prefixed with `/api/v1`.

### User

| Method | Endpoint     | Auth Required | Description              |
|--------|--------------|---------------|--------------------------|
| POST   | /register    | No            | Register a new user      |
| POST   | /login       | No            | Login and receive token  |
| GET    | /user        | Yes           | Get logged-in user info  |
| GET    | /logout      | Yes           | Clear the auth cookie    |
| POST   | /update      | Yes           | Update email or password |

### Experience

| Method | Endpoint                    | Auth Required | Description               |
|--------|-----------------------------|---------------|---------------------------|
| POST   | /create-experience          | Yes           | Add new experience        |
| GET    | /allexperience              | No            | Get all experiences       |
| GET    | /single-experience/:id      | No            | Get a single experience   |
| POST   | /update-experience/:id      | Yes           | Update an experience      |
| DELETE | /delete-experience/:id      | Yes           | Delete an experience      |

### Education

| Method | Endpoint                  | Auth Required | Description             |
|--------|---------------------------|---------------|-------------------------|
| POST   | /create-education         | Yes           | Add new education       |
| GET    | /alleducation             | No            | Get all education       |
| GET    | /single-education/:id     | No            | Get a single education  |
| POST   | /update-education/:id     | Yes           | Update an education     |
| DELETE | /delete-education/:id     | Yes           | Delete an education     |

### Advantage (Skills)

| Method | Endpoint                  | Auth Required | Description           |
|--------|---------------------------|---------------|-----------------------|
| POST   | /create-advantage         | Yes           | Add a skill/advantage |
| GET    | /alladvantage             | No            | Get all advantages    |
| GET    | /single-advantage/:id     | No            | Get a single one      |
| POST   | /update-advantage/:id     | Yes           | Update               |
| DELETE | /delete-advantage/:id     | Yes           | Delete               |

### Portfolio

| Method | Endpoint                  | Auth Required | Description              |
|--------|---------------------------|---------------|--------------------------|
| POST   | /create-portfolio         | Yes           | Add a portfolio item     |
| GET    | /allportfolio             | No            | Get all portfolio items  |
| GET    | /single-portfolio/:id     | No            | Get a single item        |
| POST   | /update-portfolio/:id     | Yes           | Update                   |
| DELETE | /delete-portfolio/:id     | Yes           | Delete                   |

### Service

| Method | Endpoint               | Auth Required | Description         |
|--------|------------------------|---------------|---------------------|
| POST   | /create-service        | Yes           | Add a service       |
| GET    | /allservice            | No            | Get all services    |
| GET    | /single-service/:id    | No            | Get a single one    |
| POST   | /update-service/:id    | Yes           | Update              |
| DELETE | /delete-service/:id    | Yes           | Delete              |

### Contact (Messages)

| Method | Endpoint                | Auth Required | Description                  |
|--------|-------------------------|---------------|------------------------------|
| POST   | /create-contact         | No            | Submit a contact message     |
| GET    | /allcontact             | No            | Get all contact messages     |
| GET    | /single-contact/:id     | No            | Get a single message         |
| DELETE | /delete-contact/:id     | No            | Delete a message             |

### Blog

| Method | Endpoint                      | Auth Required | Description                          |
|--------|-------------------------------|---------------|--------------------------------------|
| POST   | /create-blog                  | Yes           | Create a blog post                   |
| GET    | /allblog/:pageNo/:perPage     | No            | Get blogs with pagination            |
| GET    | /single-blog/:id              | No            | Get a single blog post               |
| POST   | /update-blog/:id              | Yes           | Update a blog post                   |
| DELETE | /delete-blog/:id              | Yes           | Delete a blog post                   |

### Comment

| Method | Endpoint                | Auth Required | Description              |
|--------|-------------------------|---------------|--------------------------|
| POST   | /create-comment         | No            | Post a comment on a blog |
| GET    | /allcomment             | No            | Get all comments         |
| GET    | /single-comment/:id     | No            | Get a single comment     |
| DELETE | /delete-comment/:id     | Yes           | Delete a comment         |

### File Upload

| Method | Endpoint      | Auth Required | Description                                  |
|--------|---------------|---------------|----------------------------------------------|
| POST   | /file-upload  | Yes           | Upload a file (saved to uploads/ folder)     |

Uploaded files are accessible at: `/api/v1/get-file/<filename>`

---

## Data Models

**User** — `email`, `password` (hashed with bcrypt before saving)

**Experience** — `title`, `company`, `description`, `time`

**Education** — `title`, `institute`, `description`, `time`

**Advantage** — `title`, `category`, `percent`, `time`

**Portfolio** — `title`, `img`, `link`, `category`

**Service** — `title`, `description`, `img`

**Contact** — `name`, `email`, `website` (optional), `message`

**Blog** — `title`, `category`, `img`, `shortDescription`, `description`

**Comment** — `blogID` (ref to blog), `name`, `email`, `comment`

All models include `createdAt` and `updatedAt` timestamps automatically.

---

## Security Features

- **Helmet** — sets secure HTTP headers
- **express-mongo-sanitize** — prevents MongoDB operator injection
- **HPP** — protects against HTTP parameter pollution
- **CORS** — enabled for cross-origin requests
- **Rate Limiting** — 100 requests per IP per 15 minutes
- **JWT in HTTP-only cookie** — token is not accessible via JavaScript on the client side
- **bcrypt** — passwords are hashed before being stored in the database

---

## File Upload

- Handled by Multer with disk storage
- Files are saved to the `uploads/` directory
- File size limit is 8MB
- Filenames are prefixed with `api-img` + timestamp to avoid conflicts
- Spaces are removed from original filenames

