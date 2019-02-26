# Project Name


## Description
It is an app that allows the user to find walking tours in a given city. These tours will be saved in the app and the user will follow the route using their phone through an app thats renders a map and location.
The user can  create a new tour by selecting on a map a series of points of interest. These tours can be rated by other users.
## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start looking for  tour.
-  **Login:** As a user I can login to the platform so that I can see my favorite tours and join them
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Tour** As a user I can add a new tour
-  **List Tours** As a user I want to see all the tours available in a specific city
-  **Search Tours** As a user I want to search tours in a specific city using a search bar
-  **Add to favorites** As a user I want to add tours to favorites so that I can save the tours that I liked the most BACKLOG
-  **See my favorites** As a user I want to see my favorite tours so that I can see the ones I liked the most BACKLOG

## Backlog

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list of tours created by the user
- list tours the user is attending

Geo Location:
- add geolocation to tours when creating
- show event in a map in event detail page
- show all tours in a map in the event list page
- show details on the map

Homepage:
- The home page is a lost of most popular tours
  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to homepage after logout, expire session |
| `get`  | `/` | HomePageComponent| public | render list of tours and search bar|
| `get`  | `/tour` | TourPageComponent| public | shows detail of the tour you clicked on the home page
| `get`  | `/myTours` | MyTours Component| public | shows list of tours you created
| `post` | `/tour/create` | TourCreatePageComponent | user only | creates a new Tour, navigates to myTours
| `put` | `/tour/:id` | TourDetailPageComponent  | public/user | details of one Tour, if logged in - button to add to favorite, show star if in favorites already
| `delete` | `/tour/:id` | na | user only | delete tour
| `get` | `/profile/me` | ProfilePageComponent | user only | my details, my favorite tours, tours created by me
| `get` | `**` | NotFoundPageComponent | public | 




## Components

- Tour Card component
  - Input: Tour: any
  - Output: favorite(TourId: string, on: boolean)
- Search component
  - Output: change(terms: string)
- Tour
- Button
- Map



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- tour Service
  - tour.list()
  - tour.search(terms)
  - tour.create(data)
  - tour.detail(id)
  - tour.addFavorite(id)
  - tour.removeFavorite(id)   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Tour>]
toursDone - Array [ObjectID<Tour>]
myTours - Array [ObjectID<Tour>]
```

Tour model

```
owner - ObjectID<User> // required
name - String // required
city - String
description - String
POI - Array
coordinates - number
duration - Number
rating - Number
Reviews - Array
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- POST /user/me/favorite
  - body:
    - tourId
  - validation
    - id is valid (404)
    - id exists (404)
  - add to favorites if not there yet
  - updates user in session
- DELETE /user/me/favorite/:tourId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from favorites
  - updates user in session
- GET /tour?terms=foo
  - use search criteria if terms provided
  - 200 with array of tours
- POST /tour/create
  - body:
    - name
    - description
    - city
    - photo
    - POI 
  - validation
    - fields not empty
  - create tour
  - 200 with tour object
- GET /tour/:id

  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)