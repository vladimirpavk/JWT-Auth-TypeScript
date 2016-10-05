# JWT token auth
###### Very simple authentification and authorization application using JWT´s (JSON Web Token)

### Prerequisites
Must have node, nodemon, npm, tsc and typings installed

### How to use
Install node dependencies in your project root directory (this is where the 'package.json' file is located) using:
```sh
$ npm install
``` 
Install typescript definition files in your project root directory (this is where the 'typings.json' file is located) using:
```sh
$ typings install
``` 
Start typescript compiler in watch mode 
```sh
$ tsc -w
```
Start application in watch mode
```sh
$ nodemon main.js
```

When started the application will start node-express web server on http://localhost:3033 by default.
There are two main routes:
1. http://localhost:3033/restricted - routes that you can access if you have the right user permissions,
2. http://localhost:3033/login -route for authorization and authentification. This route requires you to send **username** and **password** fields through request body. If authenticated the user is responded with a JWT cookie and you can try to access routes under */restricted* routes. 

##### Restricted routes:
1. http://localhost:3033/restricted/1/api and http://localhost:3033/restricted/1/list can be accessed if the user claims has permissions = 1
2. http://localhost:3033/restricted/2/api and http://localhost:3033/restricted/2/list can be accessed if the user claims has permissions = 2
3. http://localhost:3033/restricted/3/api and http://localhost:3033/restricted/3/list can be accessed if the user claims has permissions = 3

This list of valid users can be found and modified at *./users/users.js*.