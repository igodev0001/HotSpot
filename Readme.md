## Install Backend API

Rename the .env.example to .env and set the mongdb url and yelp api key

In the project directory, install dependencies:
### `npm install`

Start backend api server
### `npm start`

Runs the server in the development mode.<br>

## Install Frontend

Open the another terminal and type:

### `cd client`

### `npm install`

### `npm start`

Backend API URL and Google Map API key is set in client/src/config.js.
Run the app in development mode.<br>

You can see the homepage of this project.
You have to signup by typing name, email and password.
Then, you can log in with your email and password.

Once you log in, you can see the landing page.
When you click the "See HotSpots Map", it will move on to map page.
The names of restaurants, bars and clubs will be displayed in the Explore Areas at the left side.
You can see detail information by clicking individual items.
Also you can click AddList to save it to Saved List.
When you click "Generate My Night", the page will move on to "My Plan" page.
There you can see peakhour of restaurant you chose and graphs which shows the hot scores and corresponding times.