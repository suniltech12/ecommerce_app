# ecommerce_app

## Overview
Briefly describe the purpose of your project here.

## How to Run the Application

### Frontend
To start the frontend application, use the following command:

```bash
npm run dev
```

### Backend
To start the backend application, use the following command:

```bash
npm run dev
```

## Backend Configuration

# Admin User
Only admin users are permitted to create and update products. Admin user accounts can only be created through the API and not via the user interface.

   **Register**: `POST /api/users/register`
    - **Description**: Create a new user.
    - **Request Body**: `{ "username": "string", "email": "string", "password": "string", "role": "string"  }`
     

Make sure to configure the following environment variables in your `.env` file for the backend:

```env
# Database Configuration
PORT=<your-port>
POSTGRES_DB_USERNAME=<your-database-username>
POSTGRES_DB_PASSWORD=<your-database-password>
POSTGRES_DB_DATABASE=<your-database-name>
POSTGRES_DB_HOST=<your-database-host>
POSTGRES_DB_PORT=<your-database-port>

# Security Key
SECRET_VALUE_KEY=<your-secret-key>
```

## Config File Example
If you are using a `config.json` file, it should look like this:

```json
{
  "development": {
    "username": "<your-database-username>",
    "password": "<your-database-password>",
    "database": "<your-database-name>",
    "host": "localhost",
    "port": <your-database-port>,
    "dialect": "postgres"
  }
}
```

## Run Migration Files

To run the database migration files, use the following command:

```bash
npx sequelize-cli db:migrate
```

## List of All APIs

### Authentication APIs
1. **Login**: `POST /api/users/login`
    - **Description**: Authenticate user and return a token.
    - **Request Body**: `{ "email": "string", "password": "string" }`

2. **Register**: `POST /api/users/register`
    - **Description**: Create a new user.
    - **Request Body**: `{ "username": "string", "email": "string", "password": "string" }`

### Product APIs
1. **Get All Products**: `GET /api/product/get/all`
    - **Description**: Fetch all products.

2. **Get One Product**: `GET /api/product/get-one/:id`
    - **Description**: Fetch one product by ID.

### Additional APIs
Include any other APIs specific to your project, with descriptions, endpoints, and expected request/response formats.

## Additional Notes
- Make sure to install all dependencies before running the application by using `npm install` in both frontend and backend directories.
- Use tools like Postman or cURL to test the APIs during development.
