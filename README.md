# url-shortener

## This is a node.js URL shortener web api

## INSTALLATION

### Environment variables

Navigate to config/  
Create a file `config.env`  
Define the following variables:  

* PORT = _Port number onto which the port will run_
* MONGO_URI = _Mongodb Connection URI (Create a [Mongodb atlas cluster](https://cloud.mongodb.com/), paste the connection string here_
* DOMAIN = _Short domain onto which the shortened URL will return. For development you can test with (http://localhost:{PORT})_

### Packages installation

On the root directory, run `npm i` to install the dependencies  
For production, run `npm start`, or `npm run dev` for development server  

## Usage
The routes to be used are in routes/routes.js  
You can use [Postman](https://www.postman.com/downloads/) to test the endpoints, or any other preferred plug for testing REST http APIs  
