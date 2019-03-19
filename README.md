# JavascriptFlow2

## Why would you consider a Scripting Language as JavaScript as your Backend Platform?

* It's easy and fast to build and setup a working network application with node.js and the right editor.
* It's very handy that you can use the same language both in front-end and in the back-end.
* Not a lot of code is required for an application to run.

## Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat

#### Pros
* You can make a good and responsive network application, if done right.
* Allows the use of data streaming, web sockets and fast file uploads.
* It's easy to set up a REST-API with generators like a custom boilerplate project, yeomon or express and mongoDB
* It is efficient at handling thousands of concurrent requests (For example - a chat application).
* It is very simple to implement server middleware, that will be executed between all requests.

#### Cons
* Java is good at handling CPU heavy tasks, Node.JS + Express is not. Because Node is, despite its asynchronous event model, by nature single threaded. When you launch a Node process, you are running a single process with a single thread on a single core. So your code will not be executed in parallel, only I/O operations are parallel because they are executed asynchronous. As such, long running CPU tasks will block the whole server and are usually a bad idea.
* Java integrates well with relational databases like MySQL. Node.JS + Express does not, they have mongoDB but that isn't relational.
* Java as oppposed to Node.JS + Express is a strictly typed language which provides a certain security.
* 500 errors in Node.JS and Express will crash the entire application, Java will not.

## Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.


#### Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems:

##### Ensure that you Node-process restarts after a (potential) exception that closed the application

##### Ensure that you Node-process restarts after a server (Ubuntu) restart
      
##### Ensure that you can take advantage of a multi-core system

##### Ensure that you can run “many” node-applications on a single droplet on the same port (80)

### Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

### Demonstrate a system using application logging and       “coloured” debug statements.

### Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages 
* For the tests we have used chai and mocha, you first describe the test and then what "it" should do, aswell as a before and after the test.

[TestExample](https://github.com/pernillelorup/JavascriptFlow2/blob/master/Week2Testing/testdemo1/test/testCalc.js)

### Explain, using relevant examples, the Express concept; middleware.

Middleware functions are functions that you bind to the express instance and works as a way to configure/add functionality between requests:

* Application level middleware: Mount to all requests or specific endpoints to define routes.
* Router-level middleware: Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().
* Error-handling middleware: Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):
* Third-party middleware: Add functionality.

Middleware is executed sequentially. Therefore the order of the middleware is important. If we for example wanted to use the bodyParser to retrieve the body of our request as JSON, we would need to put it before we use it.

```javascript
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.json());

router.post('/', function (req, res) {
    res.send(req.body);
});
```
   
### Explain, using relevant examples, how to implement sessions and the legal implications of doing this.

To enable the use of the session we have to require the module express-session. This module was earlier integrated into Express.js but was removed to make the framework more lightweight:

```javascript
var session = require('express-session');
```

We enable the session with the following middleware:
```javascript
app.use(session({
    secret: '50ac41d0f8eff5655213',
    saveUninitialized: false,
    resave: true
}));
```
To retrieve the session, we can do the following on the req object, and also add properties to it:

```javascript
 var session = req.session;
    session.username = "michael";
```
A cookie consent has to be implemented on the site, if the cookie is used to track user behaviour.



### Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
Node.JS and Express uses templating engines like Handlebars, Jade and EJS. Java uses templating engines like JSP. Java was never made to be suitable for web applications, and JSP is often seen as a makeshift solution.

MVC:

* Java: Model --> Controller --> Servlet --> JSP

* Express.js: Model --> Controller/Router --> Handlebars/Jade/EJS

Example 1 (Passing variables to a view in Express)
Node.js + Express.js:
```javascript
router.get('/dashboard', isLoggedIn, function (req, res) {
    res.render('dashboard', {
        title: 'Dashboard',
        subtitle: 'Hello dashboard'
    });
});
```
Java + JSP
```Java
protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        RequestDispatcher rd = null;
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(30 * 60);

        session.setAttribute("title", "Dashboard");
        session.setAttribute("subtitle", "Hello dashboard");
        rd = request.getRequestDispatcher("dashboard.jsp");
        rd.forward(request, response);

}
```

Example 2 (Retrieving a session variable on the front end with Handlebars)
Node.js + Express.js:
```javascript
<h1>{{title}}</h1>
<h2>{{subtitle}}</h2>
```

Java + JSP
```Java
<h1><%= session.getAttribute("title"); %></h1>
<h2><%= session.getAttribute("subtitle"); %></h2>
```
* Conclusion: use node.js Express for server side templating.


### Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).

[EJS Server Side Rendering Example](https://github.com/pernillelorup/JavascriptFlow2/tree/master/ejsServerSide)

Use *npm run dev* to run the project.

### Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.



### Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.

Mocha: Mocha is a test framework running on Node.js and can be used to test synchronous and asynchronous functions. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. -> "describe" + "it".

Chai: Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework. -> "should" + "expect" + "assert". request: Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

In this [calculator](https://github.com/pernillelorup/JavascriptFlow2/blob/master/Week2Testing/testdemo1/calc.js) example, we have 4 simple functions and a REST API. 

We test the calculator in this [test class](https://github.com/pernillelorup/JavascriptFlow2/blob/master/Week2Testing/testdemo1/test/testCalc.js)
      
### Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.



### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.



## NoSQL, MongoDB and Mongoose

### Explain, generally, what is meant by a NoSQL database.

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB

#### These two topics will be introduced in period-3

##### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
##### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere

### Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB

### Explain the benefits of using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations

### Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.

### Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization 

### Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)

