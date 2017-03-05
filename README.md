# Forecast Server
Server Side NodeJS wrapper for Forecast API

# To run the app on dev environment
- create .env.example file
- copy all the contents of .env file
- provide darksky secret key to SECRET_KEY variable
- provide google api key to GOOGLE_API_KEY
- $ npm run dev
- open the app on browser http://localhost:6169/weather?location=Sydney&day=5

# Example URLs
- To get the data back in json format http://localhost:6169/weather/Sydney/today?format=json
- To get the bare minimum html implementation http://localhost:6169/weather/Sydney/today
- To get the forecast of any other weekday http://localhost:6169/weather?location=Sydney&day=5
  here day=5 denotes Friday. Day numnbers are 0-6 for Sun-Sat respectively.

# To run the test
- $ npm run test

# To find the test coverage
- $ npm run coverage
