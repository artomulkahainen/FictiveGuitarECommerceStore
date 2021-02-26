<h1 align="center">Artzi's Guitar Store</h1>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [How To Use](#how-to-use)
* [Link to Heroku](#link-to-heroku)




<!-- ABOUT THE PROJECT -->
## About The Project

I built this fictive guitar e-commerce store just for training purposes.

### Built With
I used these frameworks:
  * React
  * Express

### How To Use

1. Clone the repo
2. Create .env file to backend folder and write this sentence in there:
  PORT=
  MONGODB_URI=
  TEST_MONGODB_URI=
  SECRET=
3. Create MongoDB instance (for example MongoDB Atlas) and fill the .env file with your own MONGODB_URI and TEST_MONGODB_URI. You can write to secret whatever you want. Port is probably best to be 3001.
4. Go to backend folder and run "npm install".
5. Go to frontend folder and run "npm install".
6. Develop mode can be activated by running "npm run dev" in backend folder. And in frontend folder you need to run "npm start".
7. Production mode works by running npm run build in frontend folder. Then copy the new "build" folder to backend folder. Afterwards app is ready to be uploaded to Heroku or somewhere else.

## Link to Heroku
You can try the app from this link: <a href='https://artzisguitarstore.herokuapp.com/'>Artzi's Guitar Store</a>
