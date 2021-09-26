
# Library Management System 

A web-based library management system built with Node.js, Express, MySQL and EJS templating.

## Features

- User authentication (Admin/Student roles)
- Book management (Add, search, download)
- Article management (Create, view) 
- Student feedback system
- Book transaction tracking
- Image gallery
- Responsive design

## Tech Stack

- Backend: Node.js, Express
- Database: MySQL
- Views: EJS templates
- Frontend: HTML, CSS, Bootstrap
- Authentication: Passport.js
- File uploads: express-fileupload

## Installation

1. Clone the repository
```bash
git clone https://github.com/Namithesh/modern-library.git
cd modern-library
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a 

.env

 file with:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password 
DB_DATABASE=library
SESSION_SECRET=your_session_secret
```

4. Initialize MySQL database
- Create a database named `library`
- Import schema from 

sql.txt



5. Start the server
```bash
npm start
```

The app will be running at `http://localhost:3000`

## Usage

### Admin Features
- Manage books and articles
- Track book transactions
- View student feedback
- Manage student accounts
- Upload gallery images

### Student Features  
- Browse and download books
- Create and view articles
- Submit feedback
- View gallery

## Project Structure

```
├── client/          # Frontend assets
├── server/          # Backend code
│   ├── models/      # Database models
│   ├── routes/      # Route handlers  
│   ├── auth.js      # Authentication
│   └── server.js    # Entry point
├── views/           # EJS templates
└── static/          # Static files
```
