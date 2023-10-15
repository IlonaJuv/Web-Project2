# Web-Project2
## App
- https://web-project2-1idt.vercel.app/
## What?
- a user-friendly online platform designed to cater to music enthusiasts, providing them with a space where they can passionately share their thoughts, ratings, engaging discussions, and detailed reviews about the albums and songs they enjoy.
## Who?
- For music lovers and likeminded people that want to discuss their favourite songs and potentially discover new artists they haven't heard of before
## How to use?
- Register an account on the sign up page
- Afterwards you'll be prompted with a list of the most popular songs as well as a search bar to look for songs
- Clicking on a song will take you to the main page of that song, providing you with any existing reviews that users have posted about the song. Next to every review is a like button, which you can use to show that you agree with what was said. You can also add your own review using the "Add review" button and sort reviews using multiple different criteria.
- Included with every review, you will be able to see the name of the user that posted it. Clicking on their name will bring you to their user page, providing you with a list of the user's other reviews as well as the reviews that the user has liked.
- Your own reviews will have an edit button next to them. This allows you to change the title, score and comment.

## Installing locally
- You will need to add .env files to frontend, backend and authServer directories in the following formats:
  
backend
```bash
  NODE_ENV=development
  PORT=<YOUR PORT>
  DATABASE_URL=<YOUR MONGO URL>
  JWT_SECRET=<YOUR SECRET>
  AUTH_URL=<URL TO AUTH SERVER>
```

frontend
```bash
  REACT_APP_API_URL=<URL TO GRAPHQL API SERVER>
  REACT_APP_DEEZER_URL=<URL TO DEEZER ROUTE OF API SERVER>
```

authServer
```bash
  NODE_ENV=development
  PORT=<YOUR PORT>
  DATABASE_URL=<YOUR MONGO URL>
  JWT_SECRET=<YOUR SECRET>
```

- Afterwards
  ```bash
    npm i
    npm run dev # or npm start for frontend
  ```
  for frontend, backend and auth server individually
  
  

