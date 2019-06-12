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

#### Solution 1 (built it)

* Node.js does not come with mutlithreading out of the box, since it's single threaded, but it is possible to build and program it yourself. We just haven't done that in class.

#### Solution 2 (Multiple servers)

* For scaling throughout on a webservice, you should run multiple Node.js servers on one or more machine/es, one per core and split request traffic between them. This provides excellent CPU-affinity and will scale throughout nearly linearly with core count. You could also put a load balancer in front of it. The load balancer will balance the load of incoming requests, thus achieving a multicore solution.

#### Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems:

##### Ensure that you Node-process restarts after a (potential) exception that closed the application

To ensure my application will work I would use nodemon at least for development, nodemon is a utility that restarts the server or the application if it crashes or after something.

Another strategy is to use a process manager. When using a process manager, the process manager manages the starting of the application. You no longer start the application yourself, but instead instruct a process manager to do it for you. These process managers can be configured to automatically restart the application on crashes.

[Project managers - Express](https://expressjs.com/en/advanced/pm.html)
Useful process managers:

* Restart the app automatically if it crashes.
* Gain insights into runtime performance and resource consumption.
* Modify settings dynamically to improve performance.
* Control clustering.

Some popular process managers are:

* [forever](https://github.com/foreverjs/forever)
* [pm2](https://pm2.io/doc/en/runtime/overview/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding)
* [StrongLoop Process Manager](http://strong-pm.io/)

These can all be used. 

##### Ensure that you Node-process restarts after a server (Ubuntu) restart
      
##### Ensure that you can take advantage of a multi-core system

* Use the web api's SetTimeout or similar to delegate tasks to the browsers multi-threading capabilities. Or one could use the cluster module for node, which is probably the best solution.

##### Ensure that you can run “many” node-applications on a single droplet on the same port (80)

* You could configure a load balancer for this purpose. Nginx could also be used as a reverse proxy.

### Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

The problem with using console.log is that the output cannot easily be disabled when deployed to a production environment. Since console.log is a blocking call, the impact on the performance of the application will suffer.

The debug package exposes a function that can be used to print debugging messages.

```javascript
const a = require('debug')('a') // Creates a debug function with the name a
const b = require('debug')('b') // Creates a debug function with the name b
const c = require('debug')('c') // Creates a debug function with the name c
a('Printed by a')
b('Printed by b')
c('Printed by c')
```
These messages can easily be enabled or disabled based on the DEBUG environment variable.

* when DEBUG=*, all debug statements are printed.
* when DEBUG=a, only the a debug statements are printed.
* when DEBUG=*,-a, all debug statements except a are printed.
* when DEBUG=a,b, only a and b debug statements are printed.

Names can also be enabled based on a regex like syntax.

```javascript
const a = require('debug')('name:a')
const b = require('debug')('name:b')
```

* when DEBUG=name:a, a debug statements are printed.
* when DEBUG=name:*, all debug statements starting with name are printed.

Example from mini-project in app.js
```
var logger = require('morgan');

app.use(logger('dev'));

```


### Demonstrate a system using application logging and “coloured” debug statements.

Logging using Winston:

```javascript
const app = express()
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)
function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)
```
#### Colored debug statements:

The debug module has a great namespace feature that allows you to enable or disable debug functions in groups. It is very simple–you separate namespaces by colons, like this:

```javascript
debug('app:meta')('config loaded')
debug('app:database')('querying db...');
debug('app:database')('got results!', results);
```
Enable debug functions in Node by passing the process name via the DEBUG environment variable. The following would enable the database debug function but not meta:

```javascript
$ DEBUG='app:database' node app.js
```

To enable both, list both names, separated by commas:

```javascript
$ DEBUG='app:database,app:meta' node app.js
```

Alternately, use the asterisk wildcard character (*) to enable any debugger in that namespace. For example, the following enables any debug function whose name starts with “app:":

```javascript
$ DEBUG='app:*' node app.js
```

You can get as granular as you want with debug namespaces…

```javascript
debug('myapp:thirdparty:identica:auth')('success!');
debug('myapp:thirdparty:twitter:auth')('success!');
```
 

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

[Mongoose CRUD example](https://vegibit.com/mongoose-crud-tutorial/)
[Mini-Project](https://github.com/pernillelorup/mini-project-fullstackjs2019)

### Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.

Mocha: Mocha is a test framework running on Node.js and can be used to test synchronous and asynchronous functions. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. -> "describe" + "it".

Chai: Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework. -> "should" + "expect" + "assert". request: Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

In this [calculator](https://github.com/pernillelorup/JavascriptFlow2/blob/master/Week2Testing/testdemo1/calc.js) example, we have 4 simple functions and a REST API. 

We test the calculator in this [test class](https://github.com/pernillelorup/JavascriptFlow2/blob/master/Week2Testing/testdemo1/test/testCalc.js)
      
### Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.

We can use nock to mock a website

```javascript
const nock = require('nock');
describe("loadWiki()", function() {
    before(function() {
        //the website to be mocked
        nock("https://en.wikipedia.org")
            //the HTTP method and the path
            .get("/wiki/Abraham_Lincoln")
            //the response the mocked website should send
            .reply(200, "Mock Abraham Lincoln Page");
    });
    it("Load Abraham Lincoln's wikipedia page", function(done) {
        tools.loadWiki({ first: "Abraham", last: "Lincoln"}, function(html) {
            expect(html).to.equal("Mock Abraham Lincoln Page");
            done();
        });
    });
});
```

### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.

* https://expressjs.com/en/advanced/best-practice-performance.html
* https://expressjs.com/en/advanced/best-practice-security.html
* https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
* https://medium.freecodecamp.org/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c
* https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja

## NoSQL, MongoDB and Mongoose

### Explain, generally, what is meant by a NoSQL database.

#### What is NoSQL?

* NoSQL encompasses a wide variety of different database technologies that were developed in response to the demands presented in building modern applications:

* Developers are working with applications that create massive volumes of new, rapidly changing data types — structured, semi-structured, unstructured and polymorphic data.

* Long gone is the twelve-to-eighteen month waterfall development cycle. Now small teams work in agile sprints, iterating quickly and pushing code every week or two, some even multiple times every day.

* Applications that once served a finite audience are now delivered as services that must be always-on, accessible from many different devices and scaled globally to millions of users.

* Organizations are now turning to scale-out architectures using open source software, commodity servers and cloud computing instead of large monolithic servers and storage infrastructure.

* Relational databases were not designed to cope with the scale and agility challenges that face modern applications, nor were they built to take advantage of the commodity storage and processing power available today.

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

#### Pros of NoSQL

* Flexible Scalability Unlike rational database management model that is difficult to scale out when it come to commodity clusters NoSQL models make use of new nodes which makes them transparent for expansion. The model is designed to be used even with low cost hardwares. In this current world where outward scalability is replacing upwards scalability, NoSQL models are the better option.

* Stores Massive Amounts Of Data Given the fact that transaction rates are rising due to recognition, huge volumes of data need to be stored. While rational models have grown to meet this need it is illogical to use such models to store such large volumes of data. However these volumes can easily be handled by NoSQL models

* Database Maintenance The best rational models need the service of an expert to design, install and maintain. However, NoSQL models need much less expert management as it already has auto repair and data distribution capabilities, fewer administration and turning requirements as well as simplified data designs.

* Economical Rational models require expensive proprietary servers and storage systems whereas NoSQL models are easy and cheap to install. This means that more data can be processed and stored at a very minimal cost.

#### Cons of NoSQL

* Not Mature Rational models have been around for some time now compared to NoSQL models and as a result they have grown to be more functional and stable systems over the years.

* Less Support Every business should be reassured that in case a key function in their database system fails, they will have unlimited competent support any time. All rational model vendors have gone the extra mile to provide this assurance and made it sure that their support is available 24 hours which is not a step yet guaranteed by NoSQL vendors.

* Business Analytics And Intelligence NoSQL models were created because of the modern-day web 2.0 web applications in mind. And because of this, most NoSQL features are focused to meeting these demands ignoring the demands of apps made without these characteristics hence end up offering fewer analytic features for normal web apps.

* Any businesses looking to implement NoSQL model needs to do it with caution, remembering the above mentioned pros and cons they posse in contrast to their rational opposites.

### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB

#### Reasons to use Mongoose

* Mongoose is an object document modeling (ODM) layer that sits on top of Node's MongoDB driver. If your coming from SQL, it's similar to an ORM for a relational database. While it's not required to use Mongoose with the Mongo, here are four reasons why using Mongoose with MongoDB is generally a good idea.

* Schemas MongoDB is a denormalized NoSQL database. This makes it inherently schema-less as documents have varying sets of fields with different data types. While this provides your data model with flexibility as it evolves over time, it can be difficult to cope with coming from a SQL background. Mongoose defines a schema for your data models so your documents follow a specific structure with pre-defined data types.

* Validation Mongoose has built in validation for schema definitions. This saves you from writing a bunch of validation code that you have to otherwise write with the MongoDB driver. By simply including things like required:true in your schema definitions, Mongoose provides out-of-the-box validations for your collections (including data types).

* Instance Methods Mongoose provides optional pre and post save operations for data models. This makes it easy to define hooks and custom functionality on successful reads/writes etc. You can also define custom methods that act on a particular instance (or document). While you can achieve similar functionality with the native MongoDB driver, Mongoose makes it easier to define and organize such methods within your schema definition.

* Returning results Mongoose makes returning updated documents or query results easier. A prime example can be found with update queries. While the native driver returns an object with a success flag and the number of documents modified, Mongoose returns the updated object itself so you can easily work with the results.

#### Reasons not to use Mongoose?

* There are few reasons not to use Mongoose with MongoDB (especially if you are just getting started). For more advanced queries, it can be argued that Mongoose makes things more difficult and can slow performance. Advocates of the native MongoDB driver also argue that bringing ODM to a denormalized design entirely defeats the purpose of a NoSQL database.

#### Conclusion

* Despite the arguments against using Mongoose, it remains one of the most popular ODM tools for Mongo. If you are coming from a SQL background then using Mongoose will make the transition into a NoSQL environment much easier. It will also save you time writing your own validations and instance methods and is highly recommended for smaller DBs and basic Mongo operations.

#### These two topics will be introduced in period-3

##### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
##### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere

### Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB

[Mongoose CRUD example](https://vegibit.com/mongoose-crud-tutorial/)
[Mini-Project](https://github.com/pernillelorup/mini-project-fullstackjs2019)

### Explain the benefits of using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations


### Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.

* https://keon.io/mongodb-schema-design/ 
* https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1

Here are some “rules of thumb” to guide you through these indenumberable (but not infinite) choices

1. favor embedding unless there is a compelling reason not to

2. needing to access an object on its own is a compelling reason not to embed it

3. Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.

4. Don’t be afraid of application-level joins: if you index correctly and use the projection specifier then application-level joins are barely more expensive than server-side joins in a relational database.

5. Consider the write/read ratio when denormalizing. A field that will mostly be read and only seldom updated is a good candidate for denormalization: if you denormalize a field that is updated frequently then the extra work of finding and updating all the instances is likely to overwhelm the savings that you get from denormalizing.

6. As always with MongoDB, how you model your data depends – entirely – on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it.

### Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization 

https://techdifferences.com/difference-between-normalization-and-denormalization.html

Embed (Sub Docs)

```javascript
var addressSchema = new Schema({
    street : String, zip : String
})
var userSchema = new Schema({
    name: String,
    addresses :[addressSchema]
});
```

Reference on the one-side

```javascript
var userSchema = new Schema({
    name: String,
    addresses : [{ type: Schema.Types.ObjectId, ref: 'Address' }]
  });
  var addressSchema = new Schema({
      street : String,zip : String
  })
  let User = mongoose.model('User', userSchema);
  let Address = mongoose.model('Address', addressSchema);
```

Reference on the N-side

```javascript
  var userSchema = new Schema({
    name: String,
  });
  var addressSchema = new Schema({
      street : String,zip : String,
      owner: {type: Schema.Types.ObjectId, ref : "User"}
  })
  let User = mongoose.model('User', userSchema);
  let Address = mongoose.model('Address', addressSchema);
```

### Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)

[Mini-Project](https://github.com/pernillelorup/mini-project-fullstackjs2019)
