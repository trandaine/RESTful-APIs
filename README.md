# Week 10 - RESTful APIs
# Week 8 - RESTful APIs

## Description:
RESTful applications use HTTP requests to perform four operations termed as CRUD (C: create, R: read, U: update, and D: delete). Create and/or update is used to post data, get for reading/listing data, and delete to remove data. This project was created to demonstrate how APIs work to send, handling user's request.

## Logs:
- Create a new vocabulary application backend and Tesing APIs - 2024-10-31 - Done on 15:44
- Create frontend using Vuejs - 2024-10-31 - Done
- Fixing bugs of create new words, delete, edit (21/11 - Done)
- Fixing Test function (2024-11-21 - On-going)

## Tools:
- Node.js@20.18.0
- npm@10.9.0
- Nodemon@latest
- Mongoose@latest
- Express@latest
- Postcode

## Installation
First of all, clone this project to destined folder on local machine using 

```bash
git clone https://github.com/trandaine/RESTful-APIs.git
cd RESTful-APIs
cd sever
npm install
```

Then, in the ```sever.js``` file, specify the connection string to your MongoDB sever. In the code, I'm using the local MongoDB sever so I must have username, password, database name and port to connect to sever

```JavaScript
const database = "database-name";       //required
const username = "username";            //required
const password = "password";            //required
const databasePort = 27017;             //required
```

Finally, run this command to start the sever and use Postcode to test the CRUD operations:

```bash
npm run start
```

