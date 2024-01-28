# Admamu - DreamHomes

## [See the App!](https://dreamhomes-f23q.onrender.com/)

[(https://github.com/Maskedfoxguy/dreamhomes/blob/main/public/images/admamu-logo.png)]

## The tinder for house hunting, 
come and get in love with your future.

real estate listing platform that allows users to browse, search, and list properties for sale or rent. Users can create accounts, save favorite listings, and contact property owners or real estate agents.
 
## User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend

## Backlog Functionalities
Auth: Implement user registration and authentication.
CRUD: log in to upload properties, edit it and deleted it.
Property Listings: Allow users to list properties with details like price, location, number of bedrooms, and more.
Search and Filter: Provide robust search and filtering options based on various criteria (e.g., location, price range, property type).
Save Favorites: Users can save their favorite property listings for future reference.
likes: Define the relationship.
Contact Property Owner/Agent: Include a messaging system for users to inquire about a property directly.
Property-User Relationship: Establish a connection between users and their listed properties.
Bonus: External API Integration: Integrate with external APIs to include additional information about neighborhood amenities, school ratings, or local market trends.
## Technologies used

Frontend: HTML, CSS, JavaScript (consider using a frontend framework like React or Angular).
Backend: Node.js with Express.
Database: MongoDB for property data.
Authentication: Implement user authentication using a library.
Data Models: Define models for Users and Properties.

## (Optional) Routes

**NOTE -** List here all the routes of your server. Example:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password

- GET /property
  - renders the event list + the create form
- POST /property/create 
  - body: 
    - title
    - description
    - picture

## Models

## User model
username: String
email: String
password: String

## Property model
owner: ObjectId<User>
name: String
description: String
date: Date

## Comment model
body:String,
property: { type: Schema.Types.ObjectId, ref: "Property" }
author: { type: Schema.Types.ObjectId, ref: "User" }

## Links

## Collaborators

Adam https://github.com/Maskedfoxguy

Mayo Socas https://github.com/Mayo9704

Munisa https://github.com/munisamee
