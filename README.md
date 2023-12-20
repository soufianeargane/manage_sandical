**Project Intro**

This project aims to create a web application that facilitates the management of monthly membership fee payments for a syndicate of apartments. The application should provide the following functionalities:

-   Building managers can manage apartments, including creating, modifying, and deleting them.
-   Building managers can manage monthly payments for each apartment, including creating and modifying payments.
-   Building managers can print invoices for each payment made by an apartment.

The application should be user-friendly, easy to navigate, and thoroughly tested to ensure proper functioning.

## Backend Application

### Technology Stack

-   Express.js
-   MongoDB
-   Node.js

### Features

-   User authentication and authorization
-   CRUD operations on resources
-   File uploading

## Frontend Application

### Technology Stack

-   React.js
-   Redux
-   Material-UI

### Features

-   Responsive design
-   User-friendly interface
-   Interactive components

## Installation and Setup

### Backend Application

1. Clone the repository to your local machine.

```bash
git clone https://github.com/soufianeargane/manage_sandical.git
```

2. Open the backend folder: Run

```bash
cd appartement-backend
```

3. Install the required dependencies.

```bash
npm install
```

4. Create a `.env` file in the project root directory and add the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/project-name
TOKEN_SECRET= your token
```

5. Start the backend application.

```bash
npm start
```

### Frontend Application

1. Clone the repository to your local machine.

```bash
git clone https://github.com/username/project-name.git
```

2. Open the frontend folder: Run

```bash
cd appartement-front
```

3. Install the required dependencies.

```bash
npm install
```

4. Start the frontend application.

```bash
npm run dev
```

## Usage

### Backend Application

The backend application provides a RESTful API for interacting with the data stored in the database. You can use any REST client, such as Postman or Insomnia, to send requests to the API.

### Frontend Application

The frontend application provides a user interface for interacting with the backend API. You can use a web browser to access the frontend application.
