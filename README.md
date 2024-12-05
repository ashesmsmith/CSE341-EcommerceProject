# CSE341-EcommerceProject

Thursday 8am Team -Final Project for CSE 341 - Ecommerce API

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```
git clone https://github.com/ashesmsmith/CSE341-EcommerceProject.git
```

### 2. Install Dependencies

```
npm install
```

### 3. Set up the environment file

Create a .env file in the root of the project directory and define the following variables:

- PORT: Specify the port number the server will run on
- MONGODB_URI: Provide the MongoDB connection string
- SECRET: lowercase alphabet+1~9
- BASE_URL: port 3000 for development environment or production site url
- CLIENT_ID: Provide the Auth0 clientID
- ISSUER_BASE_URL: Provide the Auth0 issuer base url

### 4. Configure .gitignore

Ensure the following files and directories are added to the .gitignore file before committing:

```
.env
node_modules/
```

### 5. Work on your own branch

Always create a new branch for your feature or bug fix:

```
git checkout -b <your-branch-name>
```

When your work is complete, push your branch and create a pull request for review.
