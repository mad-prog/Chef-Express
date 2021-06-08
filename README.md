# Chef-Express

### A meal planning API

A _happy_ **MEAL** API where you create, share and search meal ideas.

Feel free to _comment_ on the meals ideas and give them a _rating_.

Maybe even try the **meal planner** which selects three random meals and emails them to you!

Madeleine:

> Let's get cooking!

&nbsp;
&nbsp;
&nbsp;

| Menu                  | Option |
| --------------------- | ------ |
| family :taco:         | kosher |
| vegan :green_salad:   | vegan  |
| mediterranean :pizza: | paleo  |

&nbsp;
&nbsp;
&nbsp;

1. [Basic Structure](##Basic-Structure)
2. [Installation](##Installation)
3. [One to Many](##One-to-Many,-Three-entities)
4. [Routes](##Routes)
   1. [Users](###Users)
   1. [Meals](###Meals)
   1. [Comments](###Comments)

&nbsp;
&nbsp;
&nbsp;

## Basic Structure

This RESTful API is an exercise to understand a 1:M relationship using a **MySQL** database. I built a **NODE.js** server to handle the promise-based HTTP transactions with MySQL through the ORM **Sequelize**.

Future proyects - front-end. - enable upload photos of meals. - more complex search functions. - pass from signup straight to login/ or users/me endpoint

Dependencies:

- dotenv - you're provided with a .env template
- joi - validates the input structure
- jsonwebtoken - provides users with a webtoken to control access
- mysql2 - helps run mysql queries
- nodemailer - sends users emails with requested info
- sequelize - converts data to communicate with MySQL

&nbsp;
&nbsp;
&nbsp;

## Installation

You will need:

- NODE.js
- MySQL - with a named database
- clone this repo
- npm i - installs all dependencies
- .env_template - insert your environment variables and rename .env
- default localhost is 3000
- npm start - command to start Chef-Express Happy Api Meal!

  > Let's start cooking, good lookin'

  &nbsp;
  &nbsp;
  &nbsp;

## One to Many, Three entities

This APP is based on a structure of the three entities; User, Meal and Comment;
Sequelize allows us to define the Models and the relationship between them.

Users can create numerous meals: User `hasMany` meal and meal `belongTo` user.

Users can also create numerous comments: User `hasMany` comment and comment `belongTo` user.

The comments are made on meals so they also have a relationship: Meal `hasMany` comment and comment `belongTo` meal.

This creates the following relationship:

&nbsp;
&nbsp;
&nbsp;

![The relationship between the tables define the RESTful API](https://res.cloudinary.com/madeleinetestcloud/image/upload/v1623147144/poseidon/roqobdhpx81ou3np4hah.png)

&nbsp;
&nbsp;
&nbsp;

## Routes

### Users

Chef-Express>routes>users.js

- POST:
  - users/sign up
    - creates new user
  - users/login
    - generate a json web token
- GET:
  - users/all
    - ADMIN ONLY - roleValidation filters all users who are not admin
  - users/:id
- DELETE:
  - users/:id
    - ADMIN ONLY
- PUT:

  - users/:id
    - user details can only be edited by the same USER or ADMIN

### Meals

Chef-Express>routes>mealRouter.js

- POST:
  - meals/
    - all users can create meals
- GET:

  - meals/all
    - all users can see all meals
    - meals include author, associated comments and their corresponding authors
  - meals/:id

    - all users can see indiviudal meals
    - meals include author, associated comments and their corresponding authors

  - meals/search:category?:ingredient?

    - all users can search meals by category or ingredient
    - meals include author, associated comments and their corresponding authors

  - meals/random
    - all users can request a random mealplan of three meals.
    - the plan will be emailed to user's email

- DELETE:
  - meals/:id
    - ADMIN & MOD ONLY
- PATCH:
  - meals/:id
    - meals can only be edited by the same USER that created them or ADMIN or MOD

### Comments

Chef-Express>routes>commentRouter.js

- POST:
  - comments/
    - all users can create comments
- GET:
  - comments/all
    - ADMIN ONLY
  - comments/:id
    -all users can see individual comments
- DELETE:
  - comments/:id
    - comments can be deleted by USER who created them, or USER who created the meal that they belong to, or ADMIN or MOD
- PATCH:

  - comments/:id
    - user details can only be edited by the same USER or MOD or ADMIN
