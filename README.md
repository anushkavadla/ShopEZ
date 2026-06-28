# ShopEZ

### Full Stack MERN E-Commerce Web Application

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://vip-c2-shopez-q0x5.onrender.com)

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge)](https://github.com/anushkavadla/ShopEZ)

ShopEZ is a full-stack MERN e-commerce web application that provides user authentication, product management, shopping cart, wishlist, order management, and an admin dashboard.
## Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt.js

## Features

### User Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Admin Features

* Admin Authorization
* Admin-only Product Management
* Protected Product Routes

### Product Features

* View Products
* Create Products (Admin)
* Update Products (Admin)
* Delete Products (Admin)

### Cart Features

* Add to Cart
* View Cart
* Update Cart
* Delete Cart

### Order Features

* Create Orders
* View Orders
* Update Orders
* Delete Orders

## Project Structure

```
SHOP
│
├── Client
│   ├── src
│   ├── public
│   └── package.json
│
├── Server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── .env
│   └── server.js
│
└── README.md
```

## API Routes

### Users

* POST /api/users/register
* POST /api/users/login
* GET /api/users
* GET /api/users/profile

### Products

* GET /api/products
* POST /api/products
* PUT /api/products/:id
* DELETE /api/products/:id

### Cart

* GET /api/cart
* POST /api/cart
* PUT /api/cart/:id
* DELETE /api/cart/:id

### Orders

* GET /api/orders
* POST /api/orders
* PUT /api/orders/:id
* DELETE /api/orders/:id

## Current Status

✅ MongoDB Atlas Connected

✅ User Authentication Implemented

✅ JWT Authorization Implemented

✅ Admin Middleware Implemented

✅ Protected Product Routes Implemented

✅ Product CRUD Completed

✅ Cart CRUD Completed

✅ Order CRUD Completed

✅ GitHub Repository Connected

## Author

Anushka Vadla
