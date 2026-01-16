# Portobello - Vintage E-Commerce

Welcome to my React project! This is a simple e-commerce site for vintage items that I built for my Web Development course. It simulates a real online shop where you can browse products, see details, and manage the catalog if you are an admin.

## How to Run the Project

To get this running, you need to open **two terminals** (one for the fake backend data, one for the frontend app).

**1. Start the Backend (Terminal 1):**
```bash
npm run api
```
*This starts a local server on http://localhost:5000*

**2. Start the App (Terminal 2):**
```bash
npm run dev
```
*This launches the website on http://localhost:5173*

---

## Technology Stack

Here is what I used to build this:
- **React 18**: The main library for the interface.
- **Redux Toolkit**: To keep track of data (like logged-user and products) globally.
- **React Router**: To navigate between pages without reloading.
- **Axios**: To fetch data from my fake API.
- **CSS3**: Custom styling.
- **JSON Server Auth**: A tool that acts like a real backend with login capabilities.

---

## Features

### Pages
I created more than 6 pages as required:
1.  **Homepage**: The main landing page.
2.  **Catalog**: Shows all products. You can **filter** them or use **pagination**.
3.  **Product Detail**: Click on any product to see its full info.
4.  **Login**: To sign in as a user or admin.
5.  **Admin Dashboard**: Where admins can add or delete items.
6.  **Contact**: A simple form to send messages.
7.  **User Profile**: Shows your info when you are logged in.

### Users & Roles
There is a login system with different permissions:
- **Guest**: Can browse everything (Home, Catalog, etc.).
- **User**: Can log in and see their profile.
- **Admin**: Has special powers! Can access the **Dashboard** to manage products (Create, Update, Delete).

### Forms
I implemented 4 forms that check if your input is correct:
- **Login Form**: Checks email/password.
- **Add Product**: Checks if you filled all fields correctly.
- **Edit Product**: Lets you update existing product info.
- **Contact Form**: Checks if your email is valid before "sending".

---

## Folder Structure

- `src/api`: Where I set up the connection to the server.
- `src/components`: Reusable parts like Buttons, Navbar, Footer.
- `src/features`: Where Redux logic lives.
- `src/pages`: The main screens of the website.

---

## Test Credentials (Login)

Use these to test the app features:

**Admin Role:**
- Email: `admin@portobello.com`
- Password: `password123`

**User Role:**
- Email: `user@portobello.com`
- Password: `password123`

---
*Educational Project - Not for commercial use.*
