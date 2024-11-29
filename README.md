# Ecommerce-App
## Live : **[E-Commerce App](https://ecommerce-client-mfmi.onrender.com)**
(wait for some time so that it can load properly)

### Admin Credentials  
Use this credential only to login as Admin
- **Email**: kskapil2872@gmail.com  
- **Password**: 12345678  

### Regular User  
- **Email**: user1@gmail.com  
- **Password**: 12345678  

# E-Commerce Application  

This is a robust and secure full-stack e-commerce platform that allows users to browse, manage, and interact with products. The application includes **role-based access control** for Admins and Users, ensuring a secure and personalized experience for every user.

---

## Table of Contents  

1. [About the Project](#about-the-project)  
2. [Features](#features)  
3. [Tools & Technologies](#tools--technologies)  
4. [Authentication & Authorization](#authentication--authorization)  
5. [Role-Based Access Control](#role-based-access-control)   
6. [API Endpoints](#api-endpoints)  


---

## About the Project  

This e-commerce application is designed to provide a secure and seamless product browsing and management experience. It includes:  

- **Authentication**: Secure user login and registration using **JWT (JSON Web Tokens)** and password hashing.  
- **Authorization**: Users have controlled access to resources based on their roles (Admin or User).  
- **Product Management**: CRUD operations, advanced filtering, and pagination.  
- **User-Friendly Design**: Fully responsive layout optimized for all devices.

---

## Features  

### **General Features**  
- Interactive user and admin dashboards.  
- Efficient cart and product management system.  
- Advanced filtering and sorting of products by categories and attributes.  

### **Admin-Specific Features**  
- Create and manage categories.  
- Add products under specific categories.  
- Update or delete any product details at any time.  

### **User-Specific Features**  
- Secure account registration, login, and profile management.  
- Add products to the cart and review their selected items.  

---

## Tools & Technologies  

- **Frontend**: React.js, Bootstrap, HTML, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (for data persistence)  
- **Authentication**: JWT for secure session handling, bcrypt for password hashing  

---

## Authentication & Authorization  

### **Authentication**  
1. **Registration**:  
   Users create an account by providing a username, email, and password. Passwords are securely hashed using **bcrypt** to ensure data security.  
   
2. **Login**:  
   Users log in using their email and password. A **JWT (JSON Web Token)** is generated upon successful authentication and stored on the client side.  

3. **Session Management**:  
   - The JWT token is used to validate user sessions for subsequent requests.  
   - Tokens are securely stored in cookies or local storage.  

### **Authorization**  

1. **Role-Based Access Control**:  
   - **Admin Role**: Admins have access to all resources, such as adding categories, managing products, and modifying any product details.  
   - **User Role**: Users can access only their cart, product list, and profile.  

2. **Protected Routes**:  
   - Middleware ensures that only authenticated users can access specific routes.  
   - Admin-specific routes are restricted to Admin tokens.  

3. **Error Handling**:  
   - Unauthorized requests return meaningful error messages like `401 Unauthorized` or `403 Forbidden`.

---

## Role-Based Access Control  

The role (Admin or User) is determined in the database using a flag:  
- **Admin**: If the `role_flag` is `1`, the user is an Admin and can manage all aspects of the platform.  
- **User**: If the `role_flag` is `0`, the user has restricted access to cart, product browsing, and profile updates.  

---



