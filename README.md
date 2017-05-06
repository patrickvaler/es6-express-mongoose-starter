[![Build Status](https://travis-ci.org/patrickvaler/es6-express-mongoose-starter.svg?branch=master)](https://travis-ci.org/patrickvaler/es6-express-mongoose-starter) [![Dependency Status](https://david-dm.org/patrickvaler/es6-express-mongoose-starter/status.svg?style=flat)](https://david-dm.org/patrickvaler/es6-express-mongoose-starter) [![GitHub version](https://badge.fury.io/gh/patrickvaler%2Fes6-express-mongoose-starter.svg)](https://badge.fury.io/gh/patrickvaler%2Fes6-express-mongoose-starter)


# es6-express-mongoose-starter 
This repo serves as an starter package written in JavaScript (ES6) for anyone looking to get up and running with Express and Mongoose fast. It contains a example REST API for fictious todos connected to MongoDB and uses [Mocha]("https://mochajs.org/")/[Chai]("http://chaijs.com/") for the unit tests.

- Best practices in file and application organization
- Ready to go build system for working with ES6
- Uses [Eslint]("http://eslint.org/") for code linting
- Example of REST API connected to MongoDB (by Mongoose)
- Example unit tests created with [Mocha]("https://mochajs.org/")/[Chai]("http://chaijs.com/") and [Mockgoose]("https://github.com/mockgoose/mockgoose")

## Getting Started

### Requirements
- [Node.js]("https://nodejs.org/") >= 6.x
- [MongoDB]("https://docs.mongodb.com/manual/installation/")

### Clone project & install dependencies
```bash
$ git clone git://github.com/patrickvaler/es6-express-mongoose-starter ./my-example-app
$ cd my-example-app

$ yarn install
  OR
$ npm install
```

### Initialize MongoDB with data
> The server tries to connect with `'mongodb://localhost:27017/es6-express-mongoose-starter'`, you can overwrite this default setting for each environment in `src/config/config.js`.

Connect to your MongoDB instance and insert:
```bash
$ use es6-express-mongoose-starter
$ db.todos.insert([{ name: 'Book flight to Los Angeles' },
                   { name: 'Reserve a table at a chinese restaurant' },
                   { name: 'Buy birthday present for Tom' },
                   { name: 'Book flight to Los Angeles' }]);
```

### Run backend
```bash
$ npm run serve
```
Runs the application with [nodemon]("https://nodemon.io/"). Server is listening on Port 3000 by default, you can overwrite this default setting for each environment in `src/config/config.js`

Test if the backend is running by `curl` or a tool like [Postman]("https://www.getpostman.com/"):
```bash
$ curl localhost:3000/api/v1
```
It should return the current version of the package.json file.

> All available routes of this starter package can be found [below](#availableRoutes) or in `src/config/routes.js`.

## Additional information
### <a name="availableRoutes">Available routes</a>

**Get a list of Todos**
```
GET localhost:3000/api/v1/todo
```

**Add a Todo**
```
POST localhost:3000/api/v1/todo

Body: {
    name: String
}
```

**Update a Todo**
```
PUT localhost:3000/api/v1/todo/:id

Body: {
    name: String
}
```

**Delete a Todo**
```
DELETE localhost:3000/api/v1/todo/:id
```

### Scripts
**Run for development**
```bash
$ npm run serve
```
Runs the application with [nodemon]("https://nodemon.io/"). Server is listening on Port 3000 by default, this can be overwritten by `API_PORT` constant in `src/config/config.js`. Application will automatically run babel and eslint and restart if a code change was detected.

**Build**
```bash
$ npm run build
```
Runs eslint, transpiles the ES6 code and copies the transpiled code into build folder.

**Test**
```bash
$ npm test
```
Runs eslint and verifies the unit tests from `test/` folder;

### Eslint
 is pre-configured for this starter package. It uses the airbnb configuration package and a minimal set of own rules. Configuration is available in `.eslintrc.js`.

### Unit-Tests
A set of unit tests is available in `test/` folder. [Mocha]("https://mochajs.org/")/[Chai]("http://chaijs.com/") was used to create and run the unit tests.


## License

*The MIT License (MIT)*

Copyright (c) 2017 Patrick Valer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---
Made with ♥ by [Patrick Valer]("http://www.patrickvaler.ch") (<hello@patrickvaler.ch>)