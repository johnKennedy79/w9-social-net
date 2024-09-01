# Project Goals

🐿️ As a user, I am able to sign up for an account and create a user profile

### I acheaved the sign in using clerk and made my own sign in or sign up pages

### once loged in I am then directed to my profile page or to a form to create a profile if one does not already exist

🐿️ As a user, I am able to log in and out of my account

### my user clerk button is in the top right of my header and If I log out I'm directed back to the layout page

🐿️ As a user, I am able to create posts on my profile timeline

### I added the new post component to the my profile page

🐿️ As a user, I am able to see all posts by all users on a global timeline

### I created a global time line page displaying all posts in date order ascending or decending using serch perams

### created global post page

🎯 Use Clerk.com to set up user signup and login.

### I used clerk for the sign up and sign in pages

🎯 Use the Clerk userId to associate posts with a user.

### I lernt how to get user information from clerk to add to new posts and to link existing posts with a user id

🎯 Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to /user/[userId].

### I created a form for each user to add their own profile bio linked to their user id

🎯 Enable users to create posts associated with the userId, and display those posts on the user's profile page

### Users can create new posts in the global post page and their user profile shows all the posts liked to the user who's profile you are viewing these can be sorted by date order assending or desending

🎯 Show a 404 error if a user profile doesn't exist

### I created an error page to display if a user does not have a profile

🎯 Use at least 1 Radix UI Primitive or similar

### imported a Calapsable primative from radix with its own icon component used it as an asside dropdown to list all user accounts. this was challanging as it took me time to work out how to create user buttuns in the drop down and display them in a client component I did this by passing props to the drop down.

# Stretch Goals

🐿️ As a user, I am able to see a list of other user's posts and/or profiles on the site

### The users profile page shows their profile and all of their posts

🐿️ As a user, I am able able to visit other user profiles

### user profiles can be selected from the aside dropdown in the My Profile page

🐿️ As a user, I am able to follow other users

🐿️ As a user, I am able to like posts I think are good, and see how many likes a post has

🏹 Enable users to visit other user profiles after seeing their posts on a global timeline

### every post has a link to the users profile page by clicking on their name

🏹 Enable users to follow other users by creating a follower and follwee relationship between two user profiles

🏹 Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table

🏹 A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in

### If their is no profile set up the user is promted to create one
