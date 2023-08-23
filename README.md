# Top News Headlines

This repository contains the frontend app built with Next.js, utilizing Next.js 13's new features, Next.js Auth0 for authentication, and Tailwind CSS for styling. The app fetches top news headlines in the US using the [News API](https://newsapi.org/) and displays them. It includes features like protected routes via Auth0 and displaying user site history after authentication. The backend API for this app can be found [here](https://github.com/austinb847/top-news-backend). You will need to set that up as well to run the app.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)

## Features

- Display top news headlines from the US using the News API.
- Authenticated routes using Auth0 for protecting article detail pages and site history display.
- Utilizes Next.js 13's new features including the new app router architecture and server components.
- Styled using Tailwind CSS.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/austinb847/top-news-app.git
   cd top-news-app
   ```

2. Install dependencies:

   ```bash
    npm install
   ```

3. Set up the environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Then, fill in the environment variables in the `.env.local` file.

4. Run the development server:

   ```bash
    npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Authentication

The app uses Auth0 for authentication. To sign up, click the "Sign Up" button in the navbar. To log in, click the "Log In" button in the navbar. Once logged in, you will be redirected to the homepage. You can then click on the "Site History" link in the navbar to see your site history and the article detail pages will be accessible.
