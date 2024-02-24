# GitHub Gists Manager Express Server

This Express server acts as a proxy for handling requests related to GitHub's OAuth flow and GitHub Gists management. It was developed to overcome CORS issues encountered during the development of a frontend Vue.js application for managing GitHub Gists.

## How It Works

The server intercepts requests from the frontend application and forwards them to the GitHub API, resolving any CORS-related issues in the process. It implements necessary CORS headers to allow requests from the frontend application hosted on GitHub Pages.

### Key Features

- **CORS Handling:** The server sets appropriate CORS headers to allow cross-origin requests from the frontend application.
- **OAuth Flow:** Implements endpoints to handle OAuth authentication flow with GitHub, including fetching access tokens.
- **Gists Management:** Provides endpoints for managing GitHub Gists, such as updating gist content.

## Installation and Setup

To run the server locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd github-gists-express-server`
3. Install dependencies: `npm install`
4. Run the server locally: `netlify dev`
5. Access the server at `http://localhost:8888`.

## Endpoints

### `GET /.netlify/functions/api`

Returns a simple message indicating that the server is running.

### `POST /.netlify/functions/api/accesstoken`

Handles the OAuth flow by exchanging an authorization code for an access token from GitHub.

### `PATCH /.netlify/functions/api/gists/:id`

Updates the content of a GitHub Gist with the specified ID.

## Deployment

The Express server is deployed using Netlify. Netlify provides a seamless deployment experience with features like continuous deployment, automatic HTTPS, and serverless functions support. By deploying the server on Netlify, you can take advantage of these features without the need for complex server configuration.

### Advantages of Netlify Deployment

1. **Serverless Functions Support:** Netlify allows you to deploy serverless functions alongside your frontend application, enabling a unified deployment process for both frontend and backend.
2. **Continuous Deployment:** With Netlify's continuous deployment feature, any changes pushed to your repository trigger automatic deployments, ensuring your server is always up-to-date.
3. **Automatic HTTPS:** Netlify provides automatic HTTPS for all custom domains, ensuring secure communication between clients and the server without manual configuration.
4. **Scalability:** Netlify scales automatically to handle traffic spikes, ensuring your server remains responsive under varying loads.

Deploying the server on Netlify simplifies the deployment process and provides a robust hosting solution for your Express application.

## About

This Express server is part of the GitHub Gists Manager project, developed to enhance the management of GitHub Gists. If you encounter any issues or have suggestions for improvements, feel free to open an issue on the GitHub repository.

Thank you for using GitHub Gists Manager Express Server! 🚀
