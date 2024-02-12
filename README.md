## eCommerce-backend
Empower your e-commerce ambitions with a robust backend crafted in Node.js, Express.js, and MongoDB. Seamlessly manage products, orders, and user data for a dynamic shopping experience.

## Installation

Clone the project and run following commands.

```bash
  cd eCommerce-backend
  npm install
  npm start
```
Start the server at http://localhost:5000.

## API Endpoints
| HTTP Verbs |  Token | Endpoints | Action
| --- | --- | --- | --- |
| POST | N | /api/users/signup | To sign up a new user account |
| POST | N | /api/users/signin | To sign in an existing user account |
| POST | Y | /api/users/update | To update an existing user account |
| POST | N | /api/users/sendResetPasswordLink | To send reset password link on mail |
| POST | N | /api/users/resetPassword | To reset password of an existing user account |
| GET | Y | /api/addresses/getAddressList/:userId | To get all addresses of particular user |
| GET | Y | /api/addresses/getAddress/:addressId | To get details particular address |
| POST | Y | /api/addresses/create | To create a new address |
| POST | Y | /api/addresses/update | To update an existing address |
| GET | Y | /api/addresses/delete/:id | To delete an existing address |
| GET | N | /api/products/all | To get all products |
| POST | Y | /api/products/create | To create a new product |
| POST | Y | /api/products/update | To update an existing product |
| GET | Y | /api/products/delete/:id | To delete an existing product |
| GET | N | /api/products/getProduct/:id | To get details of particular product |
| GET | Y | /api/products/getUserProduct/:userId | To get all products created by a user |
| GET | N | /api/products/search/:string | To search products |
| GET | N | /api/products/category/:string | To filter products according to category |
| GET | Y | /api/orders?user=userId | To get all orders of particular user |
| GET | Y | /api/orders/:id | To get details of a order |
| POST | Y | /api/orders/create | To create a new order |
| POST | Y | /api/orders/update | To update an existing order |
| GET | Y | /api/orders/delete/:id | To delete an existing order |
| POST | Y | /api/ratings/create | To create a new rating |
| POST | Y | /api/ratings/update | To update an existing rating |
| GET | Y | /api/ratings/delete/:id | To delete an existing rating |

## Tech Stack

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)    

![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Features

- User Authentication: Robust signup and sign-in mechanisms facilitate secure access for doctors. JWT (JSON Web Token) authentication ensures data integrity and confidentiality.

- Multiple Address Support: Allow users to save and manage multiple shipping and billing addresses.

- Product Management: Admin panel for managing product inventory, including adding, editing, and deleting products. Product Categories: Support for organizing products into categories and subcategories for easy navigation and filtering.

- Order Tracking: Provide real-time updates on the status of orders from placement to delivery, keeping customers informed. Order Management: Admin dashboard to manage orders, including processing, canceling, and refunding orders.

- Rating System: Implement a rating system for products, allowing users to rate products on a scale or leave written reviews. Average Rating Display: Display the average rating for each product based on user reviews, aiding in product selection.